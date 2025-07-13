# Maurice Ojwang - Developer Portfolio

A clean, responsive developer portfolio website showcasing backend-focused software engineering skills and projects.

## Features

- **Modern Design**: Clean, minimalist aesthetic with a dark theme
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Smooth Animations**: Subtle animations and transitions for better user experience
- **Interactive Elements**: Hover effects, scroll animations, and mobile navigation
- **Contact Form**: Functional contact form (requires backend integration)
- **SEO Optimized**: Proper meta tags and semantic HTML structure

## Sections

1. **Hero Section**: Introduction with call-to-action buttons
2. **About Me**: Career story and specialization details
3. **Skills**: Technologies and tools organized by category
4. **Projects**: Featured projects with detailed descriptions
5. **Contact**: Contact information and form

## Customization

### Personal Information
Update the following in `index.html`:

- **Name**: Replace "Maurice Ojwang" with your name
- **Tagline**: Update the hero subtitle
- **Description**: Modify the about section content
- **Contact Links**: Update GitHub, LinkedIn, and email links
- **Project Links**: Add your actual GitHub repository URLs

### Styling
The website uses CSS custom properties (variables) for easy theming. Main colors are defined in `styles.css`:

```css
:root {
    --primary-color: #64ffda;
    --secondary-color: #8892b0;
    --background-color: #0a192f;
    --surface-color: #112240;
    --text-primary: #ccd6f6;
    --text-secondary: #8892b0;
}
```

### Projects
To add or modify projects, update the projects section in `index.html`. Each project card includes:

- Project title
- GitHub link
- Description
- Tech stack tags
- Role information

## Setup Instructions

1. **Clone or Download**: Get the files to your local machine
2. **Customize Content**: Update personal information, links, and projects
3. **Test Locally**: Open `index.html` in a web browser
4. **Deploy**: Upload to your preferred hosting service

## Deployment Options

### GitHub Pages
1. Create a new repository
2. Upload the files
3. Go to Settings > Pages
4. Select source branch (usually `main`)

### Netlify
1. Drag and drop the folder to Netlify
2. Or connect your GitHub repository
3. Automatic deployment on push

### Vercel
1. Import your GitHub repository
2. Automatic deployment and preview URLs

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Optimized images and assets
- Minimal JavaScript for better performance
- CSS animations using transform properties
- Lazy loading for better page load times

## Contact Form

The contact form is currently set up for demonstration. To make it functional:

1. **Backend Integration**: Connect to your preferred backend service
2. **Email Service**: Use services like EmailJS, Formspree, or Netlify Forms
3. **Validation**: Add server-side validation for security

## License

This project is open source and available under the [MIT License](LICENSE).

## Credits

- Fonts: [Inter](https://fonts.google.com/specimen/Inter) from Google Fonts
- Icons: [Font Awesome](https://fontawesome.com/)
- Design inspiration from modern developer portfolios

---

Built with ❤️ and lots of ☕ 