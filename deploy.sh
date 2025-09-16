#!/bin/bash

# Build the project
echo "Building the project..."
npm run build

# Create a tarball of the dist folder
echo "Creating deployment package..."
tar -czf portfolio-build.tar.gz -C dist .

echo "Deployment package created: portfolio-build.tar.gz"
echo "Upload this file to your EC2 instance and extract it in your web server directory"
