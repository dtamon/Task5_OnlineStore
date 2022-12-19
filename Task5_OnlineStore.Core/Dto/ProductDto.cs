using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Task5_OnlineStore.Core.Dto
{
    public class ProductDto
    {
        public int Id { get; set; }
        public int BrandId { get; set; }
        public string BrandName { get; set; }
        public string ProductName { get; set; }
        public string Description { get; set; }
        public double Cost { get; set; }
    }
}
