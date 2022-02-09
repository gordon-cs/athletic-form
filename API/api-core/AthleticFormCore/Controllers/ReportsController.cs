using Microsoft.AspNetCore.Mvc;
using AthleticFormLibrary.Interfaces;
using AthleticFormLibrary.Utilities;

namespace AthleticFormCore.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class ReportsController : ControllerBase 
    {
        private readonly IReportGeneration _generator;
        public ReportsController(IReportGeneration generator) {
            _generator = generator;
        }

        [HttpGet]
        public string GetReport() {
            return _generator.GenerateReport("");
        }
    }
}