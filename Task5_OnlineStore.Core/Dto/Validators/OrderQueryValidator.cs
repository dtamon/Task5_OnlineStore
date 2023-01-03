using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Task5_OnlineStore.DataAccess.Entities;
using Task5_OnlineStore.DataAccess.Queries;

namespace Task5_OnlineStore.Core.Dto.Validators
{
    public class OrderQueryValidator : AbstractValidator<OrderQuery>
    {
        private int[] allowedPageSizes = new[] { 5, 10, 15 };
        public OrderQueryValidator()
        {
            RuleFor(x => x.PageNumber)
                .GreaterThanOrEqualTo(1).WithMessage("Page number must be 1 or greater");

            RuleFor(x => x.PageSize)
                .Custom((value, context) =>
                {
                    if (!allowedPageSizes.Contains(value))
                    {
                        context.AddFailure("PageSize", $"PageSize must be in [{string.Join(",", allowedPageSizes)}]");
                    }
                });
        }
    }
}
