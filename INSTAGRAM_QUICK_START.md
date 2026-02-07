# Instagram Integration - Quick Start (5 Minutes)

**TL;DR:** Get your Instagram feed working in 5 minutes with this simplified guide.

---

## ⚡ Super Quick Setup

### Step 1: Create Facebook App (2 minutes)

1. Go to https://developers.facebook.com/apps/create
2. Choose **"Consumer"** → Click **"Next"**
3. Enter app name: `DebugYourFinance`
4. Click **"Create App"**

### Step 2: Add Instagram (1 minute)

1. In app dashboard, find **"Instagram Basic Display"**
2. Click **"Set Up"**
3. Scroll to bottom → Click **"Create New App"**
4. Fill these 3 fields (all the same):
   ```
   Valid OAuth Redirect URIs: https://localhost/
   Deauthorize Callback URL: https://localhost/
   Data Deletion Request URL: https://localhost/
   ```
5. Click **"Save Changes"**

### Step 3: Add Your Instagram as Tester (1 minute)

1. Scroll to **"User Token Generator"**
2. Click **"Add or Remove Instagram Testers"**
3. Type your Instagram username → Click **"Submit"**
4. Open Instagram app or web
5. Go to: **Settings** → **Apps and Websites** → **Tester Invites**
6. Click **"Accept"**

### Step 4: Get Token (30 seconds)

1. Go back to Facebook App Dashboard
2. Under **"User Token Generator"**, click **"Generate Token"** next to your username
3. Click **"Allow"** when Instagram asks for permission
4. **COPY THE TOKEN** (starts with `IGQVJ...`)

### Step 5: Make It Last 60 Days (30 seconds)

Use our helper script:

```bash
# Exchange for long-lived token
node scripts/get-instagram-token.js exchange YOUR_APP_SECRET YOUR_SHORT_TOKEN
```

**Where to find App Secret:**
- Facebook App Dashboard → **Settings** → **Basic** → Show App Secret

**Copy the output token!**

### Step 6: Add to Your Project (30 seconds)

```bash
# Create .env file
cp .env.example .env

# Edit .env and paste your token
# Replace YOUR_TOKEN with the token from Step 5
echo "INSTAGRAM_ACCESS_TOKEN=IGQVJYour_Long_Lived_Token_Here" > .env
```

### Step 7: Test It! (10 seconds)

```bash
npm run dev
```

Visit http://localhost:5173 and scroll to Instagram section. Your videos should appear! 🎉

---

## 🔄 Token Refresh (Every 60 Days)

Set a calendar reminder for 50 days from now:

```bash
# Refresh your token
node scripts/get-instagram-token.js refresh YOUR_CURRENT_TOKEN

# Copy new token to .env
# Update in Vercel/Netlify environment variables
```

---

## 🚀 Deploy to Production

### Vercel

```bash
# Deploy
vercel

# Add environment variable in dashboard:
# vercel.com → Your Project → Settings → Environment Variables
# Key: INSTAGRAM_ACCESS_TOKEN
# Value: Your long-lived token
```

### Netlify

```bash
# Deploy
netlify deploy --prod

# Add environment variable in dashboard:
# app.netlify.com → Site Settings → Environment Variables
# Add: INSTAGRAM_ACCESS_TOKEN = Your token
```

---

## 🐛 Troubleshooting

**Videos not showing?**
- Check `.env` file exists and has correct token
- Restart dev server: `npm run dev`
- Check if you have videos posted (not just photos)

**Token expired?**
- Generate new token from Step 4-5
- Or refresh existing token: `node scripts/get-instagram-token.js refresh TOKEN`

**Error 190?**
- Token is invalid
- Generate a completely new token from Step 4

---

## ✅ You're Done!

Your Instagram feed will now:
- ✅ Auto-update every hour
- ✅ Show latest 4 videos
- ✅ Link to your Instagram posts
- ✅ Display timestamps

**Next refresh needed:** 60 days from token generation (set a reminder!)

---

**Need detailed docs?** See [INSTAGRAM_SETUP.md](INSTAGRAM_SETUP.md) for the complete guide.
