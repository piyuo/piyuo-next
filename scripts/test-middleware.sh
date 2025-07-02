#!/bin/bash

# Test script for middleware functionality
# Usage: ./test-middleware.sh

echo "🧪 Testing Middleware Functionality"
echo "======================================"

# Wait for server to be ready (adjust URL if needed)
SERVER_URL="http://localhost:8788"

echo "⏳ Waiting for server to be ready..."
until curl -s "$SERVER_URL" > /dev/null 2>&1; do
    echo "   Waiting for server..."
    sleep 2
done

echo "✅ Server is ready!"
echo ""

# Test 1: Root path should redirect to detected locale
echo "📍 Test 1: Root path redirection"
echo "curl -I -H 'Accept-Language: fr-FR,fr;q=0.9' $SERVER_URL/"
response=$(curl -I -s -H "Accept-Language: fr-FR,fr;q=0.9" "$SERVER_URL/")
echo "Response:"
echo "$response" | head -n 5
echo ""

# Test 2: English Accept-Language
echo "📍 Test 2: English locale detection"
echo "curl -I -H 'Accept-Language: en-US,en;q=0.9' $SERVER_URL/"
response=$(curl -I -s -H "Accept-Language: en-US,en;q=0.9" "$SERVER_URL/")
echo "Response:"
echo "$response" | head -n 5
echo ""

# Test 3: Chinese locale detection
echo "📍 Test 3: Chinese locale detection"
echo "curl -I -H 'Accept-Language: zh-CN,zh;q=0.9' $SERVER_URL/"
response=$(curl -I -s -H "Accept-Language: zh-CN,zh;q=0.9" "$SERVER_URL/")
echo "Response:"
echo "$response" | head -n 5
echo ""

# Test 4: Existing locale path should not redirect
echo "📍 Test 4: Existing locale path (should not redirect)"
echo "curl -I $SERVER_URL/en/"
response=$(curl -I -s "$SERVER_URL/en/")
echo "Response:"
echo "$response" | head -n 5
echo ""

# Test 5: Static file should not redirect
echo "📍 Test 5: Static file (should not redirect)"
echo "curl -I $SERVER_URL/favicon.ico"
response=$(curl -I -s "$SERVER_URL/favicon.ico")
echo "Response:"
echo "$response" | head -n 5
echo ""

echo "🎉 Middleware tests completed!"
