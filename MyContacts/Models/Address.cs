using System.ComponentModel.DataAnnotations;

namespace MyContacts.Models
{
    public class Address
    {
        [Key]
        [Required(ErrorMessage = "Id is required")]
        public int Id { get; set; }

        [Required]
        public string PhyscalLine1 { get; set; }
        [Required]
        public string PhyscalLine2 { get; set; }
        [Required]
        public string PhyscalLine3 { get; set; }
        [Required]
        public string PhyscalLine4 { get; set; }
    }
}
