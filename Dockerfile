# Utilisez l'image officielle de Python comme parent
FROM python:3.8-slim

# Définissez le répertoire de travail dans le conteneur
WORKDIR /code

# Copiez les fichiers de dépendances et installez-les
COPY django_rest/requirements.txt /code/
RUN pip install --no-cache-dir -r requirements.txt

# Copiez le reste de l'application Django dans le répertoire de travail
COPY django_rest /code/

# Le port sur lequel Django va s'exécuter
EXPOSE 8000

# Commande pour démarrer l'application Django
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
