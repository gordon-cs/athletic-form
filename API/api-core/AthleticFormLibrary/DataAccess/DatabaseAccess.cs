using AthleticFormLibrary.Interfaces;
using System;

namespace AthleticFormLibrary.DataAccess
{
    public class DatabaseAccess : IDataAccess
    {
        public string Retrieve()
        {
            return "Hello, World!";
        }

        public void Store()
        {
            throw new NotImplementedException();
        }
    }
}
