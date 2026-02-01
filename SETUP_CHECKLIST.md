# Setup Checklist for Michaela Tempers Website

Use this checklist to complete the setup of your website before deployment.

## ✅ Completed

- [x] HTML structure for all 4 pages
- [x] CSS styling with folk-inspired design
- [x] Mobile responsive navigation
- [x] JavaScript for Google Sheets integration
- [x] Placeholder images (SVG)
- [x] Project documentation (README.md)

## 📋 To-Do Before Deployment

### 1. Add Custom Fonts (Required)
- [ ] Add `Damona-Regular.woff2` to `fonts/` folder
- [ ] Add `Damona-Regular.woff` to `fonts/` folder  
- [ ] Add `Montserrat-Thin.woff2` to `fonts/` folder
- [ ] Add `Montserrat-Thin.woff` to `fonts/` folder

**Note**: If you don't have these specific fonts, you can use alternatives or the design will fall back to system fonts.

### 2. Replace Placeholder Images (Recommended)
- [ ] Replace `images/placeholder-profile.svg` with actual profile photo
- [ ] Replace `images/placeholder-album.svg` with Good Woman EP artwork
- [ ] Replace `images/placeholder-press.svg` with press photos (create 3 versions if needed)

**Recommended sizes**:
- Profile: 800x800px
- Album: 800x800px
- Press: 1200x800px or larger

### 3. Update Links in index.html
- [ ] Add Spotify link (search for "YOUR_SPOTIFY_URL")
- [ ] Add Apple Music link (search for "YOUR_APPLE_MUSIC_URL")
- [ ] Add Bandcamp link (search for "YOUR_BANDCAMP_URL")
- [ ] Update press coverage links (Radio NZ, NZ Musician, Muzic.NZ)
- [ ] Update EP "Listen Now" button link
- [ ] Update contact email address in footer

### 4. Update Links in press-kit.html
- [ ] Update contact email addresses (booking, press, general)
- [ ] Add press photo download links if you want them downloadable

### 5. Update Links in merch.html
- [ ] Add vinyl shop link
- [ ] Add t-shirt shop link
- [ ] Add tote bag shop link
- [ ] Add Bandcamp digital EP link

### 6. Setup Google Sheets for Shows (Optional)
- [ ] Create Google Sheet with columns: Date, Venue, City, TicketLink, Status
- [ ] Publish sheet to web as CSV
- [ ] Copy Sheet ID from published URL
- [ ] Update Sheet ID in `shows.html` (line ~80, replace 'YOUR_SHEET_ID')

**If you skip this**: The shows page will display an empty state saying "No upcoming shows at the moment."

### 7. Deploy to GitHub Pages
- [ ] Create GitHub repository
- [ ] Push all files to repository
- [ ] Enable GitHub Pages in repository settings
- [ ] Test live site

### 8. Optional Enhancements
- [ ] Add custom domain
- [ ] Add social media links to footer
- [ ] Add embedded music videos to press-kit.html
- [ ] Create favicon
- [ ] Add Google Analytics (if desired)
- [ ] Add Open Graph meta tags for social sharing

## 🚀 Quick Start Commands

### Test Locally
```bash
cd /Users/andrewtempany/Code/MichaelaTempers
python3 -m http.server 8000
# Open http://localhost:8000 in your browser
```

### Deploy to GitHub
```bash
git init
git add .
git commit -m "Initial commit: Michaela Tempers website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

## 📚 Documentation

For detailed instructions, see `README.md`.

## 🎨 Design Notes

- **Color Palette**: Warm terracotta (#C75B4F), Deep teal (#2D5A5A), Soft gold (#D4A574)
- **Typography**: Custom fonts with system fallbacks
- **Layout**: Max-width 900px, generous whitespace
- **Mobile**: Hamburger menu, touch-friendly buttons (min 44px)

---

**Questions?** Check the README.md or contact your web developer.
