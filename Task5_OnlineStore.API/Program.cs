using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.EntityFrameworkCore;
using Task5_OnlineStore.Core.Services.Interfaces;
using Task5_OnlineStore.Core.Services.Services;
using Task5_OnlineStore.Core.Validators;
using Task5_OnlineStore.DataAccess.Context;
using Task5_OnlineStore.DataAccess.Repositories.Interfaces;
using Task5_OnlineStore.DataAccess.Repositories.Repositories;
using Task5_OnlineStore.DataAccess.Seeder;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Context
builder.Services.AddDbContext<StoreDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("connection")));

//Automapper
builder.Services.AddAutoMapper(typeof(Task5_OnlineStore.Core.StoreMappingProfile).Assembly);

//Repositories
builder.Services.AddScoped<IBrandRepository, BrandRepository>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();

//Services 
builder.Services.AddScoped<IProductService, ProductService>();

//Validators
builder.Services.AddFluentValidationAutoValidation(config =>
{
    config.DisableDataAnnotationsValidation = true;
})
    .AddValidatorsFromAssemblyContaining<ProductValidator>();

//Seeder 
builder.Services.AddScoped<StoreSeeder>();

var app = builder.Build();

//Seed data
app.Services.CreateScope().ServiceProvider.GetRequiredService<StoreSeeder>().Seed();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

//enable CORS
app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.UseAuthorization();

app.MapControllers();

app.Run();
