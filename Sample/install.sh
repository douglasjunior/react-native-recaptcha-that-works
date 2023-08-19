#!/bin/bash

unameOut="$(uname -s)"

echo "$unameOut";

rm -rf ../node_modules/
rm -rf node_modules/
yarn install
rm -rf node_modules/react-native-recaptcha-that-works/Sample/ 
rm -rf node_modules/react-native-recaptcha-that-works/.git/

if [ "$unameOut" == "Darwin" ]; then
    cd ios
    pod install
fi
