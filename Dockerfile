FROM node AS ui-build
WORKDIR /app
COPY ./client/package.json .
RUN npm install
COPY . .
CMD ["npm","start"]
EXPOSE 3001

# FROM node AS server-build
# WORKDIR /root/
# COPY --from=ui-build /usr/src/app/client/build ./client/build
# COPY server/package*.json ./server/
# RUN cd server && npm install
# COPY server/src/app.ts ./server/

# EXPOSE 3000

# CMD ["node", "./server/src/app.ts"]