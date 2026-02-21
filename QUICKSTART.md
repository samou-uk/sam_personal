# Quick Start Guide

## First Time Setup

1. **Install Node.js** (if you haven't already)
   - Download from [nodejs.org](https://nodejs.org/)
   - Version 18 or higher recommended

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - You should see your portfolio!

## Making Changes

### Update Your Info

- **Contact info**: Edit `components/Hero.tsx` (line ~8)
- **About section**: Edit `components/About.tsx` (the paragraph text)
- **Work experience**: Edit `components/Experience.tsx` (the `experiences` array)
- **Projects**: Edit `components/Projects.tsx` (the `projects` array)
- **Skills**: Edit `components/Skills.tsx` (the `skillCategories` array)
- **Education**: Edit `components/Education.tsx` (the `education` array)

### Change Colors

Edit `tailwind.config.js` and change the `primary` color values.

## Deploy to Vercel (Easiest)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy"
6. Done! Your site is live 🎉

## Need Help?

Check the main `README.md` for more detailed instructions.












