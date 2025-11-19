
resource "azurerm_network_interface" "nic" {
  name                = "nic-vm"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name

  # Conecta a NIC à nossa sub-rede
  ip_configuration {
    name                          = "internal"
    subnet_id                     = azurerm_subnet.subnet.id 
    private_ip_address_allocation = "Dynamic"
    public_ip_address_id          = azurerm_public_ip.pip.id 
  }
}

# Finalmente, cria a Máquina Virtual Linux
resource "azurerm_linux_virtual_machine" "vm" {
  name                  = "vm-leagueofservices"
  resource_group_name   = azurerm_resource_group.rg.name
  location              = azurerm_resource_group.rg.location
  size                  = "Standard_B1s" 
  admin_username        = "adminuser"    
  
  admin_password        = "P@ssw0rdForte123!" 
  disable_password_authentication = false # Permite login com a senha acima


  network_interface_ids = [
    azurerm_network_interface.nic.id,
  ]


  source_image_reference {
    publisher = "Canonical"
    offer     = "0001-com-ubuntu-server-jammy"
    sku       = "22_04-lts"
    version   = "latest"
  }

  # Configuração do disco
  os_disk {
    storage_account_type = "Standard_LRS"
    caching              = "ReadWrite"
  }
}