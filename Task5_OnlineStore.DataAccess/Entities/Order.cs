using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Task5_OnlineStore.DataAccess.Entities
{
    public class Order
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public double TotalCost { get; set; }
        public DateTime DateOfOrder { get; set; }
        public string Status { get; set; }
        public virtual ICollection<OrderProduct> OrderProducts { get; set; } = new List<OrderProduct>();
    }
}
