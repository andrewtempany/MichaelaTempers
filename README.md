# Michaela Tempers Website

A beautiful, folk-inspired website for New Zealand artist Michaela Tempers. Features a warm color palette, custom fonts, and integration with Google Sheets for dynamic show listings.

## 🎨 Features

- **4 Pages**: Landing/About, Shows, Press Kit, and Merch
- **Folk-Inspired Design**: Warm terracotta and teal color scheme with custom typography
- **Mobile Responsive**: Fully responsive design with hamburger menu for mobile devices
- **Google Sheets Integration**: Automatically fetches and displays upcoming shows
- **Custom Fonts**: Self-hosted Damona (headings) and Montserrat Thin (body text)
- **Performance Optimized**: Font preloading, lazy loading images, efficient CSS
- **Accessibility**: Keyboard navigation, ARIA labels, focus states

## 📁 File Structure

```
michaela-tempers-website/
├── index.html              # Landing page with bio and music links
├── shows.html              # Upcoming shows (Google Sheets integration)
├── press-kit.html          # Festival pitch and press information
├── merch.html              # Merchandise listings
├── css/
│   └── style.css           # Global styles with folk-inspired design
├── js/
│   ├── script.js           # Utilities and Google Sheets API integration
│   └── nav.js              # Shared navigation component
├── fonts/
│   ├── Damona-Regular.woff2       # Header font (add your file)
│   ├── Damona-Regular.woff        # Header font fallback (add your file)
│   ├── Montserrat-Thin.woff2      # Body font (add your file)
│   └── Montserrat-Thin.woff       # Body font fallback (add your file)
├── images/
│   ├── placeholder-profile.svg    # Profile photo placeholder
│   ├── placeholder-album.svg      # Album art placeholder
│   └── placeholder-press.svg      # Press photo placeholder
└── README.md
```

## 🚀 Getting Started

### 1. Add Custom Fonts

The website requires custom font files to be added to the `fonts/` directory:

**Required files:**
- `Damona-Regular.woff2` and `Damona-Regular.woff` (header font)
- `Montserrat-Thin.woff2` and `Montserrat-Thin.woff` (body font)

If you don't have these specific fonts, you can:
1. **Use alternative fonts**: Update the `@font-face` declarations in `css/style.css` with your preferred fonts
2. **Use system fonts**: Comment out the custom fonts and the design will fall back to system fonts

### 2. Replace Placeholder Images

Replace the SVG placeholder images with actual photos:

- `images/placeholder-profile.svg` → Replace with artist profile photo
- `images/placeholder-album.svg` → Replace with Good Woman EP artwork
- `images/placeholder-press.svg` → Replace with high-resolution press photos

**Recommended image specifications:**
- Profile photo: 800x800px (square)
- Album art: 800x800px (square)
- Press photos: 1200x800px (landscape) or larger

### 3. Update Content & Links

#### Update Streaming Links (index.html)

Find the streaming buttons section and replace `#` with actual URLs:

```html
<a href="YOUR_SPOTIFY_URL" class="streaming-button spotify" ...>
<a href="YOUR_APPLE_MUSIC_URL" class="streaming-button apple-music" ...>
<a href="YOUR_BANDCAMP_URL" class="streaming-button bandcamp" ...>
```

#### Update Press Links (index.html)

Replace placeholder links with actual press coverage URLs:

```html
<a href="YOUR_RNZ_ARTICLE_URL" class="press-link" ...>Radio New Zealand</a>
<a href="YOUR_NZ_MUSICIAN_URL" class="press-link" ...>NZ Musician</a>
<a href="YOUR_MUZIC_URL" class="press-link" ...>Muzic.NZ</a>
```

#### Update Merch Links (merch.html)

Add links to your merch store or Bandcamp:

```html
<a href="YOUR_VINYL_STORE_URL" class="button" ...>Shop Now</a>
```

#### Update Contact Email (all pages)

Replace `contact@michaelatempers.com` with your actual email address in:
- Footer of all pages
- Contact section on press-kit.html

## 📊 Google Sheets Integration

The Shows page automatically fetches upcoming show data from a Google Sheet.

### Step 1: Create Your Google Sheet

Create a Google Sheet with the following columns (exact spelling matters):

| Date       | Venue            | City       | TicketLink          | Status  |
|------------|------------------|------------|---------------------|---------|
| 2026-03-15 | Vogelmorn Bowl   | Wellington | https://tickets.com | On Sale |
| 2026-04-20 | The Others Way   | Auckland   |                     | TBA     |
| 2026-05-10 | The Stomach      | Dunedin    | https://sold.com    | Sold Out|

**Column Descriptions:**
- **Date**: ISO format (YYYY-MM-DD)
- **Venue**: Venue name
- **City**: City name
- **TicketLink**: URL to ticket sales (leave blank for TBA)
- **Status**: "On Sale", "TBA", or "Sold Out"

### Step 2: Publish Your Google Sheet

