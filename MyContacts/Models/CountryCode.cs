using System.ComponentModel.DataAnnotations;

namespace MyContacts.Models
{
    public class CountryCode
    {
        [Key]
        [Required(ErrorMessage = "Id is required")]
        public int Id { get; set; }

        [Required(ErrorMessage = "Id is required")]
        public string Code { get; set; }

    }
}
