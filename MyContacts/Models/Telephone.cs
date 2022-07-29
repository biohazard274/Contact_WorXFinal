using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyContacts.Models
{
    public class Telephone
    {
        [Key]
        [Required(ErrorMessage = "Id is required")]
        public int Id { get; set; }

        [ForeignKey("ContactID")]
        public Contact Contact { get; set; }
        [Required(ErrorMessage = "The phone number's country code is required")]
        [ForeignKey("CountryCodeID")]
        public string CountryCode { get; set; }
        [Required(ErrorMessage = "The phone number is required")]
        public string PhoneNumber { get; set; }
        public bool PrimaryNumber { get; set; }

        public bool isSouthAfrican(string code)
        {
            if (code.Length > 3)
            {
                throw new ArgumentException("Country Code is not valid");
            }

            if (code == "27")
                return true;
            return false;
        }
    }
}
