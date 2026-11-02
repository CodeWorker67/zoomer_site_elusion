#!/usr/bin/env bash
# Сборка фронта на VPS (каталог проекта: /opt/zoomersky.info).
# Использование:
#   sudo ./scripts/deploy-frontend.sh
#   APP_ROOT=/opt/zoomersky.info ./scripts/deploy-frontend.sh

set -euo pipefail

APP_ROOT="${APP_ROOT:-/opt/zoomersky.info}"
NGINX_SITE="${NGINX_SITE:-/etc/nginx/sites-available/zoomersky.info}"

if [[ ! -f "${APP_ROOT}/package.json" ]]; then
  echo "Ошибка: не найден ${APP_ROOT}/package.json" >&2
  echo "Клонируйте репозиторий в ${APP_ROOT} или задайте APP_ROOT." >&2
  exit 1
fi

if [[ ! -f "${APP_ROOT}/.env" ]]; then
  echo "Ошибка: нет ${APP_ROOT}/.env (нужен DOMEN=https://zoomersky.info и VITE_*)." >&2
  exit 1
fi

cd "${APP_ROOT}"

echo "==> npm ci"
npm ci

echo "==> npm run build"
npm run build

if [[ ! -d "${APP_ROOT}/dist" ]]; then
  echo "Ошибка: после сборки нет dist/" >&2
  exit 1
fi

echo "==> права для nginx (www-data)"
if id www-data &>/dev/null; then
  chown -R www-data:www-data "${APP_ROOT}/dist"
fi
chmod -R a+rX "${APP_ROOT}/dist"

if command -v nginx &>/dev/null && [[ -f "${NGINX_SITE}" ]]; then
  echo "==> проверка nginx"
  nginx -t
  if systemctl is-active --quiet nginx 2>/dev/null; then
    systemctl reload nginx
    echo "nginx перезагружен"
  fi
else
  echo "nginx не трогаем (нет бинарника или ${NGINX_SITE})"
fi

echo "Готово: ${APP_ROOT}/dist"
