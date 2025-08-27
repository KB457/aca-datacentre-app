output "app_fqdn" {
  value = azurerm_container_app.dc_app.latest_revision_fqdn
}