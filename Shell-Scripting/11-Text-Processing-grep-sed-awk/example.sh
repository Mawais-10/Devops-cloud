#!/bin/bash
# example.sh - Text processing demo

sample="sample.log"
cat > "$sample" << DATA
INFO server started
ERROR failed to connect to db
INFO request handled
ERROR disk space low
WARNING high memory usage
DATA

echo "-- grep: find ERROR lines --"
grep "ERROR" "$sample"

echo "-- grep -c: count ERROR lines --"
grep -c "ERROR" "$sample"

echo "-- sed: replace ERROR with CRITICAL --"
sed 's/ERROR/CRITICAL/g' "$sample"

echo "-- awk: print only 2nd column --"
awk '{print $2}' "$sample"

echo "-- sort + uniq: count log levels --"
awk '{print $1}' "$sample" | sort | uniq -c

rm "$sample"
