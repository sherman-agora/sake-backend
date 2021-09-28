# Prerequisites

1. `yarn`
2. `helm`
3. `kubectl`

# Enable workspace in Yarn

yarn config set workspaces-experimental true

# Install

`yarn`

# Getting Start

## Docker for all service

- `docker-compose build`
- `docker-compose up -d`

## Docker for base service only

- `docker-compose -f docker-compose.base.yml up -d`
- `./services/create-topics.sh`
- `yarn`
- go to every services: `cd services/supplier-ms-service-xxxx`
  1. customer
  2. product
  3. supplier
  4. purchaseOrder
  5. salesOrder
  6. shipping
  7. invoice
  8. delivery
  9. inventory
  10. forecast
  11. xero
  12. gateway
  13. web-integration
- `yarn prisma:deploy`
- `yarn start`

# Deployment

0. connect cluster in k8s
   - `gcloud container clusters get-credentials petgo --zone us-central1-c --project petgo-management-system`
1. deploy kafka
   - `helm install kafka -n petgo --set replicaCount=3 bitnami/kafka`
1. create topics
   - `./helm/createTopics.sh`
1. deploy mongo
   - `kubectl apply -f kubernetes/mongo-persistentvolumeclaim.yaml`
   - `kubectl apply -f kubernetes/mongo-deployment.yaml`
   - `kubectl apply -f kubernetes/mongo-service.yaml`
1. deploy prisma
   - `kubectl apply -f kubernetes/prisma-configmap.yaml`
   - `kubectl apply -f kubernetes/prisma-deployment.yaml`
   - `kubectl apply -f kubernetes/prisma-service.yaml`
1. create and push images
   - `npm run build:prod`
   - `npm run push:prod`
1. deploy each services `kubectl apply -f kubernetes/<service-name>-deployment.yaml -f kubernetes/<service-name>-service.yaml`
   - customer
   - product
   - supplier
   - delivery
   - sales-order
   - po
   - web-integration
   - invoice
   - shipping
   - inventory
   - forecast

# Reference

TLS - [How to Set Up an Nginx Ingress with Cert-Manager on DigitalOcean Kubernetes](https://www.digitalocean.com/community/tutorials/how-to-set-up-an-nginx-ingress-with-cert-manager-on-digitalocean-kubernetes#step-1-%E2%80%94-setting-up-dummy-backend-services)
