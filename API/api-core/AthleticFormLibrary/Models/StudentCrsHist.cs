using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("STUDENT_CRS_HIST", Schema = "dbo")]
public class StudentCrsHist {
    public int ID_NUM { get; set; }
    public string YR_CDE { get; set; }
    public string TRM_CDE { get; set; }
    public string CRS_CDE { get; set; }
}