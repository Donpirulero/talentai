# TalentAI Platform - Deployment Guide

## Prerequisites

- Node.js 18+ installed
- Supabase account with project created
- Vercel account (free tier)
- Git repository (GitHub, GitLab, or Bitbucket)

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

### Required Variables

| Variable | Where to Get It | Required |
|----------|----------------|----------|
| `VITE_SUPABASE_URL` | Supabase Dashboard → Project Settings → API | ✅ YES |
| `VITE_SUPABASE_ANON_KEY` | Supabase Dashboard → Project Settings → API | ✅ YES |

### Optional Variables

| Variable | Where to Get It | Purpose |
|----------|----------------|---------|
| `VITE_GOOGLE_API_KEY` | Google Cloud Console | Google services integration |
| `VITE_HUGGINGFACE_TOKEN` | HuggingFace.co → Settings → Access Tokens | AI-powered insights |

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open browser to `http://localhost:5173`

## Build for Production

Test the production build locally:

```bash
npm run build
npm run preview
```

## Deploy to Vercel

### Option 1: Vercel CLI (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Set environment variables:
```bash
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
# Add optional variables as needed
```

5. Deploy to production:
```bash
vercel --prod
```

### Option 2: Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your Git repository
4. Configure:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Add environment variables in the "Environment Variables" section
6. Click "Deploy"

## Post-Deployment Checklist

- [ ] Verify all environment variables are set in Vercel
- [ ] Test authentication flow on production URL
- [ ] Verify database connection works
- [ ] Test creating/viewing employee records
- [ ] Check that AI insights work (if HuggingFace token is set)
- [ ] Verify responsive design on mobile devices
- [ ] Test all navigation routes

## Cost Monitoring

### Supabase Free Tier Limits
- 500 MB database
- 1 GB file storage  
- 2 GB bandwidth/month
- **Pauses after 1 week of inactivity**

### Vercel Free Tier Limits
- 100 GB bandwidth/month
- Unlimited deployments
- Automatic HTTPS

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Verify Node.js version is 18+
- Run `npm run build` locally to reproduce

### Authentication Not Working
- Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are correct
- Check Supabase project is not paused
- Verify RLS policies are enabled

### AI Insights Not Working
- Check `VITE_HUGGINGFACE_TOKEN` is set
- Verify HuggingFace API quota is not exceeded
- Check browser console for errors

## Security Notes

⚠️ **Current RLS Configuration:** The database allows all authenticated users to access all data. This is suitable for:
- Single organization internal use
- Demo/testing environments

🔒 **For Multi-Tenant Production:** You must implement organization-level RLS policies. See `implementation_plan.md` for details.

## Support

For issues or questions, refer to:
- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Vite Documentation](https://vitejs.dev)
