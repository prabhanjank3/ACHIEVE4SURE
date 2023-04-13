#!/bin/bash
cd /home/ec2-user/server
npm install
npm install --save react react-dom react-scripts > /dev/null 2> /dev/null < /dev/null &
npm install pm2 -g