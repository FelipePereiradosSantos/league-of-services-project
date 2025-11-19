
resource "azurerm_resource_group" "rg" {
  name     = "rg-leagueofservices-prod"
  location = "Canada Central"
  

  tags = {
    environment = "Production"
    project     = "LeagueOfServices"
    owner       = "DevArcanjo"
  }
}