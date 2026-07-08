#!/bin/bash
# example.sh - User input & arguments demo

echo "Script name: $0"
echo "Number of arguments passed: $#"
echo "All arguments: $@"

if [ $# -eq 0 ]; then
  echo "No arguments passed. Try: ./example.sh env deploy"
else
  echo "First argument: $1"
  echo "Second argument: $2"
fi

read -p "Enter your name: " name
echo "Hello, $name! Welcome to shell scripting."

read -sp "Enter a secret word: " secret
echo ""
echo "Got it, but I won't print your secret :)"
