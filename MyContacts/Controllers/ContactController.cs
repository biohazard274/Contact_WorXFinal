using Microsoft.AspNetCore.Mvc;
using MyContacts.Data;
using MyContacts.Models;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace MyContacts.Controllers
{
    public class ContactController : Controller
    {
        private readonly ApplicationDbContext _db;

        public ContactController(ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public IActionResult AddContact()
        {
            var contact = new Contact();
            return PartialView("AddContact", contact);
        }
        [HttpPost]
        public async Task<IActionResult> SaveContact(Contact contact)
        {
            try
            {
                var exisitingContact = _db.Contacts.FirstOrDefault(x => x.FirstName == contact.FirstName && x.LastName == contact.LastName && x.DateOfBirth == contact.DateOfBirth);
                if (exisitingContact != null)
                {
                    return Json(new { success = false, newContact = false, message = contact.FirstName + " " + contact.LastName + " already exits.<br>Would you like to add a new contact number instead?" }); ;
                }
                else
                {
                    contact.age = DateTime.Now.Year - contact.DateOfBirth.Year;
                    if (ModelState.IsValid)
                    {
                        try
                        {
                            _db.Contacts.Add(contact);
                            if (_db.ChangeTracker.HasChanges())
                            {
                                var result = await _db.SaveChangesAsync();
                                return Json(new { success = true, newContact = true, contactID = contact.Id, message = contact.FirstName + " " + contact.LastName + " was Added Successfully" }); ;
                            }
                            else
                                return Json(new { success = false, message = "No changes to be made" });
                        }
                        catch (Exception er)
                        {
                            return Json(new { success = false, message = er.Message + "<br>" + er.InnerException });
                        }
                    }
                    else
                    {
                        var reply = "";
                        var errors = ModelState.Select(x => x.Value.Errors)
                                               .Where(y => y.Count > 0)
                                               .ToList();
                        foreach (var error in errors)
                        {
                            reply += error[0].ErrorMessage + "<br>";
                        }
                        return Json(new { success = false, message = reply });
                    }
                }
            }
            catch (Exception er)
            {
                return Json(new { success = false, message = er.Message + "<br>" + er.InnerException });
            }


        }
        [HttpGet]
        public IActionResult AddAddress(int contactID)
        {
            var address = new Address();
            address.Contact =  _db.Contacts.FirstOrDefault(x =>x.Id == contactID);
            return PartialView("AddAddress", address);
        }
        [HttpPost]
        public async Task<IActionResult> SaveAddress(Address address)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    try
                    {
                        _db.Addresses.Add(address);
                        if (_db.ChangeTracker.HasChanges())
                        {
                            var result = await _db.SaveChangesAsync();
                            return Json(new { success = true });
                        }
                        else
                            return Json(new { success = false, message = "No changes to be made" });
                    }
                    catch (Exception er)
                    {
                        return Json(new { success = false, message = er.Message + "<br>" + er.InnerException });
                    }
                }
                else
                {
                    var reply = "";
                    var errors = ModelState.Select(x => x.Value.Errors)
                                           .Where(y => y.Count > 0)
                                           .ToList();
                    foreach (var error in errors)
                    {
                        reply += error[0].ErrorMessage + "<br>";
                    }
                    return Json(new { success = false, message = reply });
                }
            }
            catch (Exception er)
            {
                return Json(new { success = false, message = er.Message + "<br>" + er.InnerException });
            }
        }
    }
}
