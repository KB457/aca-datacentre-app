resource "azurerm_container_app_environment" "dc_env" {
  name                       = var.env_name
  location                   = var.location
  resource_group_name        = var.resource_group_name
  infrastructure_subnet_id = var.container_subnet_id
  internal_load_balancer_enabled = false
}

resource "azurerm_container_app" "dc_app" {
  name                         = var.app_name
  container_app_environment_id = azurerm_container_app_environment.dc_env.id
  resource_group_name          = var.resource_group_name
  revision_mode                = "Single"

   identity {
    type         = "UserAssigned"
    identity_ids = [var.identity_id]
  }
    registry {
    server   = var.container_registry_login_server
    identity = var.identity_id
  }

  template {
    container {
      name   = var.template_container_name
      image  = "${var.container_registry_login_server}/${var.image_repository}:${var.image_tag}"
      cpu    = 0.25
      memory = "0.5Gi"
    }
  }


  ingress {
    external_enabled = true
    target_port      = var.target_port

    traffic_weight {
      latest_revision = true
      percentage      = 100
    }
  }
  # 👇 Ensure ACR role assignment is created first
  #depends_on = [module.role_assignments]
}

