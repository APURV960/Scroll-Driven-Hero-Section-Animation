# Scroll-Driven Hero Animation 🏎️

A high-performance, responsive scroll-driven hero section inspired by [paraschaturvedi.github.io/car-scroll-animation](https://paraschaturvedi.github.io/car-scroll-animation). Built using **React (Vite)**, **GSAP**, **GSAP ScrollTrigger**, and **Bootstrap 5**.

The website is focused exclusively on the scroll-animation hero experience: featuring a large letter-spaced headline (`W E L C O M E   I T Z F I Z Z`), four floating impact statistics cards, and an orange sports car that glides smoothly across the road track with an expanding speed trail, fully revealing all letters of the headline as it moves to the end of the road.

---

##  Key Features

1. **Synchronized Scroll-Driven Motion**:
   - The sports car travels across the track linked 1:1 to user scroll position via `ScrollTrigger`'s `scrub: 1`.
   - The car travels smoothly all the way to the end of the road (`endX`), ensuring the rear clears the last letter and the entire title `W E L C O M E   I T Z F I Z Z` is 100% uncovered and clearly visible.
   - Neither the font size nor the car size is reduced.
   - An emerald speed trail (`#45db7d`) expands dynamically directly behind the car as it accelerates down the road.
   - Letters in the headline illuminate in real-time as the car passes them.
2. **Smooth Page-Load Intro Sequence**:
   - Coordinated GSAP intro timeline on page mount.
   - The car rolls smoothly into the starting grid (`x: -160` → `x: 0`).
   - Impact metrics cards animate into position using staggered easing (`back.out(1.2)`).
   - "Scroll to Drive" guidance pill gently pulses to invite interaction.
3. **Floating Statistics Cards**:
   - **95%** — Customer Satisfaction (Electric Lime `#def54f`)
   - **80%** — Engagement Growth (Sky Blue `#6ac9ff`)
   - **90%** — Brand Recognition (Obsidian Dark `#20242c`)
   - **99%** — Operational Speed (Safety Orange `#fa7328`)
4. **Beginner-Friendly, Clean Code**:
   - Written in straightforward JavaScript and functional React components.
   - All animations scoped with `gsap.context()` for clean teardown and React 19 / Strict Mode compatibility.
   - No unnecessary pages, mockups, or explanation sections.
5. **Interactive Controls**:
   - Live scroll percentage indicator in the navigation bar (`0%` to `100%`).
   - "Replay" action button that scrolls back to top and replays the intro timeline.

---

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Animation**: [GSAP 3](https://greensock.com/gsap/) + [GSAP ScrollTrigger](https://greensock.com/scrolltrigger/)
- **Grid & Layout**: [Bootstrap 5](https://getbootstrap.com/)
- **Typography & Styling**: Vanilla CSS with Google Fonts (*Outfit*, *Space Grotesk*, *Inter*)

---

##  Getting Started Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

---

##  License
MIT License. Created for educational and demonstration purposes.
