using System;
using System.Threading.Tasks;
using System.DirectoryServices.AccountManagement;
using Microsoft.Owin.Security.OAuth;
using System.Security.Claims;
using System.Diagnostics;
using System.Configuration;
using AthleticFormCore.Controllers;
using AthleticFormLibrary.DataAccess;

namespace AthleticFormCore.AuthorizationServer
{
    public static class Position
    {
        public const string STUDENT = "student";
        public const string FACSTAFF = "facstaff";
        public const string SUPERADMIN = "god";      // TODO: change in database to something more reverent
        public const string READONLY = "readonly";
    }


    public class TokenIssuer : OAuthAuthorizationServerProvider
    {
        private readonly AthleticContext _context;
        public TokenIssuer(AthleticContext context)
        {
            _context = context;
        }

        public override async Task ValidateClientAuthentication(
            OAuthValidateClientAuthenticationContext context)
        {
            // This call is required...
            // but we're not using client authentication, so validate and move on...
            await Task.FromResult(context.Validated());
        }

        // Someone should figure out where the await should go. Until then, I'm suppressing the warning because
        // it has been working just fine so far.
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public override async Task GrantResourceOwnerCredentials(
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
            OAuthGrantResourceOwnerCredentialsContext context)
        {

            // Get the user credentials
            var username = context.UserName;
            var password = context.Password;
            if (string.IsNullOrWhiteSpace(password) || string.IsNullOrWhiteSpace(username))
            {
                context.SetError("Unsuccessful Login", "The username or password is not correct.");
                return;
            }
            // Get service account credentials
            var serviceUsername = ConfigurationManager.AppSettings["serviceUsername"];
            var servicePassword = ConfigurationManager.AppSettings["servicePassword"];
            // Syntax like : my.server.com:8080 
            var ldapServer = ConfigurationManager.AppSettings["ldapServer"];


            /*******************************
             * Ldap Authentication
             *******************************/
            try
            {
                PrincipalContext ADServiceConnection = new PrincipalContext(
                    ContextType.Domain,
                    ldapServer,
                    "OU=Gordon College,DC=gordon,DC=edu",
                    ContextOptions.Negotiate | ContextOptions.ServerBind | ContextOptions.SecureSocketLayer,
                    serviceUsername,
                    servicePassword);

                UserPrincipal userQuery = new UserPrincipal(ADServiceConnection);
                userQuery.SamAccountName = username;

                PrincipalSearcher search = new PrincipalSearcher(userQuery);
                UserPrincipal userEntry = (UserPrincipal)search.FindOne();
                search.Dispose();


                if (userEntry != null)
                {
                    PrincipalContext ADUserConnection = new PrincipalContext(
                        ContextType.Domain,
                        ldapServer,
                        "OU=Gordon College,DC=gordon,DC=edu"
                        );


                    var areValidCredentials = ADUserConnection.ValidateCredentials(
                        username,
                        password,
                        ContextOptions.SimpleBind | ContextOptions.SecureSocketLayer
                        );

                    if (areValidCredentials)
                    {
                        var personID = userEntry.EmployeeId;
                        // Some accounts don't have id's 
                        if (personID == null)
                        {
                            context.SetError("Unsuccessful Login", "The username or password is not correct.");
                            return;
                        }

                        // What is a "unit of work" ? Why is there such poor documentation on 360 ??
                        // IUnitOfWork unitOfWork = new UnitOfWork();
                        // var adminService = new Account();               // new AdministratorService(unitOfWork);
                        // var accountService = new Account();             // new AccountService(unitOfWork);

                        var accountService = new AccountsController(_context);
                        var account = accountService.GetAccountByID(personID);

                        var discrim = account[1].Nickname;                  // TODO: add roles field (this currently works because
                        var collegeRole = string.Empty;                     //       I set the nicknames of profs as "Professor")

                        if (discrim == "Professor")
                        {
                            collegeRole = Position.FACSTAFF;
                        }
                        else if (discrim == "Admin")
                        {
                            collegeRole = Position.SUPERADMIN;
                        }
                        else
                        {
                            collegeRole = Position.READONLY;
                        }

                        var identity = new ClaimsIdentity(context.Options.AuthenticationType);
                        identity.AddClaim(new Claim("name", userEntry.Name));
                        identity.AddClaim(new Claim("id", personID));
                        identity.AddClaim(new Claim("college_role", collegeRole));
                        identity.AddClaim(new Claim("user_name", username));
                        ADServiceConnection.Dispose();
                        context.Validated(identity);
                    }
                    else
                    {
                        ADServiceConnection.Dispose();
                        context.SetError("Unsuccessful Login", "The username or password is not correct");
                    }


                }
                else
                {
                    Debug.WriteLine("\n\nNOT FOUND\n\n");
                    context.SetError("Unsuccessful Login", "The username or password is not correct");
                }
            }
            catch (Exception e)
            {
                Debug.WriteLine("Exception caught: " + e.ToString());
                context.SetError("connection_error", "There was a problem connecting to the authorization server.");

            }
        }


    }
}