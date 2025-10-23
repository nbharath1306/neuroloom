#!/bin/bash

# NeuroLoom Server Restart Script
# Run this when articles aren't updating

echo "🔄 Restarting NeuroLoom server..."

# Kill any process on port 3000
echo "Stopping old server..."
lsof -ti:3000 | xargs kill -9 2>/dev/null

# Wait a second
sleep 1

# Start fresh server
echo "Starting fresh server..."
npm run dev

echo "✅ Server restarted! Visit http://localhost:3000"
