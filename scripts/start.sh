#!/bin/bash

chmod -R 755 /opt/services/transpiler
cd /opt/services/transpiler/dist/
node -v
yarn
nohup node ./server.js > transpiler.out &
