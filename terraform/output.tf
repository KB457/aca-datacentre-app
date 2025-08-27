output "container_app_fqdn" {
  value = module.az_container_app.app_fqdn
}

output "frontdoor_endpoint_hostname" {
  value = module.frontdoor.endpoint_hostname
}
