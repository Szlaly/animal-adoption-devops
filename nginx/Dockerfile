FROM nginx:alpine

# Frontend build fájlok bemásolása
COPY --from=frontend-build /app /usr/share/nginx/html

# Nginx konfiguráció
COPY config/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
