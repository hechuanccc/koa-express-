FROM 192.168.0.25:5000/images/alpine-node
ENV NODE_ENV=production
COPY ./ /sxdata/qingclass-distribution/
WORKDIR /sxdata/qingclass-distribution/
EXPOSE 9001
RUN npm install -g pm2 && \
	npm update pm2 -g && \
	pm2 updatePM2 && \
	npm install
CMD ["npm", "start"]