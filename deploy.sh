#!/bin/bash
# Quick deployment script for DreamHost
# Run this after uploading files to your server

echo "🚀 Starting DreamHost deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Make sure you're in the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install --production

# Build the application
echo "🔨 Building Next.js application..."
npm run build

# Check if build was successful
if [ ! -d ".next" ]; then
    echo "❌ Error: Build failed. .next directory not found."
    exit 1
fi

echo "✅ Build completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Verify environment variables are set in DreamHost panel"
echo "2. Restart Passenger in DreamHost panel"
echo "3. Visit your domain to test"
echo ""
echo "To restart Passenger:"
echo "  - Go to Domains → Manage Domains → Edit your domain"
echo "  - Click 'Restart Passenger' button"
echo ""
echo "To check logs:"
echo "  tail -f ~/logs/yourdomain.com/http/error.log"

