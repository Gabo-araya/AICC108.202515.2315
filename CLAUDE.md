# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Flask web application for an Ethical Hacking course (AICC108.202515.2315.EL.ON) featuring a futuristic cybersecurity-themed design. The application demonstrates website cloning techniques using HTTrack and wget, along with deployment strategies to Vercel, all presented as educational content for defensive cybersecurity purposes.

## Architecture

### Flask Application Structure
- **Single-page application**: Main content rendered through `templates/index.html` with modular template includes
- **Static content delivery**: CSS/JS served from `static/` with Flask's `url_for()` routing
- **API endpoint**: `/api/course-info` returns JSON metadata about the course structure
- **Sectioned routing**: Individual routes (`/httrack`, `/wget`, etc.) render the same template with different context

### Template System
- **Jinja2 templates**: Main template with included modals (`templates/modals.html`)
- **Dynamic modal generation**: Uses Jinja2 loops to generate 27 modals (9 each for HTTrack, wget, Vercel sections)
- **Responsive design**: Bootstrap 5 grid with custom cyber-themed CSS variables

### Visual Design System
The application uses a comprehensive cyber/futuristic theme:
- **CSS Custom Properties**: Defined in `:root` for consistent color scheme (cyber-blue, neon-green, matrix-green, etc.)
- **Font stack**: Primary: 'Rajdhani', Secondary: 'Orbitron' for cyber aesthetic
- **Animation system**: Tech grid background, glowing effects, particle systems
- **Glass morphism**: Cards use `backdrop-filter: blur()` with rgba backgrounds

## Development Commands

### Local Development
```bash
# Install dependencies
pip install -r requirements.txt

# Run development server
python app.py
# App runs on http://localhost:5000

# Alternative with Flask CLI
export FLASK_APP=app.py
export FLASK_ENV=development
flask run
```

### Testing the Application
```bash
# Test API endpoint
curl http://localhost:5000/api/course-info

# Test main route
curl http://localhost:5000/

# Validate HTML template rendering
# Check browser console for JavaScript errors
# Verify all modal interactions work
```

## Deployment

### Vercel Deployment
The application is configured for Vercel deployment via:
- **vercel.json**: Python runtime configuration with Flask WSGI setup
- **Automatic deployment**: Configured for GitHub integration
- **Static file handling**: Vercel serves static files directly

```bash
# Deploy with Vercel CLI
vercel

# Deploy from GitHub
# Push to main branch triggers automatic deployment
```

### Build Process
No build step required - Vercel handles:
1. Python environment setup from `requirements.txt`
2. Flask app detection and WSGI configuration
3. Static file optimization and CDN distribution

## Code Organization Patterns

### Route Handlers
All routes return the same template but can pass different context:
```python
return render_template('index.html', section='httrack')
```

### Static Asset Management
- **CSS**: Single file `static/css/cyber-style.css` with CSS custom properties
- **JavaScript**: `static/js/cyber-effects.js` handles animations and interactions
- **Template references**: Use `url_for('static', filename='...')` for all static assets

### Content Structure
- **Educational sections**: Phishing explanation → HTTrack demo → wget demo → Vercel deployment → Security tips
- **Interactive elements**: 27 modals with step-by-step screenshots (placeholder images)
- **External links**: Points to actual demo sites (metadatos.pythonanywhere.com, xqazprog.pythonanywhere.com)

## Important Notes

### Educational Purpose
This application demonstrates website cloning techniques for **defensive cybersecurity education only**. The content emphasizes:
- Understanding phishing attack vectors
- Learning defensive countermeasures
- Recognizing malicious website indicators

### Content Management
- **Modal content**: Generated programmatically in `templates/modals.html` using Jinja2 loops
- **Placeholder images**: Uses placeholder.com for demo screenshots - replace with actual screenshots
- **External dependencies**: Bootstrap 5, Google Fonts (Orbitron/Rajdhani), Bootstrap Icons

### Performance Considerations
- **Animation performance**: JavaScript effects (matrix rain, particles) are conditionally enabled based on screen size
- **Static assets**: External CDN dependencies for fonts and frameworks
- **Image optimization**: Currently uses placeholder images - optimize real images for production