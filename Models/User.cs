using System.ComponentModel.DataAnnotations;


namespace My_Website.Models
{
    public class User
    {
        [Key]
        public string userID { get; set; }
        public string password { get; set; }

    }
}
