//Important link for this: https://github.com/ExcelDataReader/ExcelDataReader

using (var stream = File.Open(filePath, FileMode.Open, FileAccess.Read))
{
    // Auto-detect format, supports:
    //  - Binary Excel files (2.0-2003 format; *.xls)
    //  - OpenXml Excel files (2007 format; *.xlsx, *.xlsb)
    using (var reader = ExcelReaderFactory.CreateReader(stream))
    {

        Use the AsDataSet extension method
        var result = reader.AsDataSet();

        // The result of each spreadsheet is in result.Tables
    }
}