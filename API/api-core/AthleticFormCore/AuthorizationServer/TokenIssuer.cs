using System;
using System.DirectoryServices.AccountManagement;
using System.Diagnostics;
using System.Configuration;
using Microsoft.AspNetCore.Mvc;
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


    [Route("api/[controller]")]
    [ApiController]
    public class AuthorizationController : ControllerBase
    {
        private readonly AthleticContext _context;
        public AuthorizationController(AthleticContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("token/{username}/{password}")]
        public IActionResult Get(string username, string password)
        {

            // Get service account credentials
            var serviceUsername = username;
            var servicePassword = password;
            // Syntax like : my.server.com:8080 
            var ldapServer = ConfigurationManager.AppSettings["ldapServer"];
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
                        var token = GenerateToken(username, password);
                        return Ok(token);
                    }
                    else
                    {
                        ADServiceConnection.Dispose();
                    }
                }
                else
                {
                    Debug.WriteLine("\n\nNOT FOUND\n\n");
                }
            }
            catch (Exception e)
            {
                Debug.WriteLine("Exception caught: " + e.ToString());
            }

            return BadRequest();
        }

        private string GenerateToken(string username, string password)
        {
            return "Bearer xyz";
        }
    }
}