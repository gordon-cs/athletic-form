using AthleticFormLibrary.Utilities;
using System.Collections.Generic;

namespace AthleticFormLibrary.Interfaces
{
    public interface IReportGeneration {
        //Eventually, replace with actual student data
         string GenerateReport(List<DummyStudentData> students);
    }
}