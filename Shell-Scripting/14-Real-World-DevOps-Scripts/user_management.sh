#!/bin/bash
# user_management.sh - Create a Linux user with home dir and group
# Run with sudo/root privileges
set -euo pipefail

USERNAME="${1:?Usage: sudo ./user_management.sh <username> <groupname>}"
GROUPNAME="${2:?Usage: sudo ./user_management.sh <username> <groupname>}"

if id "$USERNAME" &>/dev/null; then
  echo "User $USERNAME already exists."
  exit 1
fi

if ! getent group "$GROUPNAME" > /dev/null; then
  groupadd "$GROUPNAME"
  echo "Group $GROUPNAME created."
fi

useradd -m -g "$GROUPNAME" -s /bin/bash "$USERNAME"
echo "User $USERNAME created and added to group $GROUPNAME."

passwd "$USERNAME"
