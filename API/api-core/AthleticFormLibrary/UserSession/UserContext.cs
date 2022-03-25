using System;
using System.Collections.Generic;
using AthleticFormLibrary.Models;
using Microsoft.EntityFrameworkCore;

namespace AthleticFormLibrary.UserSession
{
    public class UserContext
    {
        public String UserId { get; set; }
        public String UserName { get; set; }
        public Position UserRoles { get; set; }


        protected void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Account>(a => a.HasKey(k => k.Gordon_ID));
        }

    }
}
