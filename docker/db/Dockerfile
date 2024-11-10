FROM postgres:latest

WORKDIR /docker-entrypoint-initdb.d/

# COPY ./structure /docker-entrypoint-initdb.d/

EXPOSE 5432

# Use the default entrypoint of the postgres image to start the PostgreSQL server
ENTRYPOINT ["docker-entrypoint.sh"]

# Default command is to run PostgreSQL
CMD ["postgres"]