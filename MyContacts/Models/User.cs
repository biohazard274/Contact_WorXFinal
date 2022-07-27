using System.ComponentModel.DataAnnotations;

namespace MyContacts.Models
{
    public class User
    {
        [Key]
        [Required(ErrorMessage ="Id is required")]
        public int Id { get; set; }
        
        [Required(ErrorMessage = "Your first name is required")]
        public string FirstName { get; set; }
        
        [Required(ErrorMessage = "Your first name is required")]
        public string LastName { get; set; }
       
        [Required(ErrorMessage = "Your last name is required")]
        public string UserName { get; set; }
       
        [Required(ErrorMessage = "Please specify a username")]
        [DataType(DataType.EmailAddress, ErrorMessage ="The email address supplied is not valid")]
        public string EmailAddress { get; set; }
        
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        
        [Required]
        public string Salt { get; set; }
        [Required]
        public bool Active  { get; set; }
    }
}
