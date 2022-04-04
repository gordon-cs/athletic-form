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

        DataSet result = reader.AsDataSet();
        int cols = reader.FieldCount;
        int curCol = 0;
        string lastName = null;
        int numSheets = reader.ResultsCount;
        int curSheet = 0;
        Console.WriteLine("Sheets:  " + numSheets);
        while (curSheet < numSheets) {
            while (reader.Read()) {
                if (lastName != reader.Name) {
                    Console.WriteLine();
                    Console.WriteLine(reader.Name);
                    lastName = reader.Name;
                }
                Console.Write(reader.GetValue(0));
                curCol++;
                if (curCol > cols) {
                    curCol = 0;
                    Console.WriteLine();
                }
            }
            curSheet++;
            reader.NextResult();
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