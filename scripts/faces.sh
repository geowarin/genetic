#!/usr/bin/env bash

for i in {1..20} ; do
    url=$(curl -s https://100k-faces.glitch.me/random-image-url | jq .url -r)
    echo "$url"
    curl -s "$url" -o "../public/face-$i.jpg"
done
