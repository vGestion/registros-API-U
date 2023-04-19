# Establecer la imagen base de Node.js
FROM node:18.14-alpine

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar los archivos de la aplicación
COPY package*.json ./
COPY . .

# Instalar las dependencias
RUN npm install

# Exponer el puerto de la aplicación
EXPOSE 3005

# Establecer las variables de entorno
ENV PORT_U=3005
ENV DB_URL_U=mongodb://mongodb:27017/Datalat

# Iniciar la aplicación
CMD ["npm", "run", "start"]