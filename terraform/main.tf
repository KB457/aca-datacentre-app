terraform {
  required_version = ">= 1.5.0"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.100"   # or higher
    }
  }
}


provider "azurerm" {
  features {}
  subscription_id = var.sub_id
}


resource "azurerm_resource_group" "rg" {
  name     = var.resource_group_name
  location = var.location
}

module "az_container_app" {
  source = "./modules/az_container_app"
  resource_group_name = azurerm_resource_group.rg.name
  location = var.location
  env_name = var.env_name
  app_name = var.app_name
  template_container_name = var.template_container_name
  image_repository = var.image_repository
  image_tag = var.image_tag
  target_port = var.target_port
  
  identity_id = module.identity.identity_id
  container_subnet_id = module.network.container_subnet_id

    # <-- the important part: wiring ACR outputs into this module
  container_registry_id           = module.az_container_registry.container_registry_id
  container_registry_login_server = module.az_container_registry.container_registry_login_server
  depends_on = [module.role_assignments]
 
}

module "az_container_registry" {
  source = "./modules/az_container_registry"
  resource_group_name = azurerm_resource_group.rg.name
  location = var.location
  acr_name = var.acr_name
}

module "frontdoor" {
  source = "./modules/frontdoor"
  location = var.location
  resource_group_name = azurerm_resource_group.rg.name
  origin_group_name = var.origin_group_name
  route_name = var.route_name
  endpoint_name = var.endpoint_name
  profile_name = var.profile_name
  origin_name = var.origin_name
  custom_domain_name = var.custom_domain_name
  custom_name = var.custom_name
  
  origin_host_name = module.az_container_app.app_fqdn





}

module "network" {
  source = "./modules/network"
  resource_group_name = azurerm_resource_group.rg.name
  location = var.location
  vnet_name = var.vnet_name
  container_subnet_name = var.container_subnet_name
  address_space = var.address_space
  address_prefixes = var.address_prefixes



  
}

module "role_assignments" {
  source = "./modules/role_assignments"
  acr_role_assignment = var.acr_role_assignment

container_registry_id = module.az_container_registry.container_registry_id
identity_principal_id = module.identity.identity_principal_id
}

module "identity" {
  source              = "./modules/identity"
  identity_name       = var.identity_name
  resource_group_name = azurerm_resource_group.rg.name
  location            = var.location

}
