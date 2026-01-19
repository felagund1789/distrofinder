# DistroFinder

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)

## 📚 Overview
DistroFinder is a frontend-only web application built with **React, TypeScript, and Vite** that allows users to explore information about Linux distributions in a clean, fast, and visually consistent way.

The app focuses on **discoverability, clarity, and editorial-style presentation**, making it easy to browse distros, inspect their details, and navigate between related information.

> **Note**: DistroFinder is intentionally frontend-only. All data is loaded from static JSON files and images served as static assets.

---

## ✨ Features

### 🗂️ Distro Grid (Home)

* Displays a grid of Linux distributions
* Each distro is represented by a card with:
  * Logo
  * Name
  * Short description
  * Status indicator
* Client-side search
* Client-side filtering via select controls (Desktop, Category)
* Filters and search are synced with URL query parameters
* Fully static data source (no backend)

### 📄 Distro Detail Page

* Dedicated detail page per distro (`/d/:slug`)
* Editorial-style layout with clear hierarchy:
  * Hero section with logo, name, and status
  * About section with description and screenshot
  * Technical overview with structured metadata
* Clickable Desktop and Category tags that:
  * Navigate back to Home
  * Apply the corresponding filter automatically
* Breadcrumb navigation (`Home / Distro Name`)
* Fully responsive (mobile-first)
* Dark mode support via CSS variables

### 🎨 Design System

* Custom design system based on **CSS variables** (no Tailwind)
* Light and dark themes
* Reusable UI primitives:
  * Tag
  * StatusBadge
  * DefinitionRow
* Consistent spacing, typography, and color tokens

---

## 🧱 Project Structure

```
src/
├── components/
│   ├── distro/           # Distro-specific components
│   │   ├── DistroCard.tsx
│   │   └── DistroGrid.tsx
│   ├── layout/           # Layout-level components (if any)
│   │   ├── DefinitionRow.tsx
│   │   ├── StatusBadge.tsx
│   │   ├── Tag.tsx
│   │   └── ...
│   ├── tags/             # Domain-aware clickable tags
│   │   └── CategoryTag.tsx
│   │   ├── DesktopTag.tsx
│   └── ui/               # Reusable UI primitives
├── context/
│   └── DistroContext.tsx # Global state & data access
├── data/
│   ├── distros.json      # Static distro dataset
│   └── distroServices.ts # Data fetching utilities
├── hooks/
│   └── useDebouncedSearch.ts
├── pages/
│   ├── DistroDetail.tsx  # Detail page
│   └── Home.tsx          # Home page
├── styles/
│   ├── global.css        # Design tokens & global styles
│   └── ...
├── types/
│   └── distro.ts         # TypeScript types for distros
├── utils/
│   └── filters.ts        # Filtering & search utilities
├── App.tsx
└── main.tsx
```

---

## 📦 Data Model

Each Linux distribution is defined in JSON and enforced via TypeScript types. Example:

```json
{
  "slug": "mint",
  "name": "Linux Mint",
  "description": "Linux Mint is an Ubuntu-based distribution...",
  "desktop": "Cinnamon, MATE, Xfce",
  "category": "Beginners, Desktop, Live Medium",
  "status": "Active",
  "logo": "...",
  "screenshot": "..."
}
```

Images (logos, thumbnails, screenshots) are served as static assets.

---

## 🚀 Getting Started

### Prerequisites
* Node.js 18+
* npm or pnpm

### Install dependencies
```bash
npm install
```

### Run the development server
```bash
npm run dev
```

The app will be available at:
```
http://localhost:5173
```

### Build for production
```bash
npm run build
```

---

## 🌗 Theming & Dark Mode

* Dark mode is implemented using CSS variables
* Theme switching is handled at the root level
* No duplicated styles between light/dark modes

---

## 🔍 Routing

* `/` → Distro grid (home)
* `/d/:slug` → Distro detail page

React Router is used for client-side navigation.

---

## ❌ What Is *Not* Included (By Design)

* No backend
* No authentication
* No server-side rendering
* No analytics
* No facet-based tag UI (currently reverted)

The app is intentionally simple, fast, and easy to reason about.

---

## 🔮 Future Improvements

The following features are good candidates for future iterations:

### UI / UX

* Facet-based filtering UI (tags with counts)
* Collapsible filter sidebar on mobile
* Active filter summary bar
* Comparison view for multiple distros
* Keyboard navigation improvements

### Data & Content

* Popularity / rating visualization
* Release history timeline
* External links (official website, docs)
* Screenshots gallery

### Performance

* Virtualized grid for very large datasets
* Image lazy-loading optimizations

### Developer Experience

* Unit tests for selectors and utilities
* Storybook for UI components
* Linting and formatting rules

---

## 🧠 Design Philosophy

DistroFinder aims to:

* Treat Linux distributions as **products**, not raw data
* Favor clarity over density
* Use composition over configuration
* Avoid premature complexity

The goal is to build a catalog that feels **approachable, informative, and calm**.

---

## 📄 License

DistroFinder is licensed under the [MIT License](LICENSE).
Feel free to use, modify, and distribute it as you see fit!
