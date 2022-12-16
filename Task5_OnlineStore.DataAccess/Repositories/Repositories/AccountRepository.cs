using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Task5_OnlineStore.DataAccess.Context;
using Task5_OnlineStore.DataAccess.Entities;
using Task5_OnlineStore.DataAccess.Repositories.Interfaces;

namespace Task5_OnlineStore.DataAccess.Repositories.Repositories
{
    public class AccountRepository : IAccountRepository
    {
        private readonly StoreDbContext _context;

        public AccountRepository(StoreDbContext context)
        {
            _context = context;
        }

        public User GetUserByEmail(string email)
        {
            return _context.Users.FirstOrDefault(u => u.Email == email);
        }

        public void RegisterUser(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
        }
    }
}
