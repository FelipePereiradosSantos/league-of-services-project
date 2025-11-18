
output "vm_public_ip" {
  description = "O endereço IP público da Máquina Virtual."
  value       = azurerm_public_ip.pip.ip_address
}


output "db_hostname" {
  description = "O Fully Qualified Domain Name (FQDN) do servidor Postgres."
  value       = azurerm_postgresql_flexible_server.db.fqdn
}


output "db_admin_user" {
  description = "O nome de usuário administrador do servidor Postgres."
  value       = azurerm_postgresql_flexible_server.db.administrator_login
}


output "db_admin_password" {
  description = "A senha do administrador do servidor Postgres."
  value       = random_password.db_password.result
  

  sensitive   = true 
}