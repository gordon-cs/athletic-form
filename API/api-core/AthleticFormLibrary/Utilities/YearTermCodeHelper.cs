using System;
using System.Collections.Generic;
using System.Text;

namespace AthleticFormLibrary.Utilities
{
    public class YearTermCodeHelper
    {
        public static string CalculateYearCode(DateTime date)
        {
            int year = 0;
            if (date.Month >= 1 && date.Month <= 6)
            {
                year = date.Year - 1;
            } 
            else
            {
                year = date.Year;
            }
            return year.ToString();
        }

        public static string CalculateTermCode(DateTime date)
        {
            string term = "";
            if (date.Month >= 1 && date.Month <= 6)
            {
                term = "SP";
            }
            else
            {
                term = "FA";
            }
            return term;
        }
    }
}
