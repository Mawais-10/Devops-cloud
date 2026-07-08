#!/bin/bash
# service_monitor.sh - Check if a service is running, restart if not
set -uo pipefail

SERVICE_NAME="${1:-nginx}"

if systemctl is-active --quiet "$SERVICE_NAME"; then
  echo "$SERVICE_NAME is running."
else
  echo "$SERVICE_NAME is NOT running. Attempting restart..."
  if systemctl restart "$SERVICE_NAME"; then
    echo "$SERVICE_NAME restarted successfully."
  else
    echo "ERROR: Failed to restart $SERVICE_NAME. Manual intervention needed."
    exit 1
  fi
fi
