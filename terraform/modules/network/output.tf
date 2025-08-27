output "container_subnet_id" {
  value = azurerm_subnet.container_subnet.id
}

output "vnet_id" {
  value = azurerm_virtual_network.vnet.id
}