using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace AthleticFormLibrary.UserSession
{
    public class Position
    {
        [DefaultValue(false)]
        public Boolean COACH { get; set; }

        [DefaultValue(false)]
        public Boolean STAFF { get; set; }

        [DefaultValue(false)]
        public Boolean SUPERADMIN { get; set; }
    }
}
