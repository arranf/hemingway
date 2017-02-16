#!/usr/bin/env bash

mkdir -p ./build/js
mkdir -p ./build/css
mkdir -p ./build/sass
mkdir -p ./static/fonts

cp -R node_modules/font-awesome/fonts/* ./static/fonts/
cp -R node_modules/font-awesome/scss/* ./build/sass/
cp -R node_modules/highlightjs/styles/github-gist.css ./build/css/
cp -R node_modules/highlightjs/highlight.pack.js ./build/js/
cp -R node_modules/umbrellajs/umbrella.js ./build/js/
cp -R node_modules/lunr/lunr.js ./build/js/
