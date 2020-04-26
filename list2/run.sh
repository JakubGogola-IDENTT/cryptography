#!/bin/bash

PASS="my_super_secret_password"
KEY_ID="my_key"

# create key store
node ./src/key-store/createKeyStore.js --password=PASS --keyId=KEY_ID

# CBC
node index.js --password=PASS --keyId=KEY_ID \
    --mode=enc --algorithm=cbc --inputFile=./data/gopher.jpg --outputFile=./data/gopher_enc_cbc

node index.js --password=PASS --keyId=KEY_ID \
    --mode=dec --algorithm=cbc --inputFile=./data/gopher_enc_cbc --outputFile=./data/gopher_dec_cbc.jpg

# OFB
node index.js --password=PASS --keyId=KEY_ID \
    --mode=enc --algorithm=ofb --inputFile=./data/gopher.jpg --outputFile=./data/gopher_enc_ofb

node index.js --password=PASS --keyId=KEY_ID \
    --mode=dec --algorithm=ofb --inputFile=./data/gopher_enc_ofb --outputFile=./data/gopher_dec_ofb.jpg

# CTR
node index.js --password=PASS --keyId=KEY_ID \
    --mode=enc --algorithm=ctr --inputFile=./data/gopher.jpg --outputFile=./data/gopher_enc_ctr

node index.js --password=PASS --keyId=KEY_ID \
    --mode=dec --algorithm=ctr --inputFile=./data/gopher_enc_ctr --outputFile=./data/gopher_dec_ctr.jpg