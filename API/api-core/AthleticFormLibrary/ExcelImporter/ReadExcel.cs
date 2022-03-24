//Important link for this: https://github.com/ExcelDataReader/ExcelDataReader
//Examples link: https://csharp.hotexamples.com/examples/-/IExcelDataReader/AsDataSet/php-iexceldatareader-asdataset-method-examples.html

using ExcelDataReader;
using System.IO;
//using ExcelDataReader;


public class ExcelReader {

    private string worksheet;

    public void ReadExcelFile(string filePath) {
        FileStream stream = File.Open(filePath, FileMode.Open, FileAccess.Read);
        ExcelDataReader excelReader = ExcelReaderFactory.CreateOpenXmlReader(stream);
        excelReader.IsFirstRowAsColumnNames = true;
        result = excelReader.AsDataSet();
    }

    private void GetTable(string tableName) {
        List<DataRow> rows = ("from DataRow r in worksheet.Rows Select r").ToList();

    }

    //Upload data to our db
    private void UpdateDB() {

    }

    //Identify Event
    //Used for figuring out if our db should be edited or added to
    private void Id_Event() {

    }
}