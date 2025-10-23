# 🚀 Groq API Setup Guide

## Get Your FREE API Key (2 minutes)

### Step 1: Create Account
1. Go to **https://console.groq.com**
2. Click "Sign Up" (free, no credit card needed)
3. Sign up with Google/GitHub or email

### Step 2: Generate API Key
1. After login, click "API Keys" in sidebar
2. Click "Create API Key"
3. Name it "NeuroLoom" 
4. Copy the key (starts with `gsk_...`)

### Step 3: Add to Project

#### For Local Development:
```bash
# Create .env.local file
echo "GROQ_API_KEY=your_actual_key_here" > .env.local
```

#### For Vercel Deployment:
1. Go to your Vercel project dashboard
2. Click "Settings" → "Environment Variables"
3. Add new variable:
   - **Name**: `GROQ_API_KEY`
   - **Value**: Your API key (starts with `gsk_...`)
4. Click "Save"
5. Redeploy your project

### Step 4: Test It
```bash
npm run dev
# Visit http://localhost:3000
# Click "AI Summary" on any article
# Should see summary in 0.5-1 second! ⚡
```

## Free Tier Limits
- **14,400 requests per day**
- **30 requests per minute**
- **No credit card required**
- **No expiration**

For NeuroLoom, this means:
- ~400 users can generate summaries daily
- Perfect for personal projects and small teams
- Instant, blazing-fast responses

## Troubleshooting

### "AI summaries not configured" error
- Make sure `GROQ_API_KEY` is in your `.env.local` file
- Restart your dev server after adding the key
- For Vercel: Redeploy after adding environment variable

### Rate limit errors
- Free tier: 14,400/day, 30/minute
- If you hit limits, wait 1 minute or upgrade to paid tier
- For high traffic, consider caching summaries in database

## Model Details
- **Model**: Llama 3.1 8B Instant
- **Speed**: 500-800 tokens/second
- **Quality**: Excellent for tech news
- **Context**: 128k tokens
- **Cost**: FREE forever

## Questions?
Visit: https://console.groq.com/docs
