#!/bin/bash
cd /home/ec2-user/server/src
npm start > /dev/null 2> /dev/null < /dev/null &
pm2 start npm --name "covidapp" -- start
pm2 startup
pm2 save
pm2 restart all

