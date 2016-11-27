FROM node

RUN mkdir /app
WORKDIR /app

# Install dependencies
COPY package.json /app/package.json
RUN cd /app; npm install && npm ls
RUN mv /app/node_modules /node_modules

# Copy source code
COPY . /app

EXPOSE 3000

CMD ["npm", "start"]
