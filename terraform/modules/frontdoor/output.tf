output "endpoint_hostname" {
  description = "The public hostname of the Front Door endpoint"
  value       = azurerm_cdn_frontdoor_endpoint.fd.host_name
}
