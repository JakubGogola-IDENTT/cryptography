#!/bin/bash

PASS="my_super_secret_password"
KEY_ID="my_key"

npm run start:oracle -- --password=PASS --keyId=KEY_ID --keyStorePath=./keyStore.json