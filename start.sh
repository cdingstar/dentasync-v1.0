#!/bin/bash
cd "$(dirname "$0")"

echo "=== DentaSync Demo Startup Script ==="

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "⚠️  Dependencies not found. Installing..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ npm install failed! Please check your network or package.json."
        exit 1
    fi
    echo "✅ Dependencies installed successfully."
else
    echo "ℹ️  Dependencies already installed."
fi

echo "🚀 Starting development server on port 3000..."
echo "👉 You can access the app at http://localhost:3000"

# Start the dev server
npm run dev
