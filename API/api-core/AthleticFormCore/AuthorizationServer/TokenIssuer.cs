﻿/* Generates Tokens for Gordon 360 to use for login
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
using AthleticFormCore.Controllers;

namespace AthleticFormCore.AuthorizationServer
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorizationController : ControllerBase
    {
        private readonly AthleticContext _context;
        private readonly TeamsController _teamsController;
        public AuthorizationController(AthleticContext context, TeamsController teamsController)
        {
            _context = context;
            _teamsController = teamsController;
        }

        [HttpGet]
        [Route("token/{credentials}")]
        public string GetToken(string credentials)
        {
            var usernamePassword = credentials.Split(':');
            // Get service account credentials
            var serviceUsername = usernamePassword[0];
            var servicePassword = usernamePassword[1];

            var ldapServer = "gordon.edu";
            Debug.WriteLine(serviceUsername);
            try
            {


                PrincipalContext ADServiceConnection = new PrincipalContext(
                    ContextType.Domain,
                    ldapServer, "OU=Gordon College,DC=gordon,DC=edu",
                    ContextOptions.Negotiate | ContextOptions.ServerBind | ContextOptions.SecureSocketLayer,
                    serviceUsername,
                    servicePassword);

                UserPrincipal userQuery = new UserPrincipal(ADServiceConnection);
                userQuery.SamAccountName = serviceUsername;

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
                        serviceUsername,
                        servicePassword,
                        ContextOptions.SimpleBind | ContextOptions.SecureSocketLayer
                        );

                    if (areValidCredentials)
                    {
                        // Check if user is an admin
                        UserPrincipal user = UserPrincipal.FindByIdentity(ADUserConnection, serviceUsername);
                        GroupPrincipal group = GroupPrincipal.FindByIdentity(ADUserConnection, Roles.ADMIN_GROUP);
                        bool isAdmin = user.IsMemberOf(group);

                        // Get bearer token
                        var token = GenerateToken(serviceUsername, isAdmin);
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

        private string GenerateToken(string username, bool isAdmin)
        {
            Claim[] claims;
            if (isAdmin)
            {
                claims = new[] {
                        new Claim(ClaimTypes.Name, username),
                        new Claim(ClaimTypes.Role, "Admin"),
                    };
            }
            else if (Array.IndexOf(Roles.SCHEDULER, username) != -1)
            {
                claims = new[] {
                        new Claim(ClaimTypes.Name, username),
                        new Claim(ClaimTypes.Role, "Scheduler"),
                    };
            }
            else
            {
                if (_teamsController.IsCoach(username))
                {
                    claims = new[] {
                        new Claim(ClaimTypes.Name, username),
                        new Claim(ClaimTypes.Role, "Staff"),
                    };
                }
                else
                {
                    throw new UnauthorizedAccessException();
                }

            }

            var key = System.IO.File.ReadAllText(@"./Properties/loginKey.json");
            var issuer = "gordon.edu";

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);
            var tokenDescriptor = new JwtSecurityToken(issuer, issuer, claims,
                expires: DateTime.Now.AddMinutes(90), signingCredentials: credentials);
            return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
        }
    }
}