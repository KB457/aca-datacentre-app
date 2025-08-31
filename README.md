🚀 AI Data Centre Monitor
📖 Overview

The AI Data Centre Monitor is a containerized web application that provides a real-time dashboard for monitoring simulated CPU, memory, and temperature metrics.

It includes basic anomaly detection logic (e.g., CPU > 80% or temperature > 75°C flagged as anomaly) to simulate how AI/ML could be integrated in production.

While the current version uses rule-based detection, the system could be extended with ML models for advanced forecasting and anomaly detection in a real-world scenario.

🎯 Project Goals

This project was built to demonstrate a complete DevOps workflow, from local code to cloud infrastructure:

📦 Containerize the app using Docker

🔐 Push images securely to Azure Container Registry (ACR) with vulnerability scanning

🏗 Provision infrastructure as code (IaC) with Terraform modules

⚙️ Enable CI/CD automation using GitHub Actions (Plan, Apply, Destroy, Build & Push)

🌍 Serve the app publicly with HTTPS via Azure Front Door

🏗 Architecture

The following diagram shows how the solution is structured:


## 🛠 Main Features and Services  

| Component                          | Description                                                        |
|-----------------------------|---------------------------------------------------------------------------|
| **Azure Container Registry (ACR)** | Stores Docker images pushed from GitHub workflows                  |
| **Azure Container Apps (ACA)**     | Hosts and scales the AI Data Centre Monitor containerised app      |
| **Azure Front Door**               | Public-facing endpoint, supports HTTPS, domain routing             |
| **Terraform**                      | Automates provisioning of Azure infrastructure                     |
| **GitHub Actions**                 | CI/CD pipelines for building, scanning, and deploying              |
| **Trivy**                          | Security scanning of Docker containers                             |
| **TFLint**                         | Validates Terraform for syntax and standards                       |
