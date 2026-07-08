#!/bin/bash
# example.sh - Conditionals demo

read -p "Enter your marks: " marks

if [ "$marks" -ge 90 ]; then
  echo "Grade: A"
elif [ "$marks" -ge 75 ]; then
  echo "Grade: B"
elif [ "$marks" -ge 50 ]; then
  echo "Grade: C"
else
  echo "Grade: F"
fi

read -p "Choose an action (start/stop/status): " action
case $action in
  start)
    echo "Starting service..."
    ;;
  stop)
    echo "Stopping service..."
    ;;
  status)
    echo "Checking status..."
    ;;
  *)
    echo "Invalid option. Use start/stop/status."
    ;;
esac
