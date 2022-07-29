using System.Collections.Generic;

namespace MyContacts.Models.NewFolder
{
    public class ContactViewModel 
    {
         public Contact Contact { get; set; }
        public IEnumerable<Telephone> Telephones { get; set; }
        public Address Address { get; set; }
    }
}
