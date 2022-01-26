using AthleticFormLibrary.Interfaces;
using AthleticFormLibrary.DataAccess;

namespace AthleticFormLibrary.Utilities
{
    public class ReportGenerator : IReportGeneration
    {
        private readonly AthleticContext _context;
        public ReportGenerator(AthleticContext context) {
            _context = context;
        }
        public void GenerateReport()
        {
            throw new System.NotImplementedException();
        }
    }
}