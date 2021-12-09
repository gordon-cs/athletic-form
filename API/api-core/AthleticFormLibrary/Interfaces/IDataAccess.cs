using System;
using System.Collections.Generic;

namespace AthleticFormLibrary.Interfaces
{
    public interface IDataAccess
    {
        void Store();

        List<Type> Retrieve();
    }
}
