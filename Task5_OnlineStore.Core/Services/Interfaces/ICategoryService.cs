using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Task5_OnlineStore.Core.Dto;

namespace Task5_OnlineStore.Core.Services.Interfaces
{
    public interface ICategoryService
    {
        Task<ICollection<CategoryDto>> GetAllCategoriesAsync();
    }
}
