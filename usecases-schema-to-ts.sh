#!/bin/sh
set -e
echo "Fetching schema...."
URL=$(cat src/constants.ts | grep JSON_SCHEMA_URL | grep -o "http.*\.json")
echo $URL
SCHEMA_FILE=usecases-schema.json
DESTINATION_FILE=src/types/usecases.ts
curl $URL -o ./$SCHEMA_FILE
echo "Generating TypeScript file...."
npx json-schema-to-typescript "$SCHEMA_FILE" > "$DESTINATION_FILE"
rm $SCHEMA_FILE
echo "Done converting schema to usecases.ts\n"
