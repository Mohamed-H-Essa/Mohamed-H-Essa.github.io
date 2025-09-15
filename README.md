# Flutter Developer Portfolio

A complete, production-ready developer portfolio website showcasing Flutter development expertise, built with React, TypeScript, and Framer Motion. Features smooth animations, accessibility compliance, and a comprehensive design system.

## ✨ Features

### Complete Portfolio Sections
- **Hero**: Animated background, dynamic typing, and social links
- **About**: Personal bio with statistics and core expertise
- **Projects**: Filterable grid with modal detail views
- **Timeline**: Interactive experience timeline with scroll animations
- **Technical Skills**: Categorized skill bars with proficiency levels
- **Featured Projects**: Showcase flagship projects with metrics
- **Let's Work Together**: Value proposition with FAQ accordions
- **Contact**: Functional form with validation and spam protection

### Design & User Experience
- Dark-to-light gradient theme with high contrast accessibility
- Responsive design supporting 320px to 4K displays
- Framer Motion animations (parallax, magnetic buttons, staggered reveals)
- Keyboard navigation with visible focus rings
- Privacy-friendly analytics with consent toggle

### Technical Features
- JSON-driven content management system
- TypeScript for type safety
- Modular component architecture
- Performance optimized (lazy loading, image optimization)
- SEO-friendly with proper meta tags
- Form validation with spam protection
- Toast notifications and modal interactions

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone and install dependencies**
   ```bash
   git clone <repository-url>
   cd portfolio
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:5173`

3. **Build for production**
   ```bash
   npm run build
   ```

## 📝 Content Customization

### Editing Portfolio Data

All content is managed through the `src/data/portfolio.json` file. This JSON configuration contains:

#### Personal Information
```json
{
  "personal": {
    "name": "Your Name",
    "role": "Flutter Developer - AWS/DevOps",
    "tagline": "Your value proposition",
    "bio": "Your professional bio...",
    "location": "Your Location",
    "email": "your.email@example.com",
    "phone": "+1 (555) 123-4567",
    "social": {
      "github": "https://github.com/username",
      "linkedin": "https://linkedin.com/in/username",
      "twitter": "https://twitter.com/username"
    },
    "stats": {
      "yearsExperience": 5,
      "projectsCompleted": 42,
      "clientsSatisfied": 25
    }
  }
}
```

#### Projects
```json
{
  "projects": [
    {
      "id": 1,
      "title": "Project Title",
      "description": "Project description...",
      "image": "https://images.pexels.com/...",
      "tags": ["Flutter", "Firebase", "BLoC"],
      "role": "Lead Developer",
      "featured": true,
      "metrics": {
        "users": "50K+",
        "rating": "4.8/5"
      },
      "tech": ["Flutter", "Dart", "Firebase"],
      "links": {
        "demo": "https://demo.url",
        "github": "https://github.com/...",
        "case_study": "https://..."
      },
      "details": "Detailed project description..."
    }
  ]
}
```

#### Skills
```json
{
  "skills": {
    "Frontend": [
      { "name": "Flutter", "level": 95 },
      { "name": "Dart", "level": 95 }
    ],
    "Backend": [
      { "name": "Node.js", "level": 85 }
    ]
  }
}
```

#### Timeline
```json
{
  "timeline": [
    {
      "id": 1,
      "title": "Senior Flutter Developer",
      "company": "Company Name",
      "period": "2022 - Present",
      "type": "work",
      "achievements": [
        "Achievement 1",
        "Achievement 2"
      ]
    }
  ]
}
```

#### FAQs
```json
{
  "faqs": [
    {
      "question": "What's your availability?",
      "answer": "I'm currently accepting new projects..."
    }
  ]
}
```

### Adding New Images

For projects and other sections, use high-quality images from Pexels or your own hosted images. Update the `image` URLs in the JSON configuration.

### Customizing Colors and Themes

Modify the design system in `src/constants/design.ts`:

```typescript
export const COLORS = {
  primary: {
    500: '#0ea5e9', // Your primary color
    600: '#0284c7',
  },
  // ... other colors
}
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── sections/          # Main page sections
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   └── ...
│   ├── ui/               # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   └── ...
│   ├── Layout.tsx        # Main layout wrapper
│   └── Navigation.tsx    # Navigation component
├── constants/
│   └── design.ts         # Design system constants
├── data/
│   └── portfolio.json    # Content configuration
├── hooks/
│   └── useToast.tsx     # Toast notification hook
├── types/
│   └── portfolio.ts      # TypeScript interfaces
├── utils/
│   └── animations.ts     # Animation variants
└── App.tsx              # Main application
```

## 🎨 Design System

The portfolio uses a comprehensive design system with:

- **Colors**: Primary, secondary, accent, and semantic colors
- **Typography**: Inter font with consistent scale and weights
- **Spacing**: 8px base unit system
- **Shadows**: Layered shadow system for depth
- **Breakpoints**: Mobile-first responsive design
- **Z-Index**: Organized layering system

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Key Dependencies

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Framer Motion** - Animations
- **React Hook Form** - Form management
- **Yup** - Form validation
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## 🚀 Deployment

### Build Optimization

The build process includes:
- Tree shaking for smaller bundles
- Image optimization
- CSS minification
- JavaScript splitting

### Deployment Platforms

Compatible with:
- **Bolt Hosting** (recommended)
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

### Environment Variables

For production deployment, ensure you have:
- Contact form endpoint (if using external service)
- Analytics configuration
- Any third-party service keys

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:
- **Mobile**: 320px - 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: 1024px - 1536px
- **Large Desktop**: 1536px+
- **4K**: 2560px+

## ♿ Accessibility

Accessibility features include:
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- High contrast colors
- Screen reader compatibility
- Reduced motion support

## 🔒 Privacy & Security

- No tracking without consent
- Spam protection on contact form
- Secure form validation
- Privacy-friendly analytics
- No unnecessary data collection

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For questions or support:
- Create an issue on GitHub
- Review the documentation
- Check the FAQ section

---

Built with ❤️ for Flutter developers by developers. Showcase your expertise with style and professionalism.