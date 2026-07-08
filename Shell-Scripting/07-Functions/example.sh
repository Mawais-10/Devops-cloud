#!/bin/bash
# example.sh - Functions demo

greet() {
  local name=$1
  echo "Hello, $name! Welcome."
}

add_numbers() {
  local sum=$(( $1 + $2 ))
  echo $sum
}

check_service() {
  if [ "$1" == "running" ]; then
    return 0
  else
    return 1
  fi
}

greet "Muhammad"

result=$(add_numbers 10 20)
echo "Sum: $result"

check_service "running"
if [ $? -eq 0 ]; then
  echo "Service check passed"
fi
