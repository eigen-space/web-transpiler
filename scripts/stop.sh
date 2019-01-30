#!/bin/bash

read port <<< $(lsof -i :3031 | grep -v 'PID'| awk '{print $2}')
echo $port
kill $port