# Utilisez l'image officielle de Node.js comme parent
FROM node:14

# Définissez le répertoire de travail dans le conteneur
WORKDIR /app

# Copiez les fichiers de dépendances et installez-les
COPY react_app/package*.json /app/
RUN npm install

# Copiez le reste de l'application React dans le répertoire de travail
COPY react_app /app/

# Exposez le port sur lequel l'application React va s'exécuter
EXPOSE 5173

# Commande pour démarrer l'application React
CMD ["npm", "run", "dev"]
