#!/bin/sh

# This file is executed before running the app to fetch the latest information about the schema.
# If it changes under the https://github.com/ebrains-cls-interactive/usecases-info repo
# running this script will allow the typescript to adapt to the new rules.

set -e
echo "Fetching schema...."
SCHEMA_URL=https://raw.githubusercontent.com/ebrains-cls-interactive/usecases-info/develop/usecases-info.schema.json
echo $SCHEMA_URL
SCHEMA_FILE=usecases-schema.json
DESTINATION_FILE=src/types/usecases.ts
curl $SCHEMA_URL -o ./$SCHEMA_FILE
echo "Generating TypeScript file...."
npm_config_yes=true npx json-schema-to-typescript "$SCHEMA_FILE" > "$DESTINATION_FILE"
rm $SCHEMA_FILE
echo "Done converting schema to usecases.ts\n"
