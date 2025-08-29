variable "sub_id" {
  description = "The sub ID"
  type        = string
}


variable "resource_group_name" {
  description = "The name of the resource group"
  type        = string
}

variable "location" {
  description = "The location of the resource group"
  type        = string
}


// acr variables

variable "acr_name" {
  description = "The name of the azure container registry"
  type = string
}


// network module variables

variable "vnet_name" {
  description = "This is the name of the vnet"
  type = string
}
variable "container_subnet_name" {
  description = "This is the name of the subnet"
  type = string
}

variable "address_space" {
  description = "The address space for the VNET"
  type = list(string)
  
}

variable "address_prefixes" {
  description = "The address space for the subnet of the container app"
  type = list(string)
  
}

// az container app

variable "env_name" {
  description = "enviroment name"
  type = string
}

variable "app_name" {
  description = "app name"
  type = string
  
}

variable "template_container_name" {
  description = "container name"
  type = string
}

variable "image_repository" {
  description = "Repository name in ACR"
  type        = string
}


variable "image_tag" {
  description = "Image tag"
  type        = string
}

variable "target_port" {
  description = "The port inside the container that the application listens on"
  type        = number
}

//identity module

variable "identity_name" { 
  description = "Name of the user-assigned managed identity" 
  type = string 
}

//role assignments

variable "acr_role_assignment" {
  description = "Role assigned to the identity for ACR access (default: AcrPull)"
  type        = string
}

//front door

variable "profile_name" {
  description = "Name of the Front Door profile"
  type        = string
}

variable "endpoint_name" {
  description = "Name of the Front Door endpoint (becomes part of *.azurefd.net)"
  type        = string
}

variable "origin_group_name" {
  description = "Name of the Front Door origin group"
  type        = string
}

variable "origin_name" {
  description = "Name of the Front Door origin (Container App backend)"
  type        = string
}

variable "route_name" {
  description = "Name of the Front Door route"
  type        = string
}

#variable "origin_host_name" {
#  description = "FQDN of the Container App (backend origin)"
#  type        = string
#}

variable "origin_host_header" {
  description = "Host header sent to the origin (defaults to origin_host_name)"
  type        = string
}

variable "forwarding_protocol" {
  description = "How Front Door forwards requests to the origin (HttpsOnly, HttpOnly, or MatchRequest)"
  type        = string
}
