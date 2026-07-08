#!/bin/bash
# example.sh - Error handling demo
set -uo pipefail

cleanup() {
  echo "Cleaning up temp files..."
  rm -f /tmp/demo_tempfile
}
trap cleanup EXIT

echo "Creating temp file..."
touch /tmp/demo_tempfile

run_task() {
  if [ "$1" == "fail" ]; then
    return 1
  fi
  return 0
}

if run_task "ok"; then
  echo "Task 1 succeeded"
else
  echo "Task 1 failed"
fi

run_task "fail" || echo "Task 2 failed as expected, handled gracefully"

echo "Script finished successfully"
exit 0
