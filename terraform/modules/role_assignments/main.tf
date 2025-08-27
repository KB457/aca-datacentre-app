resource "azurerm_role_assignment" "acr_pull" {
  scope                = var.container_registry_id
  role_definition_name = var.acr_role_assignment 
  principal_id         = var.identity_principal_id
}                                                                     #Role assignment pull permisions (acr)