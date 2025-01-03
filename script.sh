#!/bin/bash



# Update Package Repositories
sudo apt-get update -y

# Install Node.js 
sudo apt-get install -y nodejs

# Install SQLite3
sudo apt-get install -y sqlite3

# Install Git
sudo apt-get install -y git

# Install npm 
sudo apt-get install -y npm

# Install required Node.js modules
npm install express body-parser sqlite3
