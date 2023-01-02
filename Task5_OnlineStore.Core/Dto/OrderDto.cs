using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Task5_OnlineStore.Core.Dto
{
    public class OrderDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; }
        public double TotalCost { get; set; }
        public DateTime DateOfOrder { get; set; }
        public string Status { get; set; }
        public virtual ICollection<OrderProductDto> OrderProducts { get; set; } = new List<OrderProductDto>();
    }
}
