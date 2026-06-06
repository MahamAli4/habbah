#!/bin/sh
set -e

# Development mode: install if needed, generate client, and run dev server
if [ "${NODE_ENV}" = "development" ] || [ "${DEV}" = "true" ]; then
  echo "Starting in development mode"
  if [ ! -d node_modules ]; then
    npm ci
  fi
  npx prisma generate || true
  exec npm run dev
fi

# Production/startup: wait for Postgres, apply schema, optionally seed, then start
DB_HOST=${DB_HOST:-postgres-db}
DB_PORT=${DB_PORT:-5432}
DB_USER=${DB_USER:-postgres}

echo "Waiting for Postgres at ${DB_HOST}:${DB_PORT}..."
until pg_isready -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" >/dev/null 2>&1; do
  echo "Postgres is unavailable - sleeping 2s"
  sleep 2
done

echo "Postgres is ready. Applying Prisma schema..."
npx prisma db push

if [ "${DB_SEED}" = "true" ] || [ "${SEED_DB}" = "true" ]; then
  echo "Seeding database"
  npm run db:seed
fi

exec npm start
