using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Task5_OnlineStore.Core.Dto;

namespace Task5_OnlineStore.Core.Validators
{
    public class ProductValidator : AbstractValidator<ProductDto>
    {
        public ProductValidator() 
        {
            RuleFor(x => x.ProductName)
                .NotEmpty().WithMessage("Product Name is required");

            RuleFor(x => x.BrandId)
                .NotEmpty().WithMessage("Brand is required");

            RuleFor(x => x.Description)
                .NotEmpty().WithMessage("Description is required");

            RuleFor(x => x.Cost)
                .NotEmpty().WithMessage("Cost is required");
        }
    }
}
