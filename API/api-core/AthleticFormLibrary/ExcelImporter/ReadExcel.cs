//Important link for this: https://github.com/ExcelDataReader/ExcelDataReader
//Examples link: https://csharp.hotexamples.com/examples/-/IExcelDataReader/AsDataSet/php-iexceldatareader-asdataset-method-examples.html

using ExcelDataReader;
using ExcelDataReader.DataSet;


public class ExcelReader {

    
    public void ReadExcelFile(string filePath) {
        using (var stream = File.Open(filePath, FileMode.Open, FileAccess.Read)){
            // Auto-detect format, supports:
            //  - Binary Excel files (2.0-2003 format; *.xls)
            //  - OpenXml Excel files (2007 format; *.xlsx, *.xlsb)
            using (var reader = ExcelReaderFactory.CreateReader(stream))
            {

                Use the AsDataSet extension method
                var result = reader.AsDataSet();

                // The result of each spreadsheet is in result.Tables
                foreach (var t in result.Tables) {
                    Console.WriteLine(t);
                }
            }
        }
    }

    private void GetTable(string tableName) {
        
    }
}