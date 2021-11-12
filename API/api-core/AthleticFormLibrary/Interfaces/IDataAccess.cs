using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace AthleticFormLibrary.Interfaces
{
    public interface IDataAccess
    {
        void Store();

        List<Type> Retrieve();
    }
}
