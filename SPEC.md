# Software Developer Portfolio Website Specification

## Project Overview
- **Project Name**: Developer Portfolio
- **Type**: Static personal portfolio website
- **Core Functionality**: Showcase developer skills, projects, and professional background with a terminal/code-editor inspired aesthetic
- **Target Users**: Recruiters, hiring managers, potential clients, fellow developers

---

## Technology Stack
- HTML5
- CSS3 (Custom + Tailwind CSS via CDN)
- JavaScript (Vanilla)
- Animation Libraries:
  - Typed.js (typing animations)
  - AOS (scroll animations)

---

## Design System

### Color Palette
| Color Name | Hex Code | Usage |
|------------|----------|-------|
| Background Dark | #0a0a0a | Main background |
| Background Secondary | #111111 | Cards, panels |
| Background Tertiary | #1a1a1a | Hover states, borders |
| Border | #2a2a2a | Subtle borders |
| Text Primary | #ffffff | Main text |
| Text Secondary | #a0a0a0 | Muted text |
| Text Tertiary | #666666 | Disabled/hint text |
| Accent | #e0e0e0 | Highlights |
| Terminal Green | #00ff88 | Code accents (subtle) |
| Terminal Blue | #4a9eff | Links, interactive |

### Typography
- **Primary Font**: 'JetBrains Mono' (monospace) - Code/terminal elements
- **Secondary Font**: 'Inter' (sans-serif) - Body text
- **Heading Sizes**: 
  - H1: 4rem (64px)
  - H2: 2.5rem (40px)
  - H3: 1.5rem (24px)
- **Body Size**: 1rem (16px)
- **Small Text**: 0.875rem (14px)

### Layout
- Max content width: 1200px
- Section padding: 100px vertical
- Card padding: 24px
- Grid gap: 32px
- Border radius: 8px (cards), 4px (buttons)

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

---

## UI Components

### 1. Navigation
- Fixed top navbar with blur effect
- Logo/Name on left
- Navigation links on right
- Mobile: Hamburger menu
- States: Normal, Scrolled (more opaque), Mobile-open

### 2. Hero Section
- Terminal window frame with title bar
- Animated typing effect for role titles
- Two CTA buttons: "View Projects" and "Contact Me"
- Subtle background grid pattern

### 3. About Section
- Styled like a code comment block
- Developer bio with highlighted keywords
- Professional summary

### 4. Skills Section
- Organized in tabs/categories: Languages, Frameworks, Tools, Concepts
- Skill items displayed as terminal-style tags
- Hover effects with subtle glow

### 5. Projects Section
- Responsive grid (3 columns desktop, 2 tablet, 1 mobile)
- Card design resembling GitHub repository cards
- Hover: elevation, border glow, scale
- Contains: Title, Description, Tech tags, Links (GitHub, Live Demo)

### 6. GitHub Section
- Profile stats (repositories, contributions)
- Featured repositories with stats
- Link to full GitHub profile

### 7. Achievements Section
- Horizontal scrolling cards or grid
- Achievement icons with titles and dates

### 8. Contact Section
- Contact form (styled as terminal input)
- Social links with icons
- Email displayed prominently

### 9. Footer
- Copyright
- Social links
- "Built with" tech stack badge

---

## Animations

### Page Load
- Staggered fade-in for sections
- Terminal typing effect in hero
- Navbar slides down

### Scroll Animations (AOS)
- Fade-up for sections
- Fade-left/right for alternating elements
- Duration: 800ms
- Easing: ease-out

### Micro-interactions
- Button hover: scale(1.02), background shift
- Card hover: translateY(-4px), shadow increase
- Link hover: underline animation
- Skill tag hover: subtle glow
- Navigation: smooth scroll to sections

### Transitions
- All transitions: 0.3s ease
- Page transitions: smooth scroll behavior

---

## Content Structure

### Hero Section
- Name: "[Your Name]"
- Title: "Full Stack Developer" / "Software Engineer"
- Tagline: "Building digital experiences with code"
- Typing animation cycles through: ["Full Stack Developer", "Backend Engineer", "Open Source Enthusiast"]

### About Section
- Professional bio paragraph
- Specializations list
- Development philosophy

### Skills
**Languages**: JavaScript, TypeScript, Python, Java, HTML, CSS, SQL, Go
**Frameworks**: React, Node.js, Express, Django, Vue.js, Next.js, Tailwind CSS
**Tools**: Git, Docker, AWS, VS Code, Linux, MongoDB, PostgreSQL, Redis
**Concepts**: REST APIs, GraphQL, Microservices, CI/CD, Agile/Scrum, TDD

### Projects (6 projects)
1. Project Name
   - Description
   - Tech: [Stack]
   - Links: GitHub, Live Demo

### Contact
- Email: dev@example.com
- GitHub: github.com/username
- LinkedIn: linkedin.com/in/username

---

## File Structure
```
e:/Portfolio/
├── index.html          # Main HTML file
├── styles.css          # Custom styles
├── script.js           # JavaScript functionality
└── SPEC.md             # This specification
```

---

## Acceptance Criteria

### Visual Checkpoints
- [ ] Dark theme with black/white/gray palette only
- [ ] Terminal/code-editor aesthetic visible
- [ ] All sections properly styled and aligned
- [ ] Responsive on all breakpoints
- [ ] Smooth animations throughout

### Functionality
- [ ] Typing animation works in hero
- [ ] Navigation scrolls smoothly to sections
- [ ] All external links work
- [ ] Form validation (if included)
- [ ] No console errors

### Performance
- [ ] Page loads within 3 seconds
- [ ] Animations run at 60fps
- [ ] No layout shifts

### Code Quality
- [ ] Clean, readable code
- [ ] Proper comments for customization
- [ ] All images have alt text
- [ ] Semantic HTML
