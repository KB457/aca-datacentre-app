output "identity_id" {
  description = "The resource ID of the identity (used by Container App)"
  value       = azurerm_user_assigned_identity.this.id
}

output "identity_principal_id" {
  description = "The principal ID of the identity (used in Role Assignments)"
  value       = azurerm_user_assigned_identity.this.principal_id
}