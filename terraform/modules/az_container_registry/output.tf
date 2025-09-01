output "container_registry_id" {
  value = azurerm_container_registry.acr.id
}
# The unique resource ID of the Azure Container Registry (ACR).
# Example format:
# /subscriptions/<sub_id>/resourceGroups/<rg_name>/providers/Microsoft.ContainerRegistry/registries/<acr_name>






output "container_registry_login_server" {
  value = azurerm_container_registry.acr.login_server
}  

## The login server URL of the ACR.
# Example format:
# <acr_name>.azurecr.io

