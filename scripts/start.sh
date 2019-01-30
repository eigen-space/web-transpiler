#!/bin/bash

chmod -R 755 /opt/services/transpiler
cd /opt/services/transpiler/
yarn
nohup node ./server.js > transpiler.out &