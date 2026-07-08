#!/bin/bash
# example.sh - Variables demo

name="Muhammad"
role="DevOps Learner"
export ENV="production"

echo "Name: $name"
echo "Role: ${role}"
echo "Environment (exported): $ENV"

num1=5
num2=10
sum=$((num1 + num2))
echo "Sum of $num1 and $num2 is: $sum"

readonly VERSION="1.0"
echo "Script version: $VERSION"

echo "Script name: $0"
echo "Process ID: $$"
echo "Current user: $USER"
