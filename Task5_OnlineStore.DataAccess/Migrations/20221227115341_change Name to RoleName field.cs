using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Task5OnlineStore.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class changeNametoRoleNamefield : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Roles",
                newName: "RoleName");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "RoleName",
                table: "Roles",
                newName: "Name");
        }
    }
}
