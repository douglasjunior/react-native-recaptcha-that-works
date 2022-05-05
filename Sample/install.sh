#!/bin/bash

rm -rf ../node_modules/
rm -rf node_modules/
rm -rf ios/Pods/

yarn install

unameOut="$(uname -s)"

if [ "$unameOut" == "Darwin" ]; then
    cd ios
    pod install
fi
