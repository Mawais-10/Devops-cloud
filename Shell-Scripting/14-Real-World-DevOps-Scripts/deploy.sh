#!/bin/bash
# deploy.sh - Simple deployment script
set -euo pipefail

APP_DIR="${1:-/opt/myapp}"
SERVICE_NAME="${2:-myapp}"

echo "Starting deployment for $SERVICE_NAME..."

if [ -d "$APP_DIR" ]; then
  cd "$APP_DIR"
  echo "Pulling latest code..."
  git pull origin main
else
  echo "ERROR: $APP_DIR does not exist. Aborting deployment."
  exit 1
fi

echo "Restarting service..."
systemctl restart "$SERVICE_NAME"

if systemctl is-active --quiet "$SERVICE_NAME"; then
  echo "Deployment successful. $SERVICE_NAME is running."
else
  echo "ERROR: Deployment failed. $SERVICE_NAME is not running."
  exit 1
fi