1. Open your Google Sheet
2. Click **File → Share → Publish to web**
3. In the dropdown, select **Comma-separated values (.csv)**
4. Click **Publish**
5. Copy the published URL

### Step 3: Extract the Sheet ID

From the published URL, extract the Sheet ID. It's the long alphanumeric string:

```
https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/export?format=csv
                                        ^^^^^^^^^^^^^^^^^^^
```

### Step 4: Update shows.html

Open `shows.html` and find this line near the bottom:

```javascript
fetchShowsFromGoogleSheets('YOUR_SHEET_ID');
```

Replace `'YOUR_SHEET_ID'` with your actual Sheet ID:

```javascript
fetchShowsFromGoogleSheets('1abc123XYZ456...');
```

### How It Works

- The script fetches the CSV data from your published Google Sheet
- It filters out past shows automatically
- Shows are sorted chronologically
- The page updates whenever you update your Google Sheet (may take a few minutes to propagate)
- **No API key required** when using the published sheet method

## 🌐 Deployment to GitHub Pages

### Option 1: Deploy to username.github.io

1. Create a new repository named `username.github.io` (replace `username` with your GitHub username)
2. Upload all website files to the repository
3. Go to **Settings → Pages**
4. Under "Source", select **Deploy from main branch**
5. Click **Save**
6. Your site will be live at `https://username.github.io`

### Option 2: Deploy to Custom Repository

1. Create a new repository (any name, e.g., `michaela-tempers-website`)
2. Upload all website files
3. Go to **Settings → Pages**
4. Under "Source", select **Deploy from main branch**
5. Your site will be live at `https://username.github.io/repository-name`

### Using Git from Command Line

If this folder is already a Git repository:

```bash
# Check current remote
git remote -v

# Add or update remote
git remote add origin https://github.com/username/repository-name.git
# Or update existing remote:
git remote set-url origin https://github.com/username/repository-name.git

# Push to GitHub
git add .
git commit -m "Initial commit: Michaela Tempers website"
git branch -M main
git push -u origin main
```

If starting fresh:

```bash
git init
git add .
git commit -m "Initial commit: Michaela Tempers website"
git branch -M main
git remote add origin https://github.com/username/repository-name.git
git push -u origin main
```

### Custom Domain (Optional)

1. In your repository, go to **Settings → Pages**
2. Under "Custom domain", enter your domain (e.g., `michaelatempers.com`)
3. Add a CNAME record in your domain registrar pointing to `username.github.io`
4. Wait for DNS propagation (can take up to 48 hours)

## 🎨 Design System

### Color Palette

- **Primary**: `#C75B4F` (Warm terracotta/rust)
- **Secondary**: `#2D5A5A` (Deep teal)
- **Accent**: `#D4A574` (Soft gold)
- **Background**: `#FAF7F2` (Cream)
- **Text**: `#2C2C2C` (Charcoal)

### Typography

- **Headings**: Damona (custom font) with Georgia fallback
- **Body**: Montserrat Thin (custom font) with system sans-serif fallback

### Customization

All design variables are defined at the top of `css/style.css` using CSS custom properties. You can easily customize colors, spacing, and fonts by editing these values:

```css
:root {
  --color-primary: #C75B4F;
  --color-secondary: #2D5A5A;
  --font-heading: 'Damona', 'Georgia', serif;
  /* ... more variables */
}
```

## 🧪 Testing Locally

To test the website locally before deploying:

### Simple Method (Python)

```bash
# Python 3
python3 -m http.server 8000

# Then open http://localhost:8000 in your browser
```

### Using Node.js

```bash
# Install a simple server
npm install -g http-server

# Run the server
http-server

# Then open the URL shown in the terminal
```

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

**Note**: Custom fonts will gracefully fall back to system fonts in older browsers.

## 🔧 Troubleshooting

### Shows Page Not Loading Data

1. Verify your Google Sheet is **published to web** (not just shared)
2. Check that the Sheet ID in `shows.html` is correct
3. Ensure your sheet has the correct column names: `Date`, `Venue`, `City`, `TicketLink`, `Status`
4. Check browser console for any error messages (F12 → Console tab)

### Fonts Not Displaying

1. Ensure font files are in the `fonts/` folder
2. Check that file names match exactly in `css/style.css`
3. Verify font files are not corrupted (try opening in font viewer)
4. Check browser console for 404 errors

### Images Not Showing

1. Verify image files are in the `images/` folder
2. Check file extensions match (`.jpg`, `.svg`, etc.)
3. Ensure file names match exactly in HTML files
4. Check browser console for 404 errors

### Mobile Menu Not Working

1. Ensure both `nav.js` and `script.js` are loaded in the correct order
2. Check browser console for JavaScript errors
3. Test in different browsers

## 📝 License

© 2026 Michaela Tempers. All rights reserved.

## 🤝 Support

For website issues or questions, contact: [contact@michaelatempers.com]

---

**Built with ❤️ for folk music and beautiful web design**
