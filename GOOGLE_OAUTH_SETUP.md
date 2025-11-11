i# Google OAuth Setup Guide

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it

## Step 2: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Configure OAuth consent screen:
   - User Type: External
   - App name: Mie Yamin Loyalty
   - User support email: your-email@example.com
   - Developer contact information: your-email@example.com
   - Save and continue through all steps

4. Create OAuth client ID:
   - Application type: Web application
   - Name: Mie Yamin Web Client
   - Authorized JavaScript origins: `http://localhost:3000`
   - Authorized redirect URIs: `http://localhost:5000/api/auth/google/callback`
   - Click "Create"

## Step 3: Get Your Credentials

After creating the OAuth client, you'll get:
- **Client ID**: Copy this value
- **Client Secret**: Copy this value

## Step 4: Update Backend Environment Variables

Update your `backend/.env` file:

```env
GOOGLE_CLIENT_ID=your-actual-client-id-here
GOOGLE_CLIENT_SECRET=your-actual-client-secret-here
```

## Step 5: Test the Setup

1. Start your backend server: `cd backend && npm start`
2. Start your frontend: `cd mie-yamin-untar && npm run dev`
3. Try logging in with Google from the header dropdown

## Production Deployment

When deploying to production:

1. Add your production domain to authorized origins:
   - Authorized JavaScript origins: `https://yourdomain.com`
   - Authorized redirect URIs: `https://your-api-domain.com/api/auth/google/callback`

2. Update environment variables with production URLs:
   ```env
   BACKEND_URL=https://your-api-domain.com
   FRONTEND_URL=https://yourdomain.com
   ```

## Troubleshooting

- **"Access denied" error**: Check that your redirect URI matches exactly
- **"Invalid client" error**: Verify your Client ID and Secret are correct
- **CORS issues**: Ensure your frontend URL is in authorized origins

## Security Notes

- Never commit your `.env` file to version control
- Use different credentials for development and production
- Regularly rotate your OAuth secrets
- Monitor your OAuth usage in Google Cloud Console
