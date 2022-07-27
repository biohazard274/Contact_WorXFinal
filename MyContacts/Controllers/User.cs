using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyContacts.Data;
using MyContacts.Extensions;
using System;
using System.Linq;

namespace MyContacts.Controllers
{
    public class User : Controller
    {
        private readonly ApplicationDbContext _db;
        public User(ApplicationDbContext db)
        {
            _db = db;
        }
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Login()
        {
            return View();
        }
        public IActionResult CheckCredentials(string username, string password)
        {
            try
            {
                var user = _db.Users.FirstOrDefault(x => x.UserName == username);
                if (user == null)
                {
                    return Json(new { success = false, message = "The username " + username + " does not exist." });
                }
                else
                {
                    var pass = _db.Users.FirstOrDefault(x => x.UserName == username).Password;
                    var salt = _db.Users.FirstOrDefault(x => x.UserName == username).Salt;

                    var decrptedpass = CryptoEngine.Decrypt(pass, salt);
                    if (decrptedpass == password)
                    {
                        var userID = _db.Users.FirstOrDefault(x => x.UserName == username).Id;
                        var userName = _db.Users.FirstOrDefault(x => x.UserName == username).UserName;
                        var timeout = _db.Settings.FirstOrDefault(x => x.User.Id == userID).AutoLogOut;


                        HttpContext.Session.SetInt32("UserID", userID);
                        HttpContext.Session.SetString("UserName", userName);

                        return Json(new { success = true, timeout = timeout, message = "Welcome back " + user.FirstName + " " + user.LastName });
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
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message + ex.InnerException });
            }

        }

        public IActionResult Logout()
        {
            HttpContext.Session.Clear();
            return View("Login");
        }
    }
}
