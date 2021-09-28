This project is based on Petco-backend

# Prerequisites

1. `yarn`
2. `kubectl`
3. `docker`

# Tech list
1. Microservices
1. NodeJs
1. Graphql - [ApolloGraphql](https://www.apollographql.com/)
1. Prisma - [ORM](https://www.prisma.io/)
1. MongoDB
1. MongoBI
1. Kafka 
1. CubeJs
1. letsencrypt (SSL)
1. Kubernetes
1. Docker
# Install packages in each service

`yarn`
<br />
e.g: `cd services/supplier-ms-service-customer` + `yarn`

# Getting Start

## Docker for all service in local develop

- `docker-compose -f docker-compose.base.yml up -d`
- `docker-compose -f docker-compose.local.yml up -d`
## Docker for all service for deployment

- `docker-compose -f docker-compose.production.yml build`
- `docker-compose -f docker-compose.production.yml push`
> push the docker image to cloud

## start service only

- `docker-compose -f docker-compose.base.yml up -d`
- `./services/create-topics.sh`
- go to every services: `cd services/supplier-ms-service-xxxx`
- `yarn prisma:deploy`
- `yarn start`

# Reporting server
1. start mongobi `services/mongobi` 
1. start cubejs `services/cubejs`

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
1. create and push service images

1. edit kubernetes deployment configuration file
`kubernetes/services/<service-name>-deployment.yaml`

1. deploy each services `kubectl apply -f kubernetes/services/<service-name>-deployment.yaml -f kubernetes/services/<service-name>-service.yaml`

# Reference

TLS - [How to Set Up an Nginx Ingress with Cert-Manager on DigitalOcean Kubernetes](https://www.digitalocean.com/community/tutorials/how-to-set-up-an-nginx-ingress-with-cert-manager-on-digitalocean-kubernetes#step-1-%E2%80%94-setting-up-dummy-backend-services)

CubeJs - [The Analytics API
for Building Data Apps](https://cube.dev/)

MongoBi - [MongoDB Connector for BI
](https://docs.looker.com/setup-and-management/database-config/mongobi)

