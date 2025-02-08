using System.ComponentModel.DataAnnotations;


namespace My_Website.Models
{
    public class Transaction
    {
        [Key]
        public int transactionID { get; set; }
        [DataType(DataType.Date)]
        public DateTime date { get; set; }
        public string transactionType { get; set; }
        public decimal amount { get; set; }
        public int userID { get; set; }
        public User User { get; set; } // Foreign key
        public string assetName { get; set; }
        public string assetType { get; set; }
        public string? symbol { get; set; }
    }
}
