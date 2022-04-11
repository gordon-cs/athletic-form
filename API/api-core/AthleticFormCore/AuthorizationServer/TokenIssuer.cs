/* Generates Tokens for Gordon 360 to use for login
*/

using System;
using System.DirectoryServices.AccountManagement;
using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using AthleticFormLibrary.DataAccess;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;

    [Route("api/[controller]")]
    [ApiController]
    public class AuthorizationController : ControllerBase
    {
        private readonly AthleticContext _context;
        public AuthorizationController(AthleticContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("token")]
        public string GetToken(string username, string password)
        {         
            var ldapServer = "gordon.edu";
            try
            {
                PrincipalContext ADServiceConnection = new PrincipalContext(
                    ContextType.Domain,
                    ldapServer, "OU=Gordon College,DC=gordon,DC=edu",
                    ContextOptions.Negotiate | ContextOptions.ServerBind | ContextOptions.SecureSocketLayer,
                    username,   
                    password);

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
                        var token = GenerateToken(username);
                        return token;
                    }
                    else
                    {
                        ADServiceConnection.Dispose();
                        Debug.WriteLine("\n\nHERE\n\n");
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

            return "Unauthorized!";
        }

        private string GenerateToken(string username)
        {
            // TODO: Move this constant file
            string[] scheduler = new string[1] { "jacob.christopher" };

            Claim[] claims;
            if (Array.IndexOf(scheduler, username) != -1)
            {
                claims = new[] {
                        new Claim(ClaimTypes.Name, username),
                        new Claim(ClaimTypes.Role, "Scheduler"),
                    };
            }
            else
            {
                claims = new[] {
                        new Claim(ClaimTypes.Name, username),
                        new Claim(ClaimTypes.Role, "Staff"),
                    };
            }

            // TODO: Add key generation
            var key = System.IO.File.ReadAllText(@"./Properties/loginKey.json");
            var issuer = "gordon.edu";

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);
            var tokenDescriptor = new JwtSecurityToken(issuer, issuer, claims,
                expires: DateTime.Now.AddMinutes(90), signingCredentials: credentials);
            return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
        }
    }