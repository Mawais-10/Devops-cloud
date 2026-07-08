#!/bin/bash
# example.sh - Operators demo

a=10
b=3
echo "Sum: $((a + b))"
echo "Diff: $((a - b))"
echo "Product: $((a * b))"
echo "Division: $((a / b))"
echo "Modulus: $((a % b))"

if [ $a -gt $b ]; then
  echo "$a is greater than $b"
fi

str1="devops"
str2="devops"
if [ "$str1" == "$str2" ]; then
  echo "Strings match"
fi

if [ -f "example.sh" ] && [ -r "example.sh" ]; then
  echo "example.sh exists and is readable"
fi

if [ -d "/tmp" ]; then
  echo "/tmp directory exists"
fi
