# Railway Deployment Instructions

## Prerequisites

- Railway project already created and linked to the GitHub repository
- `GEMINI_API_KEY` environment variable configured in Railway

## Steps to Fix the Deployment

### 1. Configure Railway Root Directory

The Railway project needs to point to the correct subdirectory:

1. Go to your Railway project dashboard
2. Navigate to **Settings** → **General**
3. Find the **Root Directory** setting
4. Set it to: `LLM-Prompt-Injection-Lab`
5. Click **Save**

### 2. Verify Environment Variables

Ensure the `GEMINI_API_KEY` is set:

1. In Railway dashboard, go to **Variables** tab
2. Confirm `GEMINI_API_KEY` exists with a valid API key value
3. This will be injected into the Docker build process

### 3. Push the Changes

Commit and push the new Dockerfile and related files:

```bash
cd "Reskilling Adaptativo - PoC/LLM-Prompt-Injection-Lab"
git add Dockerfile nginx.conf .dockerignore
git commit -m "Add Dockerfile for Railway deployment"
git push
```

### 4. Trigger Deployment

Railway will automatically detect the changes and start a new deployment. You can monitor the build logs in the Railway dashboard.

### 5. Verify the Deployment

Once deployed, visit:
- **Production URL**: https://llm-prompt-injection-lab-production.up.railway.app/

The page should now load with the full AI Security Lab interface instead of an empty blue screen.

## Troubleshooting

If the deployment fails:

1. **Check Build Logs**: Look for any npm install or build errors
2. **Verify API Key**: Ensure GEMINI_API_KEY is set in Railway variables
3. **Port Configuration**: Railway should automatically detect port 80 from the Dockerfile EXPOSE directive
4. **Root Directory**: Double-check that "Root Directory" is set to `LLM-Prompt-Injection-Lab`

## Technical Details

- **Build Method**: Docker multi-stage build
- **Web Server**: nginx (Alpine Linux)
- **Port**: 80
- **Build Time**: ~2-3 minutes
