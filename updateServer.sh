#!/bin/bash

docker exec csvreader ng build --prod --base-href /csvreader --deployUrl csvreader/ --outputPath dist

ssh raspberry rm -rf /var/www/personnal-site/csvreader/*

scp -r dist/* raspberry:/var/www/personnal-site/csvreader/
