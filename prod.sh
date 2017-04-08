#!/usr/bin/env bash
docker kill $(docker ps -f ancestor=192.168.0.25/images/qingclass-distribution -q)
docker rmi -f $(docker images -q 192.168.0.25/images/qingclass-distribution)
docker pull 192.168.0.25/images/qingclass-distribution
docker run --log-opt syslog-address=tcp://192.168.0.35:12121 --log-driver=syslog --log-opt tag="qingclass-distribution-prod" -e "NODE_ENV=production" --restart=always -d -p 9001 192.168.0.25/images/qingclass-distribution npm start
docker ps
docker rmi -f $(docker images -f "dangling=true" -q) # 清理respsitory 为none的image
docker images