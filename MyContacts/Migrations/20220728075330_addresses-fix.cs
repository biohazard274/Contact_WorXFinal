using Microsoft.EntityFrameworkCore.Migrations;

namespace MyContacts.Migrations
{
    public partial class addressesfix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PhyscalLine4",
                table: "Addresses",
                newName: "StreetAddress");

            migrationBuilder.RenameColumn(
                name: "PhyscalLine3",
                table: "Addresses",
                newName: "State");

            migrationBuilder.RenameColumn(
                name: "PhyscalLine2",
                table: "Addresses",
                newName: "Country");

            migrationBuilder.RenameColumn(
                name: "PhyscalLine1",
                table: "Addresses",
                newName: "City");

            migrationBuilder.AddColumn<int>(
                name: "ContactID",
                table: "Telephones",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "PrimaryNumber",
                table: "Telephones",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "ContactID",
                table: "Addresses",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Telephones_ContactID",
                table: "Telephones",
                column: "ContactID");

            migrationBuilder.CreateIndex(
                name: "IX_Addresses_ContactID",
                table: "Addresses",
                column: "ContactID");

            migrationBuilder.AddForeignKey(
                name: "FK_Addresses_Contacts_ContactID",
                table: "Addresses",
                column: "ContactID",
                principalTable: "Contacts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Telephones_Contacts_ContactID",
                table: "Telephones",
                column: "ContactID",
                principalTable: "Contacts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Addresses_Contacts_ContactID",
                table: "Addresses");

            migrationBuilder.DropForeignKey(
                name: "FK_Telephones_Contacts_ContactID",
                table: "Telephones");

            migrationBuilder.DropIndex(
                name: "IX_Telephones_ContactID",
                table: "Telephones");

            migrationBuilder.DropIndex(
                name: "IX_Addresses_ContactID",
                table: "Addresses");

            migrationBuilder.DropColumn(
                name: "ContactID",
                table: "Telephones");

            migrationBuilder.DropColumn(
                name: "PrimaryNumber",
                table: "Telephones");

            migrationBuilder.DropColumn(
                name: "ContactID",
                table: "Addresses");

            migrationBuilder.RenameColumn(
                name: "StreetAddress",
                table: "Addresses",
                newName: "PhyscalLine4");

            migrationBuilder.RenameColumn(
                name: "State",
                table: "Addresses",
                newName: "PhyscalLine3");

            migrationBuilder.RenameColumn(
                name: "Country",
                table: "Addresses",
                newName: "PhyscalLine2");

            migrationBuilder.RenameColumn(
                name: "City",
                table: "Addresses",
                newName: "PhyscalLine1");
        }
    }
}
