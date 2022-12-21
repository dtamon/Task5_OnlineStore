# Online Store
App allowing adding products to shopping cart and buying them for authorized users only
## Features
- Adding Products to Shopping Cart for both authorized and unauthorized users, adding one product multiple times will change quantity of this product (quantity can be change from from the cart also)
- To check the Cart click Shopping Cart icon in top right corner of the screen, next to Person icon which will display Log In form
- Quantity of items in Cart is displayed next to Shopping Cart icon on Navbar
- List of product in Cart is stored in [LocalStorage](https://github.com/dtamon/Task5_OnlineStore/tree/master/task5_onlinestore.frontend/src/hooks) hook, this way the shopping cart is not cleared when the page refreshes
- If a User wants to buy products from the Cart he needs to be authorized
- Pressing button `Buy` will redirect unauthorized user to Log In from
- If a user doesnt have an account he can register himself by pressing button Register in Log In form and filling in the fields with the correct data
- If the user is authorized pressing button `Buy` will clear the Cart and display a message of successful purchase
## Configuration
#### 1. Change your connection string in [appsettings.json](https://github.com/dtamon/Task5_OnlineStore/blob/master/Task5_OnlineStore.API/appsettings.json),
````json 
"ConnectionStrings": {
    "connection": "Server=localhost\\SQLEXPRESS;Database=Task5;Trusted_Connection=True;TrustServerCertificate=True;"
  },
````    
#### 2. Generate schema by running `update-database` command in Package Manager Console (make sure you've picked `Task4_ReadingList.DataAccess` as default project) ![PMC](https://i.imgur.com/J02MJcO.png) 
#### 3. Database should be filled automatically with [DataSeeder](https://github.com/dtamon/Task5_OnlineStore/blob/master/Task5_OnlineStore.Core/Seeder/DataSeeder.cs)
#### 4. The way I run the project is to open whole solution in Visual Studio and run `Task5_OnlineStore.API` project there, open `Task5_OnlineStore.Frontend` project in Visual Studio Code and start it with command `npm start` from terminal and going to https://localhost:3000/ address in the browser
#### 5. Before the first launch it may be required to install react libraries (`react-router-dom`, `bootstrap` and `react-bootstrap`) by running commands `npm i <name_of_library1> <name_of_library2>...` or just `npm i` in terminal



## Architecture

- Solution contains 4 layers ([Repository](https://github.com/dtamon/Task5_OnlineStore/tree/master/Task5_OnlineStore.DataAccess), [Service](https://github.com/dtamon/Task5_OnlineStore/tree/master/Task5_OnlineStore.Core), [API](https://github.com/dtamon/Task5_OnlineStore/tree/master/Task5_OnlineStore.API) and [Frontend](https://github.com/dtamon/Task5_OnlineStore/tree/master/task5_onlinestore.frontend))
- I used Entity Framework Core for easy communication with database
- For validation purpose I used [Fluent Validation](https://docs.fluentvalidation.net/en/latest/) library
- For styling I used [Bootstrap](https://getbootstrap.com/) and [React-Bootstrap](https://react-bootstrap.github.io/)
- [Controllers](https://github.com/dtamon/Task5_OnlineStore/tree/master/Task5_OnlineStore.API/Controllers) job is to handle requests from the Frontend
- [Services](https://github.com/dtamon/Task5_OnlineStore/tree/master/Task5_OnlineStore.Core/Services) job is to call Repositories to access data that will be cast to [DTOs](https://github.com/dtamon/Task5_OnlineStore/tree/master/Task5_OnlineStore.Core/Dto) using [AutoMapper](https://github.com/dtamon/Task5_OnlineStore/blob/master/Task5_OnlineStore.Core/StoreMappingProfile.cs), and the other way to cast DTOs to [Entity Models](https://github.com/dtamon/Task5_OnlineStore/tree/master/Task5_OnlineStore.DataAccess/Entities) ready to be saved in database.
- [Repositories](https://github.com/dtamon/Task5_OnlineStore/tree/master/Task5_OnlineStore.DataAccess/Repositories) job is to get needed data from database using LINQ, each repository corresponds to a table from the database

## Database (MS SQL Server)
### Database schema
![Database Schema](https://i.imgur.com/QZhga14.png)
