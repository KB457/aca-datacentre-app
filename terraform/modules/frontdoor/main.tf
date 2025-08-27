# Create a Front Door profile (Standard or Premium tier)
resource "azurerm_cdn_frontdoor_profile" "fd" {
  name                = var.profile_name
  resource_group_name = var.resource_group_name
  sku_name            = "Standard_AzureFrontDoor" # or Premium if you need WAF etc.
}

# Front Door endpoint (the *.azurefd.net public URL you’ll get)
resource "azurerm_cdn_frontdoor_endpoint" "fd" {
  name = var.endpoint_name
  cdn_frontdoor_profile_id = azurerm_cdn_frontdoor_profile.fd.id
}


# Group of origins (you could have multiple Container Apps or backends later)
resource "azurerm_cdn_frontdoor_origin_group" "og" {
  name = var.origin_group_name
  cdn_frontdoor_profile_id = azurerm_cdn_frontdoor_profile.fd.id

  load_balancing {}

  health_probe {
    protocol = "Https"
    path = "/"
    interval_in_seconds = 100

  }
}


# A single origin = your Container App public FQDN

resource "azurerm_cdn_frontdoor_origin" "origin" {
  name = var.origin_name
  cdn_frontdoor_origin_group_id = azurerm_cdn_frontdoor_origin_group.og.id
  host_name = var.origin_host_name
  http_port = 80
  https_port = 443
  origin_host_header = var.origin_host_name
  priority = 1
  weight = 1000
  enabled = true
  certificate_name_check_enabled = true


}



# Route = tells Front Door how to handle traffic
resource "azurerm_cdn_frontdoor_route" "route" {
  name                          = var.route_name
  cdn_frontdoor_endpoint_id     = azurerm_cdn_frontdoor_endpoint.fd.id
  cdn_frontdoor_origin_group_id = azurerm_cdn_frontdoor_origin_group.og.id
  cdn_frontdoor_origin_ids      = [azurerm_cdn_frontdoor_origin.origin.id]
  supported_protocols = ["Http", "Https"]
  patterns_to_match   = ["/*"]
  forwarding_protocol    = "MatchRequest"
  https_redirect_enabled = true
  enabled                = true
}
