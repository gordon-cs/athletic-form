using Xunit;
using AthleticFormCore.Controllers;
using System.Collections.Generic;
using AthleticFormLibrary.Models;
using AthleticFormLibrary.DataAccess;

namespace AthleticFormTest {
    public class AccountControllerTest {
        private readonly AthleticContext _context;
        
        public AccountControllerTest(AthleticContext context) {
            _context = context;
        }

        [Fact]
        public void GetAllTest() {
            var controller = new AccountsController(_context);
            List<Account> accounts = controller.GetAll();
            Assert.True(accounts.Count > 0);
        }
    }
}