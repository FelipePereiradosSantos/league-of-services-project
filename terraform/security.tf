
resource "azurerm_network_security_group" "nsg" {
  name                = "nsg-vm-default"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name


  security_rule {
    name                       = "AllowSSH"
    priority                   = 1001    
    direction                  = "Inbound"   
    access                     = "Allow"     
    protocol                   = "Tcp"
    source_port_range          = "*"        
    destination_port_range     = "22"      
    source_address_prefix      = "*"         
    destination_address_prefix = "*"
  }
  
  security_rule {
    name                       = "AllowAppPort3000"
    priority                   = 1002
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "3000" 
    source_address_prefix      = "*"   
    destination_address_prefix = "*"
  }

  # Regra para o Grafana
  security_rule {
    name                       = "AllowGrafana"
    priority                   = 1003
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "3001" # Porta externa do Grafana
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }

  # Regra para o Prometheus
  security_rule {
    name                       = "AllowPrometheus"
    priority                   = 1004
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "9090"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }
}

resource "azurerm_subnet_network_security_group_association" "nsg_assoc" {
  subnet_id                 = azurerm_subnet.subnet.id
  network_security_group_id = azurerm_network_security_group.nsg.id
}