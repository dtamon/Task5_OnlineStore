using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Task5_OnlineStore.Core.Dto;
using Task5_OnlineStore.DataAccess.Entities;

namespace Task5_OnlineStore.Core
{
    public class StoreMappingProfile : Profile
    {
        public StoreMappingProfile() 
        {
            CreateMap<BrandDto, Brand>();
            CreateMap<Brand, BrandDto>();

            CreateMap<ProductDto, Product>();
            CreateMap<Product, ProductDto>()
                .ForMember(d => d.BrandName, o => o.MapFrom(s => s.Brand.BrandName));
        }
    }
}
