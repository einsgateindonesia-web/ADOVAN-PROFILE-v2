# Adovan · Personal CV & Portfolio Website

A personal portfolio and interactive Curriculum Vitae for **Adovan**, **Maintenance Data Administrator Planner** at **PT Karunia Armada Indonesia · Site IPH Tabang (PT Bayan Resources Tbk / BYAN)**.

Inspired by the visual craft, high-contrast typography, and smooth interaction design of [Minh Pham Design](https://minhpham.design/).

---

## 🌟 Key Features

1. **Top Scroll Progress Bar**: Real-time 0% → 100% reading indicator pinned to the top of the viewport.
2. **Custom Dual Cursor**: High-precision center dot with smooth lerp circle follower; transforms and scales over interactive links, buttons, and cards.
3. **Preloader Screen with Counter**: Minimalist 0% → 100% counter on page load that seamlessly unveils the hero section.
4. **Hero Line-by-Line Reveal**: Staggered `translateY` reveal with negative letter-spacing typography.
5. **3D Cursor-Tracking Tilt**: Profile portrait dynamically tilts in 3D perspective following the user's cursor with an "Open to Work" status indicator.
6. **Scroll Reveal Animations**: Graceful slide-up and fade transitions driven by `IntersectionObserver`.
7. **Infinite Skills Marquee**: Hardware and software capabilities ribbon with auto-looping and pause-on-hover.
8. **Inverting Card Hover**: Cards invert dynamically (clean white/gray to stark pitch black with white text) on hover.
9. **Timeline Hover Slide Effect**: Experience cards shift padding and display an active gradient indicator when hovered.
10. **Testimonials Slider**: 5-second automatic carousel with manual dots and previous/next navigation controls.
11. **Animated Skill Progress Bars**: Metric bars fill dynamically when scrolled into view.
12. **Light / Dark Mode Toggle**: Instant theme switching with auto-detection from system `prefers-color-scheme` and persistent saving in `localStorage`.
13. **Verified CV Modal**: In-browser printable/downloadable resume sheet viewer with one-click PDF printing.
14. **Direct Contact Integration**: 1-click email copy (`einsgateindonesia@gmail.com`) with instant feedback, WhatsApp direct messaging, and interactive contact form.

---

## 📁 Repository Structure

```text
├── index.html        # Main semantic markup and SEO structure
├── style.css         # Complete bespoke styles, animations & theme definitions
├── script.js         # Vanilla JavaScript interactive animations and controls
├── profile.jpg       # High-resolution executive profile portrait
├── .nojekyll         # Disables Jekyll processing for GitHub Pages
└── README.md         # Documentation and deployment guide
```

---

## 🚀 How to Deploy to GitHub Pages

This project is built using pure **Vanilla HTML, CSS, and JavaScript** with zero build tools or external bundle requirements. It is 100% ready for instant drag-and-drop deployment.

### Method 1: GitHub Web Interface (Drag & Drop - 2 Minutes)

1. Create a new repository on [GitHub](https://github.com/new), for example named `adovan-portfolio`.
2. On the newly created repository page, click **"uploading an existing file"**.
3. Drag and drop all the following files from this repository:
   - `index.html`
   - `style.css`
   - `script.js`
   - `profile.jpg`
   - `.nojekyll`
   - `README.md`
4. Commit the changes directly to the `main` branch.
5. Go to your repository **Settings** → **Pages** (under the "Code and automation" sidebar).
6. Under **Build and deployment** > **Branch**:
   - Select `main`
   - Select folder `/(root)`
   - Click **Save**.
7. Wait 30–60 seconds. Your live website URL will appear at:
   `https://<your-username>.github.io/adovan-portfolio/`

---

### Method 2: Git Command Line

```bash
# 1. Initialize git
git init
git add .
git commit -m "feat: complete Adovan personal CV portfolio inspired by Minh Pham"

# 2. Add remote repository
git remote add origin https://github.com/<your-username>/<repo-name>.git
git branch -M main
git push -u origin main
```

Then enable GitHub Pages under repository Settings → Pages.

---

## 🛠️ Tech Stack & Architecture

- **Markup**: Semantic HTML5 (W3C validated, WCAG AA contrast compliant)
- **Styling**: Modern CSS3 (CSS Custom Properties, Flexbox, CSS Grid, 3D Transforms, Backdrop Filter)
- **Scripting**: Pure Vanilla ECMAScript (ES6+, IntersectionObserver, requestAnimationFrame, Clipboard API)
- **Typography**: Inter (Weights 300, 400, 500, 600, 700, 800, 900)

---

## 👤 Profile & Attribution

- **Name**: Adovan
- **Role**: Maintenance Data Administrator Planner
- **Company**: PT Karunia Armada Indonesia · Site IPH Tabang
- **Parent Group**: PT Bayan Resources Tbk (BYAN)
- **Location**: Tenggarong, East Kalimantan, Indonesia
- **Email**: einsgateindonesia@gmail.com
