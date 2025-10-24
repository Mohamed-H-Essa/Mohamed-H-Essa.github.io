#!/bin/bash

# Configuration
SERVER_IP="52.57.237.123"
# SERVER_IP="mecodes.live"  # Domain doesn't allow SSH - use IP instead
SSH_KEY="~/Downloads/portfolio_frankfurt.pem"
SERVER_USER="ubuntu"
REMOTE_PATH="/var/www/mecodes.live/public.html"
LOCAL_DIST_PATH="./dist"

echo "🚀 Deploying portfolio to production server..."

# Build the project
echo "📦 Building production bundle..."
npm run build

# Check if build was successful
if [ ! -d "$LOCAL_DIST_PATH" ]; then
    echo "❌ Build failed - dist directory not found"
    exit 1
fi

echo "📤 Uploading files to server..."

# Upload dist files to server
scp -i $SSH_KEY -r $LOCAL_DIST_PATH/* $SERVER_USER@$SERVER_IP:/tmp/portfolio_new/

# Connect to server and move files
ssh -i $SSH_KEY $SERVER_USER@$SERVER_IP << 'EOF'
# Create backup of current site
sudo cp -r /var/www/mecodes.live/public.html /var/www/mecodes.live/public.html_backup_$(date +%Y%m%d_%H%M%S)

# Create directory if it doesn't exist
sudo mkdir -p /var/www/mecodes.live/public.html

# Remove old files (except hidden files like .htaccess)
sudo find /var/www/mecodes.live/public.html -name ".*" -prune -o -type f -exec rm {} \;
sudo find /var/www/mecodes.live/public.html -name ".*" -prune -o -type d -empty -delete

# Move new files
sudo mv /tmp/portfolio_new/* /var/www/mecodes.live/public.html/

# Set proper permissions
sudo chown -R www-data:www-data /var/www/mecodes.live/public.html
sudo chmod -R 755 /var/www/mecodes.live/public.html

# Restart nginx
sudo systemctl reload nginx

echo "✅ Deployment completed successfully!"
EOF

echo "🎉 Portfolio deployed to https://mecodes.live (IP: $SERVER_IP)"