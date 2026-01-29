#!/bin/bash

# Notes Application Startup Script
# This script sets up and starts the Notes application

set -e  # Exit on any error

echo "=========================================="
echo "  Notes Application - Startup Script"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

# Check if Node.js is installed
echo "Checking requirements..."
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js v24 or higher."
    exit 1
fi
print_success "Node.js $(node --version) found"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm."
    exit 1
fi
print_success "npm $(npm --version) found"

# Check if MongoDB is installed
if ! command -v mongod &> /dev/null; then
    print_error "MongoDB is not installed."
    print_info "Please install MongoDB:"
    print_info "  macOS: brew tap mongodb/brew && brew install mongodb-community@8.2"
    print_info "  Linux: Follow https://docs.mongodb.com/manual/installation/"
    exit 1
fi
print_success "MongoDB found"

echo ""
echo "Setting up MongoDB..."

# Check if MongoDB is running
if pgrep -x "mongod" > /dev/null; then
    print_success "MongoDB is already running"
else
    print_info "Starting MongoDB..."
    
    # Try to start MongoDB based on OS
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        brew services start mongodb-community 2>/dev/null || {
            print_error "Failed to start MongoDB using brew services"
            print_info "Trying to start mongod manually..."
            mongod --config /usr/local/etc/mongod.conf --fork
        }
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        sudo systemctl start mongod || {
            print_error "Failed to start MongoDB service"
            print_info "Trying to start mongod manually..."
            sudo mongod --fork --logpath /var/log/mongodb/mongod.log
        }
    else
        print_error "Unable to auto-start MongoDB on this OS"
        print_info "Please start MongoDB manually and run this script again"
        exit 1
    fi
    
    # Wait for MongoDB to start
    sleep 3
    
    if pgrep -x "mongod" > /dev/null; then
        print_success "MongoDB started successfully"
    else
        print_error "Failed to start MongoDB"
        exit 1
    fi
fi

echo ""
echo "Setting up Backend..."

# Navigate to backend directory
cd backend

# Check if .env file exists
if [ ! -f .env ]; then
    print_info "Creating .env file..."
    cat > .env << EOF
PORT=3000
MONGODB_URI=mongodb://localhost:27017/notes-app
NODE_ENV=development
EOF
    print_success ".env file created"
else
    print_success ".env file already exists"
fi

# Install backend dependencies
if [ ! -d "node_modules" ]; then
    print_info "Installing backend dependencies..."
    npm install
    print_success "Backend dependencies installed"
else
    print_success "Backend dependencies already installed"
fi

echo ""
echo "=========================================="
echo "  Starting Application"
echo "=========================================="
echo ""

print_success "Backend server starting on http://localhost:3000"
print_info "API Health Check: http://localhost:3000/api/health"
print_info "Press Ctrl+C to stop the server"
echo ""

# Start the backend server
npm start
