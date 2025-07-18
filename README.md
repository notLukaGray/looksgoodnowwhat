# Looks Good, Now What

> A comprehensive guide to strategic design thinking for students and educators, presented as an interactive web book with audio narration capabilities.

## About the Book

**Looks Good, Now What** is a design education resource that covers:

- **Creative Theory & Foundations** - Understanding design principles and methodologies
- **Strategic Design Thinking** - Applying design thinking to complex problems
- **Client Relationships & Communication** - Building effective partnerships
- **Career Development** - Navigating the creative industry landscape
- **Practical Approaches** - Real-world solutions to design challenges

## Features

| Feature                 | Description                                                        |
| ----------------------- | ------------------------------------------------------------------ |
| **Interactive Reading** | Clean, responsive reading experience with navigation               |
| **Audio Narration**     | AI-generated audio for each chapter using Azure Cognitive Services |
| **Smart Search**        | Full-text search across all chapters with instant results          |
| **Mobile Optimized**    | Responsive design that works on all devices                        |
| **SEO Optimized**       | Complete meta tags, structured data, and sitemaps                  |
| **Accessible**          | WCAG compliant with proper heading structure and ARIA labels       |

## Tech Stack

### Frontend

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4
- **Content**: Markdown with React Markdown
- **Search**: FlexSearch for client-side search

### Backend & Services

- **Audio**: Azure Cognitive Services Text-to-Speech
- **Deployment**: Vercel Platform
- **Analytics**: Vercel Analytics & Speed Insights

## Getting Started

### Prerequisites

- Node.js 18 or higher
- FFmpeg (for audio processing)
- Azure Speech Service API key

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd book
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Add your Azure Speech Service key:

   ```env
   AZURE_SPEECH_KEY=your_api_key_here
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the book.

## Available Scripts

### Development Commands

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
```

### Code Quality

```bash
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues automatically
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
```

### Testing & Validation

```bash
npm run test         # Run comprehensive test suite (format, lint, build, SEO)
npm run validate:slugs # Validate content slug format and uniqueness
npm run seo:audit    # Run comprehensive SEO audit
npm run audio:generate <chapter> <output>  # Generate audio for a chapter
```

#### Audio Generation Examples

```bash
# Generate audio for chapter three
npm run audio:generate chapterthree chapterthree-audio.mp3

# Generate audio for chapter one
npm run audio:generate chapterone chapterone-audio.mp3

# Generate audio for introduction
npm run audio:generate introduction intro-audio.mp3
```

## Project Structure

```
book/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── [slug]/          # Dynamic chapter pages
│   │   ├── search/          # Search functionality
│   │   ├── table-of-contents/ # Chapter listing
│   │   └── layout.tsx       # Root layout
│   ├── components/          # React components
│   │   ├── NavMenu.tsx      # Navigation component
│   │   ├── ShareButton.tsx  # Social sharing
│   │   └── MarkdownWithAnchors.tsx # Markdown renderer
│   ├── content/            # Markdown chapter files
│   └── lib/                # Utility functions
│       └── config.ts       # Site configuration
├── scripts/                # Build and automation scripts
│   ├── test-site.js        # Comprehensive test suite
│   ├── seo-audit.js        # SEO validation script
│   ├── validate-slugs.js   # Content slug validation
│   └── generate-chapter-audio.js # Audio generation
├── public/                 # Static assets
│   ├── vo/                 # Generated audio files
│   ├── robots.txt          # Search engine directives
│   └── sitemap.xml         # XML sitemap
├── working-files/          # Development notes (gitignored)
└── ...
```

## Testing & Quality Assurance

The project includes a comprehensive test suite to ensure code quality and site functionality:

### Test Suite Components

1. **Code Formatting** - Prettier formatting validation
2. **Code Quality** - ESLint linting checks
3. **Content Validation** - Slug format and uniqueness validation
4. **Build Process** - Next.js production build verification
5. **SEO Audit** - Comprehensive SEO validation with live server testing

### Running Tests

```bash
# Run the complete test suite
npm run test

# Run individual tests
npm run format:check    # Check formatting
npm run lint           # Run linting
npm run validate:slugs # Validate content slugs
npm run build          # Test build process
npm run seo:audit      # Run SEO audit
```

The test suite automatically:

- Starts and stops a development server for SEO testing
- Validates all content files and slugs
- Checks for SEO best practices
- Ensures the site builds successfully
- Provides detailed reporting on any issues

## Content Management

### Adding New Chapters

1. **Create markdown file** in `src/content/`
2. **Follow chapter structure** with proper frontmatter
3. **Add to navigation** in `src/lib/config.ts`
4. **Generate audio** using the audio generation script

### Chapter Structure

````markdown
---
title: 'Chapter Title'
description: 'Chapter description for SEO'
order: 1
---

# Chapter Title

Chapter content here with proper markdown formatting.

## Subsection

Content with **bold**, _italic_, and `code` formatting.

### Code Examples

```javascript
function example() {
  return 'Hello World';
}
```
````

### Lists

- Bullet point one
- Bullet point two
  - Nested bullet point
- Bullet point three

1. Numbered list item
2. Another numbered item
3. Final numbered item

## SEO Features

The book website includes comprehensive SEO optimization:

### Meta Tags

- Complete meta descriptions for all pages
- Proper title tags with chapter information
- Author and publisher meta tags
- Language and encoding specifications

### Structured Data

- **Book Schema**: Complete book information
- **Article Schema**: Individual chapter data
- **Chapter Schema**: Chapter-specific metadata
- **BreadcrumbList**: Navigation structure
- **Organization Schema**: Author information

### Technical SEO

- XML sitemap generation
- Robots.txt configuration
- Canonical URLs
- Open Graph and Twitter Card support
- Mobile-friendly responsive design

## Audio Generation

The book includes AI-generated audio narration for each chapter:

### Technical Specifications

- **Voice**: en-US-AlloyTurboMultilingualNeural
- **Format**: MP3, 24kHz, 48kbps, mono
- **Processing**: Section-by-section for optimal quality
- **Service**: Azure Cognitive Services Text-to-Speech

### Features

- Automatic markdown parsing and cleaning
- HTML tag removal
- Code block exclusion
- Proper text normalization
- Concatenated output files

## Deployment

The site is optimized for deployment on Vercel:

### Setup Process

1. Connect repository to Vercel
2. Configure environment variables
3. Set up automatic deployments
4. Configure custom domain (optional)

### Performance Optimizations

- Static generation for all pages
- Image optimization with Next.js
- Font optimization and preloading
- CSS and JavaScript minification
- CDN distribution

## Contributing

This is a personal book project, but suggestions and feedback are welcome:

- **Issues**: Report bugs or suggest improvements
- **Discussions**: Share ideas and feedback
- **Pull Requests**: Code improvements (if applicable)

## License

All content is © Luka Gray. The codebase is available for educational purposes.

## Author

**Luka Gray** - Design educator and strategic design consultant

- **Website**: [notlukagray.com](https://notlukagray.com)
- **Book**: [looksgoodnowwhat.com](https://looksgoodnowwhat.com)
- **Focus**: Strategic design thinking and design education
