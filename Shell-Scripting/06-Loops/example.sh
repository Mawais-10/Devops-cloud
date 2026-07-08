#!/bin/bash
# example.sh - Loops demo

echo "-- for loop --"
for i in {1..5}; do
  echo "Number: $i"
done

echo "-- while loop --"
count=1
while [ $count -le 3 ]; do
  echo "Count: $count"
  ((count++))
done

echo "-- until loop --"
n=1
until [ $n -gt 3 ]; do
  echo "n = $n"
  ((n++))
done

echo "-- break/continue --"
for i in {1..10}; do
  if [ $i -eq 3 ]; then
    continue
  fi
  if [ $i -eq 6 ]; then
    break
  fi
  echo "i = $i"
done
