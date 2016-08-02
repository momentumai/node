#!/usr/bin/env bash

MOMENTUM_VERSION=`date '+%Y%m%dt%H%M%S'`
gcloud preview app deploy node-api.yaml --quiet --version $MOMENTUM_VERSION --no-promote
mkdir tmp
cd tmp
git clone -b dev git@github.com:momentumai/static.git
cd ./static
cat <<EOF > ./config/version.config.json
{"endpoint": "https://${MOMENTUM_VERSION}-dot-node-api-dot-momentum-ai.appspot.com/api/"}
EOF
git config --global user.email "admin@momentum.ai"
git config --global user.name "Zoltan Molnar"
git add ./config/version.config.json
git commit -m "Switched to version $MOMENTUM_VERSION"
git push origin dev
