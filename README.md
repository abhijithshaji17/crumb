<div align="center">

  <h1>𝑪𝑹𝑼𝑴𝑩🍞</h1>
  <p><strong>"A crumb of knowledge = lifetime of memory."</strong></p>

  <p>
    An offline knowledge preservation system inspired by Doraemon's Memory Bread.
  </p>

  <p>
    <a href="#-core-concept">Core Concept</a> •
    <a href="#-key-features">Key Features</a> •
    <a href="#-design-system">Design System</a> •
    <a href="#-project-structure">Project Structure</a> •
    <a href="#-getting-started">Getting Started</a>
  </p>

  <br />
</div>

---

## 💡 Core Concept

In a world where internet infrastructure disappears or goes dark during blackouts and emergencies, humanity risks losing access to its collective memory. 

**CRUMB** transforms books, PDFs, field manuals, notes, and research papers into an **offline second brain**. It indexes content locally on your device, allowing you to retrieve critical information, test your memory, and retain vital knowledge without any cloud connectivity.

> *"If the world goes dark tonight, your personal library stays lit."*

---

## ✨ Key Features

### 🍞 Digital Knowledge Slices & 3D Layer Inspector
Every uploaded book, manual, or document is visualized as a physical bread-slice card.

### 📥 Interactive Memory Tray
Users drag or click Knowledge Slices into a glowing **Memory Tray**. When active, the tray scopes local queries to *only* the active sources in the tray, producing fast, context-focused responses.

### ⚡ 100% Offline Search Engine
Performs client-side keyword indexing and natural language document retrieval. Zero API keys, zero network requests, and complete privacy.

### 🧠 Memory Imprint Engine
Turns passive reading into active human memory retention:
* **Key Takeaways**: Bulleted summaries extracted directly from stored documents.
* **3D Flip Flashcards**: Self-testing flashcards with recall scoring (*"Got It"* vs. *"Review Again"*).
* **Interactive Quizzes**: Multiple-choice question generator with instant explanation feedback.
* **Knowledge Mind Map**: HTML5 Canvas graph visualizer displaying neural connections between concepts.

### 🚨 Emergency Knowledge Mode
One-click high-visibility emergency dark mode interface. Automatically loads critical survival guides, including:
* **CPR & First Aid Protocols**
* **Emergency Water Purification** (Boiling, Bleach ratios, SODIS)
* **Debris Hut Shelter & Thermal Insulation**
* **Off-Grid Solar & Battery Setup**

### 📄 PDF & Text Importer
Integrated client-side **PDF.js** parser. Drag and drop `.pdf`, `.txt`, `.md`, or `.json` files to extract text page-by-page directly in your browser without binary stream noise.

---

## 🎨 Design System & Aesthetics

CRUMB combines Apple-inspired minimalism with a warm, tactile bread & parchment aesthetic:

* **Color Palette**: Cream (`#f7f0e1`), Parchment (`#efe4cb`), Golden Amber (`#c9882e`), and Deep Navy (`#0b1829`).
* **Typography**: **Fraunces** (Warm display serif) & **Inter** (Clean technical sans-serif).
* **Visual Effects**: Soft glassmorphism (`backdrop-filter: blur(20px)`), subtle SVG film grain, 3D isometric layer cards, and custom cubic-bezier spring transitions.
* **Animation Engines**: HTML5 Canvas particle engines powering floating document pages, neural network connections, and the infinite golden dough swirl loop.

---

## 📂 Project Structure

```
crumb/
├── index.html           # Landing page with interactive hero canvas & drag-and-drop demo
├── app.html             # 3-column Memory Vault workspace & 3D Slice Layer Inspector
├── css/
│   ├── tokens.css       # Design system tokens, color variables & base reset
│   ├── landing.css      # Landing page styles, hero canvas & marquee
│   └── app.css          # Workspace 3-column grid, Memory Tray, 3D stack & dark mode
├── js/
│   ├── hero-canvas.js   # Particle engine for floating document pages & neural lines
│   ├── landing.js       # Scroll reveal, navbar blur & landing drag-and-drop rack
│   └── app.js           # Vault engine, Memory Tray, 3D Slice Inspector & PDF.js parser
├── LICENSE              # License file
└── README.md            # Project documentation
```

---

## 🚀 Getting Started

CRUMB has **zero external build steps or Node dependencies**. It runs natively in any modern web browser.

### Option 1: Direct File Launch
Simply double-click `index.html` or `app.html` to open it in your browser.

### Option 2: Local HTTP Server
Run a local static server:

```bash
# Using Python 3
python -m http.server 8080
```

Then visit:
* **Landing Page**: [`http://localhost:8080/index.html`](http://localhost:8080/index.html)
* **Vault Application**: [`http://localhost:8080/app.html`](http://localhost:8080/app.html)
<br>
[Your local hosts]

---
## ✒️ Note from the maker 

The tool is all yours people 💛. Feel free to leave an issue or raise a pr if you found something off. I would love to see you contribute to CRUMB. 

---
## 📜 License

Distributed under the MIT License. See `LICENSE` for details.

---

<p align="center">
𝑀𝑎𝑑𝑒 𝑏𝑦 𝑎 𝐷𝑜𝑟𝑎𝑒𝑚𝑜𝑛 𝑓𝑎𝑛 💙 • [Make-A-Ton 9.0](https://makeaton.in) 
</p>
---



