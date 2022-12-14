using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Task5_OnlineStore.DataAccess.Entities;

namespace Task5_OnlineStore.DataAccess.Repositories.Interfaces
{
    public interface IBrandRepository
    {
        Task<ICollection<Brand>> GetAllBrandsAsync();
    }
}
