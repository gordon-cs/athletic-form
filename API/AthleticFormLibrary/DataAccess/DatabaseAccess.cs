using AthleticFormLibrary.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace AthleticFormLibrary.DataAccess
{
    public class DatabaseAccess : IDataAccess
    {
        public string Retrieve()
        {
            return "Hello World";
        }

        public void Store()
        {
            throw new NotImplementedException();
        }
    }
}
