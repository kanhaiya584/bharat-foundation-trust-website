#!/bin/sh
set -e

PORT="${PORT:-80}"
sed -i "s/Listen 80/Listen ${PORT}/" /etc/apache2/ports.conf
sed -i "s/:80>/:${PORT}>/" /etc/apache2/sites-available/000-default.conf

if [ ! -f .env ]; then
    cp .env.example .env
fi

php artisan config:clear
php artisan config:cache
php artisan route:cache
php artisan migrate --force

exec apache2-foreground
