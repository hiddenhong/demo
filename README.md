## Tsinghua-P88

### Introduction

To be continued

### Development

1. Start a local machine: `docker-machine create -d virtualbox p88dev`
2. Set env: `eval "$(docker-machine env p88dev)"`
3. Build images: `docker-compose build`
4. Start services: `docker-compose up -d`
5. Run web container: `docker-compose run web sh migration.sh`
6. Check IP: `docker-machine ip p88dev`
7. Configure API in frontend: 
    * Enter frontend container `docker exec -it dockerorchestration_frontend_1 bash`
    * Open file `modules/endpoints/api.js`
    * Find `ROOT_URL` and modify the IP with the IP of this docker machine
    * Refresh webpack: `webpack --config webpack.production.config.js`
8. View site from browser with the IP and port 8080


### Production

#### Deploy to Aliyun ECS
1. Install and configure Aliyun docker machine, refer to https://help.aliyun.com/document_detail/26088.html
2. Start a local machine: `docker-machine create -d aliyunecs`
3. Build images: `docker-compose build`
4. Start services: `docker-compose up -d`
5. Run web container: `docker-compose run web sh migration.sh`
6. Check IP: `docker-machine ip aliyunecs`
7. Configure API in frontend: 
    * Enter frontend container `docker exec -it dockerorchestration_frontend_1 bash`
    * Open file `modules/endpoints/api.js`
    * Find `ROOT_URL` and modify the IP with the IP of this docker machine
    * Refresh webpack: `webpack --config webpack.production.config.js`
8. View site from browser with the IP and port 8080


To be continued