using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyContacts.Models
{
    public class Setting
    {
        [Key]
        [Required(ErrorMessage = "Id is required")]
        public int Id { get; set; }
        
        [Required]
        [ForeignKey("UserID")]
        public User User { get; set; }
        
        [Required]
        public int AutoLogOut { get; set; }
    }
}
