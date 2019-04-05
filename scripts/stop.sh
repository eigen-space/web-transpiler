#!/bin/bash

read port <<< $(lsof -i :3031 | grep -v 'PID'| awk '{print $2}')
echo $port

if [ "$port" ]
  then
    kill $port
fi