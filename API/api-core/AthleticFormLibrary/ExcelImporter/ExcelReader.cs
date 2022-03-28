//Important link for this: https://github.com/ExcelDataReader/ExcelDataReader
//Examples link: https://csharp.hotexamples.com/examples/-/IExcelDataReader/AsDataSet/php-iexceldatareader-asdataset-method-examples.html

using ExcelDataReader;
using System;
using System.IO;
using System.Data;
using System.Collections;
using System.Collections.Generic;
//using System.Text.Encoding;
//using ExcelDataReader;


public class ExcelReader {

    private string worksheet;

    public void ReadExcelFile(string filePath) {
        System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
        FileStream stream = File.Open(filePath, FileMode.Open, FileAccess.Read);
        IExcelDataReader reader = ExcelReaderFactory.CreateOpenXmlReader(stream);
        string[] sheets = reader.GetWorksheetList();
        foreach (string s in sheets) {
            Console.WriteLine(s);
        }

        //Get a specific sheet
        DataTable table = reader.GetWorksheet(sheets[1]);


        DataSet result = reader.AsDataSet();
        while (reader.Read()) {
            Console.Write(reader.GetType());
            Console.Write(reader.GetString(0));
        }
    }

    private void GetTable(string tableName) {
        //List<DataRow> rows = ("from DataRow r in worksheet.Rows Select r").ToList();

    }

    //Upload data to our db
    private void UpdateDB() {

    }

    //Identify Event
    //Used for figuring out if our db should be edited or added to
    private void Id_Event() {

    }
}