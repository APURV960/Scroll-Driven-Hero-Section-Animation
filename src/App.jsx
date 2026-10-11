import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

gsap.registerPlugin(ScrollTrigger);



const HEADLINE_TEXT = 'WELCOME ITZFIZZ';
const STATS_DATA = [
  {
    id: 'box1',
    value: '95%',
    label: 'Customer Satisfaction',
    variant: 'stat-card-yellow',
  },
  {
    id: 'box2',
    value: '80%',
    label: 'Engagement Growth',
    variant: 'stat-card-blue',
  },
  {
    id: 'box3',
    value: '90%',
    label: 'Brand Recognition',
    variant: 'stat-card-dark',
  },
  {
    id: 'box4',
    value: '99%',
    label: 'Operational Speed',
    variant: 'stat-card-orange',
  },
];

function App() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const roadRef = useRef(null);
  const carRef = useRef(null);
  const trailRef = useRef(null);
  const headlineRef = useRef(null);
  const cardsRef = useRef([]);
  const progressTextRef = useRef(null);
  const progressBarRef = useRef(null);
  const scrollGuideRef = useRef(null);

  const [replayKey, setReplayKey] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;


    const ctx = gsap.context(() => {
      const roadEl = roadRef.current;
      const carEl = carRef.current;
      const trailEl = trailRef.current;
      const headlineEl = headlineRef.current;
      const statCards = cardsRef.current.filter(Boolean);

      if (!roadEl || !carEl || !trailEl || !headlineEl) return;

      const letterEls = headlineEl.querySelectorAll('.value-letter:not(.space)');

      //Intro sequence
      const introTl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      });

      if (!prefersReducedMotion) {
        introTl
          // Car rolls starting line
          .fromTo(
            carEl,
            { x: -160, opacity: 0 },
            { x: 0, opacity: 1, duration: 1.0, ease: 'power2.out' }
          )
          // Headline letters subtle fade in
          .fromTo(
            headlineEl,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.8 },
            '-=0.7'
          )
          // Scroll guidance indicator gently fades in
          .fromTo(
            scrollGuideRef.current,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.6 },
            '-=0.3'
          );
      } else {
        // Reduced motion fallback: set instant visible states
        gsap.set([carEl, headlineEl, scrollGuideRef.current], {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
        });
      }

     //core function
      const getTravelDistance = () => {
        const roadWidth = roadEl.clientWidth || window.innerWidth;
        const carWidth = carEl.offsetWidth || 380;
        return Math.max(100, roadWidth - carWidth * 0.5);
      };

      // Main scroll-driven tween
      gsap.to(carEl, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: prefersReducedMotion ? false : 1.2, 
          pin: trackRef.current, 
          pinSpacing: false,
          invalidateOnRefresh: true, 
          onUpdate: (self) => {
            const roadWidth = roadEl.clientWidth || window.innerWidth;

            // Trail expands smoothly across the screen width tied to scroll progress
            const trailWidth = Math.min(roadWidth, self.progress * roadWidth);
            gsap.set(trailEl, { width: trailWidth });

            // reveal dynamically as the green trail reaches each letter
            letterEls.forEach((letter) => {
              const letterLeft = headlineEl.offsetLeft + letter.offsetLeft;
              if (trailWidth >= letterLeft) {
                letter.classList.add('revealed');
              } else {
                letter.classList.remove('revealed');
              }
            });

            // Update progress indicators
            const progressPercent = Math.round(self.progress * 100);
            if (progressTextRef.current) {
              progressTextRef.current.textContent = `${progressPercent}%`;
            }
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${progressPercent}%`;
            }

            // Reveal stat cards
            const STAT_THRESHOLDS = [0.22, 0.47, 0.72, 0.97];
            statCards.forEach((card, idx) => {
              if (self.progress >= STAT_THRESHOLDS[idx]) {
                card.classList.add('visible');
              } else {
                card.classList.remove('visible');
              }
            });

            // Fade out scroll guide once user begins scrolling
            if (scrollGuideRef.current) {
              scrollGuideRef.current.style.opacity =
                self.progress > 0.03 ? '0' : '1';
            }
          },
        },
        x: () => getTravelDistance(),
        ease: 'none', // linear easing so speed strictly mirrors scroll progress
      });

      const handleResize = () => {
        ScrollTrigger.refresh();
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, [replayKey]);

  // replay handle func
  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setReplayKey((prev) => prev + 1);
    }, 400);
  };

  return (
    <div className="app-container">
      {/* navbar */}
      <header className="app-navbar d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-3">
          <div className="brand-title">
            Scroll-Driven Hero Section Animation
          </div>
          
        </div>

        <div className="d-flex align-items-center gap-3">
          {/* Live Scroll Progress */}
          <div className="scroll-progress-pill">
            <span>SCROLL</span>
            <div className="progress-bar-mini">
              <div className="progress-fill-mini" ref={progressBarRef}></div>
            </div>
            <span ref={progressTextRef}>0%</span>
          </div>

          <button
            onClick={handleReplay}
            className="btn btn-sm btn-outline-light d-none d-sm-inline-flex align-items-center gap-1 rounded-pill px-3"
            title="Replay Entrance Animation"
          >
            ↺ Replay
          </button>
        </div>
      </header>

      {/* pinned hero section*/}
      <section className="hero-scroll-section" ref={sectionRef}>
        <div className="track-stage" ref={trackRef}>
          <div className="road-container" ref={roadRef}>
            <div className="speed-trail" ref={trailRef}></div>

            <div className="headline-wrapper" ref={headlineRef}>
              {HEADLINE_TEXT.split('').map((char, index) => {
                if (char === ' ') {
                  return (
                    <span
                      key={index}
                      className="value-letter space"
                      aria-hidden="true"
                    >
                      &nbsp;
                    </span>
                  );
                }
                return (
                  <span key={index} className="value-letter">
                    {char}
                  </span>
                );
              })}
            </div>

            <img
              src="/images/hero-car.png"
              alt="McLaren 720S Sports Car"
              className="car-image"
              ref={carRef}
              onLoad={() => ScrollTrigger.refresh()}
            />
          </div>

          {STATS_DATA.map((stat, index) => (
            <div
              key={stat.id}
              id={stat.id}
              className={`stat-card ${stat.variant}`}
              ref={(el) => (cardsRef.current[index] = el)}
            >
              <div className="stat-num">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}

          <div className="scroll-guide" ref={scrollGuideRef}>
            <div className="mouse-indicator">
              <div className="mouse-wheel"></div>
            </div>
            <span>Scroll to Drive</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
