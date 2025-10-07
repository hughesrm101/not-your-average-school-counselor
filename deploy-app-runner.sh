#!/bin/bash

# Deploy Next.js app to AWS App Runner
echo "🚀 Deploying Next.js app to AWS App Runner..."

# Build the application
echo "📦 Building Next.js application..."
npm run build

# Create a simple server.js for App Runner
cat > server.js << 'EOF'
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const hostname = '0.0.0.0'
const port = process.env.PORT || 3000

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  })
    .once('error', (err) => {
      console.error(err)
      process.exit(1)
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`)
    })
})
EOF

# Create package.json for production
cat > package.prod.json << 'EOF'
{
  "name": "nyasc-platform",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "start": "node server.js",
    "build": "next build"
  },
  "dependencies": {
    "next": "^15.5.4",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@aws-sdk/client-dynamodb": "^3.0.0",
    "@aws-sdk/lib-dynamodb": "^3.0.0",
    "@aws-sdk/client-s3": "^3.0.0",
    "@aws-sdk/client-ses": "^3.0.0",
    "@aws-sdk/client-cognito-identity-provider": "^3.0.0",
    "stripe": "^14.0.0",
    "zod": "^3.22.0",
    "jose": "^5.0.0",
    "cookie": "^0.6.0"
  }
}
EOF

echo "✅ Deployment files created!"
echo "📋 Next steps:"
echo "1. Upload these files to AWS App Runner"
echo "2. Set environment variables"
echo "3. Deploy the application"
