//Important link for this: https://github.com/ExcelDataReader/ExcelDataReader
//Examples link: https://csharp.hotexamples.com/examples/-/IExcelDataReader/AsDataSet/php-iexceldatareader-asdataset-method-examples.html

using ExcelDataReader;
using ExcelDataReader.DataSet;


public class ExcelReader {

    private var worksheet;

    public void ReadExcelFile(string filePath) {
        using (var stream = File.Open(filePath, FileMode.Open, FileAccess.Read)){
            // Auto-detect format, supports:
            //  - Binary Excel files (2.0-2003 format; *.xls)
            //  - OpenXml Excel files (2007 format; *.xlsx, *.xlsb)
            using (worksheet = ExcelReaderFactory.CreateReader(stream))
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
        List<DataRow> rows = (from DataRow r in worksheet.Rows Select r).ToList();

    }

    //Upload data to our db
    private void UpdateDB() {

    }

    //Identify Event
    //Used for figuring out if our db should be edited or added to
    private void Id_Event() {

    }
}