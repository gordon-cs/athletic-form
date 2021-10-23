using System;
using System.Collections.Generic;
using System.Text;

namespace AthleticFormLibrary.Interfaces
{
    public interface IDataAccess
    {
        void Store();

        string Retrieve();
    }
}
