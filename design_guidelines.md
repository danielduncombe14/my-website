# Personal Multi-Page Website Design Guidelines

## Design Approach

**Selected Approach**: Modern Content-First Design System
Drawing inspiration from Linear's typography clarity, Medium's reading experience, and Notion's organizational structure. Focus on readability, professional presentation, and seamless content discovery.

**Core Design Principles**:
- Content hierarchy through typography and spacing
- Professional credibility through clean layouts
- Easy navigation between different content types
- Visual breathing room that enhances focus

---

## Typography System

**Font Families** (via Google Fonts):
- Headings: Inter (weights: 600, 700, 800)
- Body: Inter (weights: 400, 500)
- Code/Credentials: JetBrains Mono (weight: 400)

**Type Scale**:
- Hero Headline: text-5xl to text-7xl (font-bold)
- Page Titles: text-4xl to text-5xl (font-bold)
- Section Headings: text-2xl to text-3xl (font-semibold)
- Card Titles: text-xl (font-semibold)
- Body Text: text-base to text-lg
- Captions/Meta: text-sm

---

## Layout System

**Spacing Primitives**: Use Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24
- Component padding: p-6 to p-8
- Section spacing: py-16 to py-24
- Card gaps: gap-6 to gap-8
- Content margins: mb-4, mb-6, mb-8

**Container Strategy**:
- Max-width: max-w-6xl for general content
- Blog posts: max-w-3xl for optimal reading
- Full-width: Gallery and image sections

---

## Page-Specific Layouts

### Landing Page
**Hero Section** (80vh):
- Large hero image showcasing personality/workspace
- Centered headline with name and tagline
- Two-button CTA: "View My Work" + "Read Blog"
- Navigation in top-right: horizontal menu with all 5 pages

**Featured Content Grid** (below hero):
- 3-column grid: Latest Personal Blog | Latest Business Post | Featured Gallery Image
- Each card: image preview, title, excerpt, "Read More" link

**Brief Introduction Section**:
- Single column, centered, max-w-3xl
- 2-3 paragraphs about yourself
- Links to About page and Credentials

### About Me Page
**Hero**: Full-width image banner (50vh) with name overlay

**Content Layout**:
- Two-column grid (lg:grid-cols-3):
  - Left (2 cols): Biography with rich text formatting, multiple paragraphs
  - Right (1 col): Profile photo, quick facts, contact links, social media

**Skills/Interests Section**:
- Tag-style grid displaying expertise areas
- 3-4 column responsive grid

### Personal & Business Blog Pages
**Structure** (identical layout, different content):

**Header**: Page title + category filter/tags

**Posts Grid**:
- Two-column layout (md:grid-cols-2)
- Each card: featured image (16:9), title, excerpt, date, read time, author info
- Cards: border, rounded-lg, hover:shadow-lg transition

**Individual Post View** (when clicking):
- Hero image (full-width, 40vh)
- Article container: max-w-3xl, centered
- Typography: generous line-height (leading-relaxed), large text-lg body
- Meta info: date, read time, category tags
- Table of contents (sticky sidebar on lg screens)

### Credentials Page
**Layout**:
- Timeline-style presentation for education/experience
- Grid layout for certifications (3-column: md:grid-cols-3)

**Sections**:
1. Education: vertical timeline with institution logos, degrees, dates
2. Certifications: card grid with certificate images/badges, titles, issuing organizations
3. Skills Matrix: categorized skill bars or tag clouds
4. Awards/Recognition: list with icons

### Gallery Page
**Masonry Grid Layout**:
- Responsive columns: grid-cols-2 md:grid-cols-3 lg:grid-cols-4
- Variable height images (Pinterest-style)
- Image overlay on hover: title/description
- Lightbox modal for full-size viewing
- Category filters at top

---

## Core Components

**Navigation**:
- Top-right horizontal menu on all pages
- Links: About | Personal Blog | Business Blog | Credentials | Gallery
- Sticky header with blur backdrop
- Mobile: hamburger menu

**Cards**:
- Rounded corners: rounded-lg
- Subtle borders
- Padding: p-6
- Hover states: transform scale-105 transition

**Buttons**:
- Primary: Large, rounded-lg, px-8 py-3
- Secondary: Outlined version
- Glass-morphism treatment for buttons over images (backdrop-blur-md)

**Images**:
- All images: rounded corners, object-cover
- Consistent aspect ratios per section (16:9 for blog, 1:1 for gallery thumbnails)

**Form Elements** (for contact/comments):
- Generous padding: px-4 py-3
- Clear focus states with ring
- Labels above inputs

---

## Images

**Landing Page Hero**: Workspace/environmental portrait (1920x1080)
**About Page**: Personal photo portrait + lifestyle images
**Blog Posts**: Featured images for each post (1200x675)
**Credentials**: Institution/organization logos, certificate images
**Gallery**: Personal photography/artwork collection (various sizes)

All hero images include text overlays with backdrop-blur treatment for readability.

---

## Accessibility

- Semantic HTML throughout
- Proper heading hierarchy (h1 → h6)
- Alt text for all images
- Focus indicators: ring-2 ring-offset-2
- ARIA labels for navigation
- Sufficient contrast ratios (handled by color implementation)

---

## Icons

**Library**: Heroicons (via CDN)
- Navigation: Menu, X, Arrow-right
- Social: GitHub, LinkedIn, Twitter, Email
- Blog: Calendar, Clock, Tag, User
- Credentials: Academic-cap, Badge-check, Star