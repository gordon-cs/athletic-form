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

        //Declare all the variables
        string sport, eventDate, subSport, opponent, 
               eventTime, departTime, notes;

        while (curSheet < numSheets) {
            
            //Print name of new sheet
            if (lastName != reader.Name) {
                Console.WriteLine();
                Console.WriteLine(reader.Name);
                lastName = reader.Name;
            }
            //SKIP FIRST 2 lines to get to the data
            for (int l = 0; l < 2; l++) {
                reader.Read();
            }
            //Read each event on each row
            while (reader.Read()) {
                
                sport = eventDate = subSport = opponent = 
                eventTime = departTime = notes = null;

                sport = lastName;
                //Have to have all these values because the values are sometimes left empty
                if (reader.GetValue(0) != null) {
                    eventDate = reader.GetValue(0).ToString();
                    if (reader.GetValue(1) != null)
                        subSport = reader.GetValue(1).ToString();
                    if (reader.GetValue(2) != null)
                        opponent = reader.GetValue(2).ToString();
                    if (reader.GetValue(3) != null)
                        eventTime = reader.GetValue(3).ToString();
                    if (reader.GetValue(4) != null)
                        departTime = reader.GetValue(4).ToString();
                    if (reader.GetValue(5) != null)
                        notes = reader.GetValue(5).ToString();

                    Console.WriteLine(sport + " " + eventDate + " " + subSport + " " + 
                                    opponent + " " + eventTime + " " + departTime 
                                    + " " + notes);
                    /*curCol++;
                    if (curCol > cols) {
                        curCol = 0;
                        Console.WriteLine();
                    }*/
                }
            }
            curSheet++;
            reader.NextResult();
        }
    }

    private void GetAllTables() {

    }

    private void GetEventsInTable() {

    }

    private ExcelEvent MakeEvent() {
        return new ExcelEvent();
    }

    //IRELLEVANT FOR NOW
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


class ExcelEvent {
    string eventName;
    string sport;
}