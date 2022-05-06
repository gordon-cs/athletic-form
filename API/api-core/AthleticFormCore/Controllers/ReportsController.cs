using Microsoft.AspNetCore.Mvc;
using AthleticFormLibrary.Interfaces;

namespace AthleticFormCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportsController : ControllerBase
    {
        private readonly IReportGeneration _generator;
        public ReportsController(IReportGeneration generator) {
            _generator = generator;
        }

        [HttpGet]
        [Route("{number}")]
        public string GetReport(int number) {
            return _generator.GenerateReport("", number);
        }
    }
}