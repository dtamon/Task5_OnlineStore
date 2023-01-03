using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Task5_OnlineStore.DataAccess.Queries.Enum;

namespace Task5_OnlineStore.DataAccess.Queries
{
    public class ProductQuery
    {
        public int SearchCategory { get; set; }
        public int SearchBrand { get; set; }
        public string SearchPhrase { get; set; }
        public int PriceMin { get; set; }
        public int PriceMax { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public string SortBy { get; set; }
        public SortDirection SortDirection { get; set; }
    }
}
