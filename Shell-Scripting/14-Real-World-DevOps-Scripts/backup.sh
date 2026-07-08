#!/bin/bash
# backup.sh - Backup a directory with timestamp, retain last N backups
set -euo pipefail

SOURCE_DIR="${1:-./data}"
BACKUP_DIR="./backups"
RETAIN=5
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/backup_$TIMESTAMP.tar.gz"

mkdir -p "$SOURCE_DIR" "$BACKUP_DIR"

echo "Backing up '$SOURCE_DIR' -> '$BACKUP_FILE'"
tar -czf "$BACKUP_FILE" "$SOURCE_DIR"

echo "Backup created: $BACKUP_FILE"

echo "Cleaning old backups, keeping last $RETAIN..."
ls -1t "$BACKUP_DIR"/backup_*.tar.gz 2>/dev/null | tail -n +$((RETAIN + 1)) | xargs -r rm --

echo "Current backups:"
ls -lh "$BACKUP_DIR"
