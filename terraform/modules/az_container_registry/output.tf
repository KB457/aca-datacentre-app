output "container_registry_id" {
  value = azurerm_container_registry.acr.id
}
# The unique resource ID of the Azure Container Registry (ACR).
# Example format:
# /subscriptions/<sub_id>/resourceGroups/<rg_name>/providers/Microsoft.ContainerRegistry/registries/<acr_name>
# Useful for role assignments when you need to give permissions to this registry.





output "container_registry_login_server" {
  value = azurerm_container_registry.acr.login_server
}  

## The login server URL of the ACR.
# Example format:
# <acr_name>.azurecr.io
# This is the address your container app or pipeline will use to push/pull Docker images.
