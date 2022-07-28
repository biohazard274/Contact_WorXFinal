using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyContacts.Models
{
    public class Address
    {
        [Key]
        [Required(ErrorMessage = "Id is required")]
        public int Id { get; set; }
        [ForeignKey("ContactID")]
        public Contact Contact { get; set; }

        [Required(ErrorMessage = "Country is required")]
        public string Country { get; set; }

        [Required(ErrorMessage = "State is required")]
        public string State { get; set; }
        [Required(ErrorMessage = "City is required")]
        public string City { get; set; }
        [Required(ErrorMessage = "Address is required")]
        public string StreetAddress { get; set; }
    }
}
