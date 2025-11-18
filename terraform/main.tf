
terraform {
  required_version = ">= 1.0"
  
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~>3.0" # Usa a versão 3.x do provider da Azure
    }
  }
}

provider "azurerm" {
  features {} 
}