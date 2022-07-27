using System;
using System.ComponentModel.DataAnnotations;

namespace MyContacts.Models
{
    public class Contact
    {
        [Key]
        [Required(ErrorMessage = "Id is required")]
        public int Id { get; set; }

        [Required(ErrorMessage = "A first name is required for your contact")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "A last name is required for your contact")]
        public string LastName { get; set; }
        [DataType(DataType.Date)]
        [Required(ErrorMessage = "Your contact's date of birth is required")]
        public DateTime DateOfBirth { get; set; }
        [Required(ErrorMessage = "Your contact's dage is required")]
        public int age { get; set; }
    }
}
