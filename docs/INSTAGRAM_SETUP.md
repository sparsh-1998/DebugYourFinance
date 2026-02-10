# Instagram Feed Setup Guide

This guide will walk you through setting up the Instagram Basic Display API to fetch your Instagram videos dynamically.

## 📋 Prerequisites

- An Instagram account (preferably a business or creator account)
- A Facebook Developer account
- Your Instagram account must be set to **Public** (not private)

---

## 🚀 Step-by-Step Setup

### Step 1: Create a Facebook App

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click **"My Apps"** → **"Create App"**
3. Select **"Consumer"** as the app type
4. Fill in app details:
   - **App Name**: DebugYourFinance (or your choice)
   - **App Contact Email**: Your email
5. Click **"Create App"**

### Step 2: Add Instagram Basic Display Product

1. In your app dashboard, scroll down to **"Add Products"**
2. Find **"Instagram Basic Display"** and click **"Set Up"**
3. Click **"Create New App"** in the Instagram Basic Display settings
4. Fill in the required fields:
   - **Valid OAuth Redirect URIs**: `https://localhost/`
   - **Deauthorize Callback URL**: `https://localhost/`
   - **Data Deletion Request URL**: `https://localhost/`
5. Click **"Save Changes"**

### Step 3: Add Instagram Tester

1. Scroll down to **"User Token Generator"**
2. Click **"Add or Remove Instagram Testers"**
3. This will open a new tab to Instagram Basic Display
4. Go to **"Roles"** → **"Instagram Testers"**
5. Click **"Add Instagram Testers"**
6. Enter your Instagram username
7. Open Instagram on mobile or web
8. Go to Settings → Apps and Websites → Tester Invites
9. Accept the invitation

### Step 4: Generate Access Token

1. Go back to your Facebook App dashboard
2. Navigate to **Instagram Basic Display** → **"Basic Display"**
3. Under **"User Token Generator"**, find your Instagram account
4. Click **"Generate Token"**
5. Authorize the app when prompted
6. Copy the **Access Token** (Long token - starts with `IGQ...`)

**Important:** This token expires every 60 days. You'll need to refresh it.

### Step 5: Get Long-Lived Access Token

The token from Step 4 expires in 1 hour. Convert it to a long-lived token (60 days):

```bash
curl -X GET "https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret={your-app-secret}&access_token={short-lived-token}"
```

**Where:**
- `{your-app-secret}`: Found in App Dashboard → Settings → Basic
- `{short-lived-token}`: The token from Step 4

**Response:**
```json
{
  "access_token": "IGQVJYour_Long_Lived_Token...",
  "token_type": "bearer",
  "expires_in": 5183999
}
```

Copy the new `access_token` - this is your **long-lived token**.

---

## 🔧 Local Development Setup

### 1. Create `.env` File

Create a `.env` file in your project root:

```bash
# Copy from .env.example
cp .env.example .env
```

### 2. Add Your Access Token

Edit `.env` and add your token:

```env
INSTAGRAM_ACCESS_TOKEN=IGQVJYour_Long_Lived_Token_Here
```

### 3. Add `.env` to `.gitignore`

Make sure `.env` is in your `.gitignore`:

```gitignore
# Environment variables
.env
.env.local
.env.production.local
```

### 4. Test Locally

Start your development server:

```bash
npm run dev
```

Visit `http://localhost:5173` and scroll to the Instagram section. You should see your videos!

---

## 🚀 Production Deployment

### For Vercel

1. Push your code to GitHub (without `.env` file)
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Import your repository
4. Go to **Settings** → **Environment Variables**
5. Add:
   - **Key**: `INSTAGRAM_ACCESS_TOKEN`
   - **Value**: Your long-lived token
   - **Environment**: Production, Preview, Development
6. Click **Save**
7. Redeploy your app

---

## 🔄 Token Refresh (Every 60 Days)

Long-lived tokens expire after 60 days. Refresh them before expiry:

```bash
curl -X GET "https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token={current-long-lived-token}"
```

**Response:**
```json
{
  "access_token": "IGQVJNew_Refreshed_Token...",
  "token_type": "bearer",
  "expires_in": 5183999
}
```

Update your environment variables with the new token.

### Automate Token Refresh (Optional)

Create a cron job or scheduled function to refresh tokens automatically:

```javascript
// api/refresh-token.js
export default async function handler(req, res) {
  const currentToken = process.env.INSTAGRAM_ACCESS_TOKEN;

  const response = await fetch(
    `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${currentToken}`
  );

  const data = await response.json();

  // Update environment variable programmatically or log for manual update
  console.log('New token:', data.access_token);

  return res.status(200).json({ success: true });
}
```

---

## 🐛 Troubleshooting

### Error: "Instagram access token not configured"
- Make sure you've added `INSTAGRAM_ACCESS_TOKEN` to your environment variables
- Restart your development server after adding the token

### Error: "HTTP error! status: 400"
- Your token might be expired (check if it's been 60 days)
- Regenerate a new long-lived token

### Error: "HTTP error! status: 190"
- Your access token is invalid
- Generate a new token following Step 4 and Step 5

### No videos showing
- Make sure you have **videos** posted on your Instagram account
- The API filters for VIDEO and CAROUSEL_ALBUM media types
- Check if your Instagram account is public

### Rate Limiting
- Instagram API has rate limits (200 requests/hour per user)
- The serverless function caches responses for 1 hour to minimize API calls

---

## 📚 API Documentation

- [Instagram Basic Display API](https://developers.facebook.com/docs/instagram-basic-display-api)
- [Access Tokens](https://developers.facebook.com/docs/instagram-basic-display-api/overview#instagram-user-access-tokens)
- [User Media Endpoint](https://developers.facebook.com/docs/instagram-basic-display-api/reference/user/media)

---

## 🔒 Security Best Practices

1. **Never commit `.env` file** to version control
2. **Rotate tokens regularly** (every 60 days minimum)
3. **Use environment variables** for sensitive data
4. **Monitor API usage** in Facebook App Dashboard
5. **Set up token expiry alerts** to avoid downtime

---

## ✅ Checklist

- [ ] Created Facebook Developer account
- [ ] Created Facebook App
- [ ] Added Instagram Basic Display product
- [ ] Added Instagram tester and accepted invite
- [ ] Generated short-lived token
- [ ] Converted to long-lived token
- [ ] Added token to `.env` file locally
- [ ] Added `.env` to `.gitignore`
- [ ] Tested locally - videos showing
- [ ] Added token to Vercel environment variables
- [ ] Deployed to production
- [ ] Set calendar reminder for token refresh (60 days)

---

**Need Help?**
- [Instagram Basic Display API Docs](https://developers.facebook.com/docs/instagram-basic-display-api/getting-started)
- [Facebook Developers Community](https://developers.facebook.com/community)

---

Made with ❤️ for DebugYourFinance
