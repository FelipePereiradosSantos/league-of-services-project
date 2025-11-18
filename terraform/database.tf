
resource "random_password" "db_password" {
  length  = 16
  special = true
  upper   = true
  lower   = true
}

resource "azurerm_postgresql_flexible_server" "db" {
  name                   = "psql-leagueofservices-prod"
  resource_group_name  = azurerm_resource_group.rg.name   
  location               = azurerm_resource_group.rg.location
  
  version                = "14" 

  zone                   =  "1"
  
  # Login do admin
  administrator_login    = "psqladmin"
  administrator_password = random_password.db_password.result 
  

  sku_name               = "B_Standard_B1ms" 
  
  storage_mb             = 32768 
  public_network_access_enabled = true 
}


resource "azurerm_postgresql_flexible_server_database" "db_instance" {
  name      = "db_freelancers"
  server_id = azurerm_postgresql_flexible_server.db.id 
}


resource "azurerm_postgresql_flexible_server_firewall_rule" "allow_my_ip" {
  name      = "allowMyHomeIP"
  server_id = azurerm_postgresql_flexible_server.db.id
  
  # 'chomp' remove a quebra de linha do 'data.http'
  # 'data.http' busca seu IP público atual
  start_ip_address = chomp(data.http.myip.response_body)
  end_ip_address   = chomp(data.http.myip.response_body)
}

resource "azurerm_postgresql_flexible_server_firewall_rule" "allow_azure" {
  name      = "allowAzureServices"
  server_id = azurerm_postgresql_flexible_server.db.id

  # Esta é a mágica: permite IPs de 0.0.0.0,
  # que no contexto da Azure, significa "qualquer serviço Azure"
  start_ip_address = "0.0.0.0"
  end_ip_address   = "0.0.0.0"
}

# Data source para buscar o seu IP público
data "http" "myip" {
  url = "https://ifconfig.me/ip"
}