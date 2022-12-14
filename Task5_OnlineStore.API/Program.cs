using Microsoft.EntityFrameworkCore;
using Task5_OnlineStore.DataAccess.Context;
using Task5_OnlineStore.DataAccess.Seeder;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Context
builder.Services.AddDbContext<StoreDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("connection")));


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

app.UseAuthorization();

app.MapControllers();

app.Run();
