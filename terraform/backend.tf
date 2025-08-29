terraform {
  backend "azurerm" {
    resource_group_name   = "tfstate-rg"
    storage_account_name  = "tfstatekb12345"
    container_name        = "tfstate"
    key                   = "aca-project-1.tfstate"
  }
}
