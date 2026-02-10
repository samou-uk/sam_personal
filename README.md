# Sam Chusen Ou - Personal Portfolio

A modern, responsive personal website built with Next.js, React, TypeScript, and Tailwind CSS.

## 🚀 Features

- ✨ Modern, clean design with smooth animations
- 📱 Fully responsive (mobile, tablet, desktop)
- 🎨 Beautiful gradient hero section
- 🃏 Interactive 3D project cards (hover to flip)
- ⚡ Fast performance with Next.js
- 🎯 Easy to maintain and update
- 🌙 Smooth scrolling navigation

## 🛠️ Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Project Structure

```
sam_new_site/
├── app/
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main page
├── components/
│   ├── About.tsx         # About section
│   ├── Education.tsx     # Education section
│   ├── Experience.tsx   # Work experience
│   ├── Footer.tsx        # Footer
│   ├── Hero.tsx          # Hero section
│   ├── Navigation.tsx    # Navigation bar
│   ├── Projects.tsx      # Projects showcase
│   └── Skills.tsx        # Skills section
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## 📝 How to Update Content

### Updating Work Experience

Edit `components/Experience.tsx`:
- Modify the `experiences` array
- Each experience object has: `title`, `company`, `location`, `date`, `points`

### Updating Projects

Edit `components/Projects.tsx`:
- Modify the `projects` array
- Each project has: `name`, `tagline`, `category`, `description`, `skills`, `link` (optional)

### Updating About Section

Edit `components/About.tsx`:
- Update the text content in the component
- Modify the `interests` array for the interest cards

### Updating Skills

Edit `components/Skills.tsx`:
- Modify the `skillCategories` array
- Each category has: `title` and `skills` array

### Updating Education

Edit `components/Education.tsx`:
- Modify the `education` array
- Each entry has: `school`, `location`, `degree`, `details`, `coursework`

### Updating Contact Info

Edit `components/Hero.tsx`:
- Update the `contactItems` array with your contact information

## 🎨 Customization

### Colors

Edit `tailwind.config.js` to change the primary color:
```js
colors: {
  primary: {
    DEFAULT: '#2563eb',  // Change this
    dark: '#1e40af',
    light: '#3b82f6',
  },
}
```

### Fonts

The site uses Inter font from Google Fonts. To change:
1. Update the font import in `app/globals.css`
2. Update `fontFamily` in `tailwind.config.js`

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Deploy with one click!

### Netlify

1. Build the project: `npm run build`
2. Deploy the `.next` folder to Netlify
3. Or connect your GitHub repo for automatic deployments

### Other Platforms

Build the project:
```bash
npm run build
npm start
```

Then deploy the output to any static hosting service.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🔧 Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 💡 Tips

- Keep project descriptions concise (2-3 sentences)
- Use consistent date formatting
- Test on mobile devices after changes
- Keep skill lists to 5-6 items per project for readability

## 📄 License

All rights reserved © 2025 Sam Chusen Ou
