using System;
using System.Diagnostics;
using AthleticFormLibrary.UserSession;

namespace Gordon360.AuthorizationFilters
{
    /* Authorization Filter.
     * 
     */
    public class StateYourBusiness
    {
        // Resource to be accessed: Will get as parameters to the attribute
        public string resource { get; set; }
        // Operation to be performed: Will get as parameters to the attribute
        public string operation { get; set; }

        private UserContext _context;

        // User position at the college and their id.
        private string user_position { get; set; }
        private string user_id { get; set; }
        private string user_name { get; set; }

        private bool isAuthorized = false;

        public void canPerformAction(UserContext context)
        {
            _context = context;

            if (context.UserRoles.COACH == true || context.UserRoles.STAFF == true || context.UserRoles.SUPERADMIN == true)
            {
                if (context.UserRoles.COACH == true) user_position = "COACH";
                if (context.UserRoles.STAFF == true) user_position = "STAFF";
                if (context.UserRoles.SUPERADMIN == true) user_position = "SUPERADMIN";

                user_id = context.UserId;
                user_name = context.UserName;

                // Keeping these for now commented out as more permissions testing needs to be done in future
                Debug.WriteLine("User name: " + user_name);
                Debug.WriteLine("User Position: " + user_position);

                if (user_position == "SUPERADMIN")
                {
                    return;
                }
            } 
            else
            {
                throw new UnauthorizedAccessException("Resource cannot be accessed without valid authentication.");
            }
        }
    }
}