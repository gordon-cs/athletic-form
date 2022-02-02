using Xunit;
using AthleticFormLibrary.Utilities;
using AthleticFormLibrary.Interfaces;

namespace AthleticFormTest {
    public class ReportGeneratorTest {
        private readonly IReportGeneration _generator;

        public ReportGeneratorTest(IReportGeneration generator) {
            _generator = generator;
        }

        [Fact] 
        public void GenerateReportTest() {
            string report = _generator.GenerateReport("");
            Assert.NotNull(report);
        }
    }
}