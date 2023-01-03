using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Task5_OnlineStore.Core.Dto
{
    public class OrderProductDto
    {
        public int Id { get; set; }
        public string ProductFullName { get; set; }
        public int Quantity { get; set; }
        public double Cost { get; set; }
    }
}
