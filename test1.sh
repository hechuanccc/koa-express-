#!/usr/bin/env bash
docker kill $(docker ps -f ancestor=192.168.0.25:5000/test1/qingclass-distribution -q)
docker rmi -f $(docker images -q 192.168.0.25:5000/test1/qingclass-distribution)
docker pull 192.168.0.25:5000/test1/qingclass-distribution
docker run --log-opt syslog-address=tcp://192.168.0.35:12121 --log-driver=syslog --log-opt tag="qingclass-distribution-test1" \
	-e "NODE_ENV=development" \
	-d --net="host" -p 9001:9001 192.168.0.25:5000/test1/qingclass-distribution node ./bin/www
docker ps
docker rmi -f $(docker images -f "dangling=true" -q) # 清理respsitory 为none的image
#docker rmi -f $(docker images | grep "^<none>" | awk '{print $3}')
docker images