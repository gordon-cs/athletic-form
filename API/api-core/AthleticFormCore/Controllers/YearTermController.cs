﻿using AthleticFormLibrary.Utilities;
using Microsoft.AspNetCore.Mvc;
using System;

namespace AthleticFormCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class YearTermController : ControllerBase
    {
        [HttpGet]
        [Route("year/{date}")]
        public string getYearCode(string date)
        {
            DateTime parsedDate = DateTime.Parse(date);
            string year = YearTermCodeHelper.CalculateYearCode(parsedDate);
            return year;
        }

        [HttpGet]
        [Route("term/{date}")]
        public string getTermCode(string date)
        {
            DateTime parsedDate = DateTime.Parse(date);
            string term = YearTermCodeHelper.CalculateTermCode(parsedDate);
            return term;
        }
    }
}
