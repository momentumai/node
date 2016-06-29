#!/usr/bin/env bash
if [ "$0" != "./scripts/deploy.sh" ]; then
    echo "USE: npm run-script deploy"
    exit 1
fi

rm -rf ./node_modules
rm -rf ../shared-node/node_modules
mkdir node_modules
cd node_modules

cp -R ../config @config
cp -R ../../shared-node @lib
cd ..

CLOUDSDK_CORE_PROJECT="frontend-api-test"
gcloud preview app deploy

rm -rf ./node_modules
npm install