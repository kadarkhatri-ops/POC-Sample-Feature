# Vercel Deployment Setup

This project is configured for deployment to Vercel as a full-stack application with a React frontend and Node.js Express backend.

## Prerequisites

- Vercel account (https://vercel.com)
- Git repository (GitHub, GitLab, or Bitbucket)
- Node.js and npm installed locally

## Project Structure for Vercel

```
POC-Sample-Feature/
├── client/              # React frontend (builds and deploys)
├── server/              # Node.js API (deploy separately)
├── vercel.json          # Vercel configuration
└── .vercelignore        # Files to exclude from deployment
```

## Deployment Strategy

### Option 1: Deploy Client and Server Separately (Recommended)

**Frontend (Client) - Vercel:**
1. Frontend is deployed to Vercel automatically
2. Uses environment variable `REACT_APP_API_URL` to point to your backend

**Backend (Server) - Vercel or Other Hosting:**
1. Deploy Node.js server to Vercel's serverless functions or another platform (Railway, Render, Heroku)
2. Set the `REACT_APP_API_URL` environment variable in the client to your server's URL

### Option 2: Deploy Both Together

If deploying both to the same Vercel instance:
1. Use `vercel.json` configuration (already created)
2. Configure API rewrites to your backend server

## Step 1: Prepare Your Git Repository

```bash
git add .
git commit -m "Vercel setup configuration"
git push origin main
```

## Step 2: Deploy Frontend to Vercel

### Via Vercel Dashboard:

1. Go to https://vercel.com/dashboard
2. Click "New Project"
3. Import your Git repository
4. Set project name: `poc-sample-feature-client`
5. Select "Other" as the framework (or auto-detect React)
6. Root Directory: `./client`
7. Build Command: `npm run build`
8. Output Directory: `build`
9. Environment Variables (Add these):
   - `REACT_APP_API_URL`: Set to your backend API URL
     - Local: `http://localhost:5000`
     - Production: `https://your-server-url.com`

10. Click "Deploy"

### Via Vercel CLI:

```bash
npm install -g vercel
cd client
vercel deploy
```

## Step 3: Deploy Backend to Vercel or Other Platform

### Option A: Deploy to Vercel Serverless Functions

```bash
cd server
vercel deploy
```

### Option B: Deploy to Other Platform (Railway, Render, etc.)

1. Create an account on your chosen platform
2. Connect your Git repository
3. Set environment variables:
   - `DB_HOST`: Your MySQL host
   - `DB_USER`: MySQL username
   - `DB_PASS`: MySQL password
   - `DB_NAME`: Database name
   - `PORT`: 5000 (or your preferred port)
4. Deploy

## Environment Variables

### Client (React) - Vercel Dashboard

Set these under Project Settings → Environment Variables:

```
REACT_APP_API_URL=https://your-api-server.com
```

The variable must start with `REACT_APP_` to be accessible in the browser.

### Server (Node.js) - Your Hosting Platform

Set these under Environment Variables:

```
DB_HOST=your-mysql-host.com
DB_USER=your-mysql-user
DB_PASS=your-mysql-password
DB_NAME=simple_php_app
PORT=5000
NODE_ENV=production
```

## Local Development

### Create `.env.local` Files

Client (already created at `client/.env.local`):
```
REACT_APP_API_URL=http://localhost:5000
```

Server (check `server/.env`):
```
DB_HOST=localhost
DB_USER=root
DB_PASS=root
DB_NAME=simple_php_app
PORT=5000
```

### Run Locally

**Terminal 1: Start Node API Server**
```powershell
cd server
npm install
npm start
```

**Terminal 2: Start React Frontend**
```powershell
cd client
npm install
npm start
```

The app will open at `http://localhost:3000` and communicate with the API at `http://localhost:5000`.

## Troubleshooting

### CORS Errors

If you see CORS errors after deployment:
1. Ensure `CORS` is properly configured in `server.js`
2. Check that the API URL in `REACT_APP_API_URL` is correct
3. Verify the backend server is running and accessible

### Database Connection Issues

1. Verify MySQL credentials in environment variables
2. Check if your database host is accessible from Vercel (whitelist Vercel IPs if needed)
3. Test the connection locally first

### Build Failures

1. Check build logs in Vercel dashboard
2. Verify `package.json` scripts are correct
3. Ensure all dependencies are listed in `package.json`

## Next Steps

1. Push code to Git repository
2. Deploy frontend to Vercel
3. Deploy backend to your chosen platform
4. Set environment variables
5. Test the connection between frontend and backend
6. Monitor logs in Vercel dashboard

## Useful Links

- Vercel Docs: https://vercel.com/docs
- Express Deployment: https://expressjs.com/en/advanced/best-practice-security.html
- Environment Variables: https://vercel.com/docs/concepts/projects/environment-variables
- Custom Domains: https://vercel.com/docs/concepts/projects/domains
