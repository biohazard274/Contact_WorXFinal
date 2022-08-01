using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyContacts.Data;
using MyContacts.Models;
using MyContacts.Models.NewFolder;
using System;
using System.Collections.Generic;
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
        [HttpGet]
        public IActionResult EditContact(int contactID)
        {
            var contact = _db.Contacts.FirstOrDefault(x => x.Id == contactID);
            return PartialView("EditContact", contact);
        }
        [HttpPost]
        public async Task<IActionResult> UpdateContact(Contact contact)
        {
            try
            {
                contact.age = DateTime.Now.Year - contact.DateOfBirth.Year;
                if (ModelState.IsValid)
                {
                    try
                    {
                        _db.Contacts.Update(contact);
                        if (_db.ChangeTracker.HasChanges())
                        {
                            var result = await _db.SaveChangesAsync();
                            return Json(new { success = true, contactID = contact.Id, message = contact.FirstName + " " + contact.LastName + " was Updated Successfully" }); ;
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
        [HttpPost]
        public async Task<IActionResult> CreateNewContact(Contact contact)
        {
            try
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
            catch (Exception er)
            {
                return Json(new { success = false, message = er.Message + "<br>" + er.InnerException });
            }


        }
        [HttpDelete]
        public async Task<IActionResult> DeleteContact(int contactID, bool fromUpdate)
        {
            try
            {
                var contact = _db.Contacts.FirstOrDefault(x => x.Id == contactID);
                var addresses = _db.Addresses.Where(x => x.Contact == contact).ToList();
                foreach (var address in addresses)
                {
                    _db.Addresses.Remove(address);
                    if (_db.ChangeTracker.HasChanges())
                    {
                        var result = await _db.SaveChangesAsync();
                    }
                }

                var telephones = _db.Telephones.Where(x => x.Contact == contact).ToList();
                foreach (var number in telephones)
                {
                    _db.Telephones.Remove(number);
                    if (_db.ChangeTracker.HasChanges())
                    {
                        var result = await _db.SaveChangesAsync();
                    }
                }

                try
                {
                    _db.Contacts.Remove(contact);
                    if (_db.ChangeTracker.HasChanges())
                    {
                        var result = await _db.SaveChangesAsync();
                        ViewBag.Message = String.Format("Hello{0}.\\ncurrent Date and time:{1}", "Brandon", DateTime.Now.ToString());
                        return Json(new { success = true, message = "Contact Deleted" });
                    }

                }
                catch (Exception er)
                {
                    ViewBag.Message = er.Message;

                    return View("Index");

                }
            }
            catch (Exception er)
            {
                ViewBag.Message = er.Message;

                return View("Index");

            }
            return View("Index");

        }
        [HttpGet]
        public IActionResult AddAddress(int contactID)
        {
            var address = new Address();
            address.Contact = _db.Contacts.FirstOrDefault(x => x.Id == contactID);
            return PartialView("AddAddress", address);
        }
        [HttpGet]
        public IActionResult EditAddress(int contactID)
        {
            var address = _db.Addresses.Include(x => x.Contact).FirstOrDefault(x => x.Contact.Id == contactID);
            return PartialView("EditAddress", address);
        }

        [HttpPost]
        public async Task<IActionResult> SaveAddress(Address address)
        {
            try
            {
                address.Contact = _db.Contacts.FirstOrDefault(x => x.Id == address.Contact.Id);
                if (ModelState.IsValid)
                {
                    try
                    {
                        _db.Addresses.Add(address);
                        if (_db.ChangeTracker.HasChanges())
                        {
                            var result = await _db.SaveChangesAsync();
                            return Json(new { success = true, contactID = address.Contact.Id });
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
        [HttpPost]
        public async Task<IActionResult> UpdateAddress(Address address)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    try
                    {
                        _db.Addresses.Update(address);
                        if (_db.ChangeTracker.HasChanges())
                        {
                            var result = await _db.SaveChangesAsync();
                            return Json(new { success = true, contactID = address.Contact.Id });
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
        [HttpGet]
        public IActionResult AddPhone(int contactID)
        {
            var telephone = new Telephone();
            telephone.Contact = _db.Contacts.FirstOrDefault(x => x.Id == contactID);
            return PartialView("AddPhone", telephone);
        }
        [HttpGet]
        public IActionResult AddPhoneExisting(int contactID)
        {
            var telephone = new Telephone();
            telephone.Contact = _db.Contacts.FirstOrDefault(x => x.Id == contactID);
            return PartialView("AddPhone", telephone);
        }
        [HttpPost]
        public async Task<IActionResult> SaveNumber(Telephone telephone)
        {
            try
            {
                telephone.Contact = _db.Contacts.FirstOrDefault(x => x.Id == telephone.Contact.Id);
                if (ModelState.IsValid)
                {
                    try
                    {
                        _db.Telephones.Add(telephone);
                        if (_db.ChangeTracker.HasChanges())
                        {
                            var result = await _db.SaveChangesAsync();
                            return Json(new { success = true, contactID = telephone.Contact.Id, message = telephone.Contact.FirstName + " " + telephone.Contact.LastName + " has been saved" });
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


        [HttpGet]
        public IActionResult getAllContacts()
        {
            try
            {
                var returnContacts = new List<ContactViewModel>();

                var contacts = _db.Contacts.ToList();

                foreach (var contact in contacts)
                {
                    var contactViewModelToAdd = new ContactViewModel()
                    {
                        Contact = contact,
                        Telephones = _db.Telephones.Where(x => x.Contact == contact).ToList(),
                        Address = _db.Addresses.Where(x => x.Contact == contact).SingleOrDefault()
                    };

                    returnContacts.Add(contactViewModelToAdd);
                }
                return Json(new { success = true, data = returnContacts });

            }
            catch (Exception er)
            {
                return Json(new { success = false, data = er.Message + "<br>" + er.InnerException });

            }
        }
        [HttpGet]
        public IActionResult UpdateContact(int contactID)
        {
            try
            {
                var returnContact = new ContactViewModel()
                {
                    Contact = _db.Contacts.FirstOrDefault(x => x.Id == contactID),
                    Telephones = _db.Telephones.Where(x => x.Contact.Id == contactID).ToList(),
                    Address = _db.Addresses.FirstOrDefault(x => x.Contact.Id == contactID)
                };
                return PartialView("UpdateContact", returnContact);
            }
            catch (Exception er)
            {
                return Json(new { success = false, data = er.Message + "<br>" + er.InnerException });

            }
        }
    }
}
