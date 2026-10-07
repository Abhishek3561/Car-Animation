import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Volume2, VolumeX, Play, RotateCcw, Zap } from 'lucide-react';
import { engineAudio } from '../utils/engineAudio';

gsap.registerPlugin(ScrollTrigger);

export default function CarHeroSection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const roadRef = useRef(null);
  const carRef = useRef(null);
  const trailRef = useRef(null);
  const valueTextRef = useRef(null);
  const lettersRef = useRef([]);
  const cardsRef = useRef([]);

  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [isAutoDriving, setIsAutoDriving] = useState(false);

  // Split headline text: W E L C O M E   I T Z F I Z Z
  const headlineText = 'WELCOME ITZFIZZ';
  const letters = headlineText.split('').map((ch, i) => ({
    char: ch === ' ' ? '\u00A0' : ch,
    isSpace: ch === ' ',
    key: `letter-${i}`,
  }));

  // Toggle Audio
  const toggleAudio = () => {
    if (!isAudioEnabled) {
      engineAudio.start();
      setIsAudioEnabled(true);
    } else {
      engineAudio.stop();
      setIsAudioEnabled(false);
    }
  };

  // Reset scroll to top
  const resetScroll = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auto-Drive Cruise Demo
  const triggerAutoDrive = useCallback(() => {
    if (isAutoDriving) return;
    setIsAutoDriving(true);
    const totalScroll = (sectionRef.current?.offsetHeight || window.innerHeight * 2.3) - window.innerHeight;

    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(() => {
      const startTime = performance.now();
      const duration = 4000;

      const step = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 0.5 - Math.cos(progress * Math.PI) / 2;
        window.scrollTo(0, ease * totalScroll);

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          setIsAutoDriving(false);
        }
      };
      requestAnimationFrame(step);
    }, 350);
  }, [isAutoDriving]);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const road = roadRef.current;
    const car = carRef.current;
    const trail = trailRef.current;
    const valueText = valueTextRef.current;
    const letterEls = lettersRef.current.filter(Boolean);
    const cardEls = cardsRef.current.filter(Boolean);

    if (!section || !track || !road || !car || !trail || !valueText || letterEls.length === 0) return;

    // ========================================================
    // PERFORMANCE: Pre-calculate metrics to avoid reflows on scroll
    // ========================================================
    const computeMetrics = () => {
      const roadRect = road.getBoundingClientRect();
      const roadWidth = roadRect.width || window.innerWidth;
      const carRect = car.getBoundingClientRect();
      const carWidth = carRect.width || car.offsetWidth || 350;
      const endX = roadWidth - carWidth;

      // Pre-compute letter coordinates relative to road edge
      const letterOffsets = letterEls.map((letter) => {
        const rect = letter.getBoundingClientRect();
        return (rect.left - roadRect.left) + rect.width * 0.2;
      });

      return {
        endX,
        carWidth,
        roadWidth,
        letterOffsets,
      };
    };

    let metrics = computeMetrics();
    const onResize = () => {
      metrics = computeMetrics();
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', onResize);

    const ctx = gsap.context(() => {
      // ========================================================
      // 1. INITIAL LOAD ANIMATION
      // On load: Clean reveal of header, car into grid, scroll cue.
      // Letters and Metric Cards remain strictly hidden until driving!
      // ========================================================
      const introTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Clean initial states
      gsap.set(letterEls, { opacity: 0 });
      gsap.set(cardEls, { opacity: 0, y: 22, scale: 0.92 });
      gsap.set(car, { x: -80, opacity: 0, yPercent: -50 });
      gsap.set(trail, { width: 0 });
      gsap.set('#brand-header', { opacity: 0, y: -15 });
      gsap.set('#scroll-cue', { opacity: 0, y: 10 });

      introTl
        .to('#brand-header', {
          opacity: 1,
          y: 0,
          duration: 0.6,
        })
        // Car smoothly enters starting line
        .to(
          car,
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
          },
          '-=0.3'
        )
        // Scroll cue appears gently
        .to(
          '#scroll-cue',
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
          },
          '-=0.2'
        );

      // ========================================================
      // 2. SCROLL-BASED ANIMATION (Zero Reflows & High Performance)
      // Car moves smoothly with scroll (scrub: 0.6).
      // Letters revealed ONLY as car drives past them.
      // Metric cards reveal sequentially as car progresses.
      // ========================================================
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        pin: track,
        pinSpacing: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;

          // 1. Smooth car motion via transform
          const currentX = progress * metrics.endX;
          gsap.set(car, { x: currentX, yPercent: -50 });

          // 2. Trail expands behind the car front (strictly 0 when parked)
          const isStarted = progress > 0.003;
          const carFrontX = currentX + metrics.carWidth * 0.74;
          const trailWidth = isStarted ? Math.max(0, carFrontX) : 0;
          gsap.set(trail, { width: trailWidth });

          // 3. Letters reveal dynamically as car drives over them (Not written before!)
          const offsets = metrics.letterOffsets;
          for (let i = 0; i < letterEls.length; i++) {
            const letter = letterEls[i];
            const targetX = offsets[i] || 0;

            if (isStarted && carFrontX >= targetX) {
              letter.classList.add('revealed');
              letter.classList.remove('unrevealed');
            } else {
              letter.classList.remove('revealed');
              letter.classList.add('unrevealed');
            }
          }

          // 4. Metric cards appear sequentially as car drives down the track
          // Box 1 (58% Lime): Top Left (enters ~0.10 - 0.24)
          // Box 2 (23% Blue): Bottom Left (enters ~0.30 - 0.44)
          // Box 3 (27% Dark): Top Right (enters ~0.52 - 0.66)
          // Box 4 (40% Orange): Bottom Right (enters ~0.72 - 0.86)
          const cardRanges = [
            { start: 0.10, end: 0.24 }, // Box 1: 58%
            { start: 0.30, end: 0.44 }, // Box 2: 23%
            { start: 0.52, end: 0.66 }, // Box 3: 27%
            { start: 0.72, end: 0.86 }, // Box 4: 40%
          ];

          cardEls.forEach((card, idx) => {
            if (!card) return;
            const range = cardRanges[idx];
            if (!range) return;

            const rawProgress = (progress - range.start) / (range.end - range.start);
            const cardProgress = Math.max(0, Math.min(1, rawProgress));
            const eased = 1 - Math.pow(1 - cardProgress, 2);

            card.style.opacity = eased.toString();
            const translateY = (1 - eased) * 22;
            const scale = 0.92 + eased * 0.08;
            card.style.transform = `translateY(${translateY}px) scale(${scale})`;
            card.style.pointerEvents = cardProgress > 0.5 ? 'auto' : 'none';
          });

          // 5. Scroll cue indicator fades out upon scrolling
          const scrollCue = document.getElementById('scroll-cue');
          if (scrollCue) {
            const cueOpacity = Math.max(0, 1 - progress * 8);
            scrollCue.style.opacity = cueOpacity.toString();
          }

          // 6. Engine audio velocity sync
          if (isAudioEnabled) {
            engineAudio.updateVelocity(progress * 260);
          }
        },
      });
    }, sectionRef);

    return () => {
      window.removeEventListener('resize', onResize);
      ctx.revert();
    };
  }, [isAudioEnabled]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full studio-canvas"
      style={{
        height: '230vh',
      }}
    >
      {/* 100vh Sticky Viewport Track */}
      <div
        ref={trackRef}
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden select-none studio-canvas"
      >
        {/* Top Header: Brand Logo and Controls */}
        <header
          id="brand-header"
          className="absolute top-0 left-0 w-full p-6 z-30 flex items-center justify-between pointer-events-none"
        >
          {/* Logo and Name ITZFIZZ */}
          <div className="flex items-center gap-3 pointer-events-auto bg-white/75 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/70 shadow-sm">
            <div className="w-8 h-8 rounded-xl bg-neutral-950 text-white flex items-center justify-center font-black shadow-sm">
              <Zap className="w-4 h-4 text-[#def54f]" />
            </div>
            <span className="font-extrabold tracking-tight text-neutral-950 text-lg leading-none font-sans">
              ITZFIZZ
            </span>
          </div>

          {/* Sound & Auto-Cruise Controls */}
          <div className="flex items-center gap-2 pointer-events-auto bg-white/75 backdrop-blur-md p-1.5 rounded-2xl border border-white/70 shadow-sm">
            <button
              onClick={toggleAudio}
              title={isAudioEnabled ? 'Mute Sound' : 'Enable Engine Sound FX'}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                isAudioEnabled
                  ? 'bg-emerald-500 text-white shadow-emerald-500/25 ring-2 ring-emerald-400'
                  : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200/60'
              }`}
            >
              {isAudioEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 text-neutral-400" />}
              <span className="hidden sm:inline">{isAudioEnabled ? 'AUDIO ON' : 'SOUND'}</span>
            </button>
            <button
              onClick={triggerAutoDrive}
              disabled={isAutoDriving}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                isAutoDriving
                  ? 'bg-amber-500 text-white animate-pulse'
                  : 'bg-neutral-900 text-white hover:bg-neutral-800'
              }`}
              title="Auto cruise demo"
            >
              <Play className="w-3 h-3 fill-current" />
              <span className="hidden sm:inline">CRUISE</span>
            </button>
            <button
              onClick={resetScroll}
              title="Reset to Top"
              className="p-1.5 rounded-xl bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200/60 shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>

        {/* ================= ROAD TRACK ================= */}
        <div
          ref={roadRef}
          id="road"
          className="relative w-full overflow-hidden"
          style={{
            height: '200px',
            backgroundColor: '#151619',
            borderTop: '2px solid rgba(255, 255, 255, 0.09)',
            borderBottom: '2px solid rgba(255, 255, 255, 0.09)',
            boxShadow: '0 25px 60px -12px rgba(15, 23, 42, 0.35), inset 0 2px 4px rgba(255, 255, 255, 0.04), inset 0 -2px 6px rgba(0, 0, 0, 0.7)',
          }}
        >
          {/* ================= SPEED GREEN TRAIL ================= */}
          <div
            ref={trailRef}
            id="trail"
            className="absolute top-0 left-0 h-full pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, #30ce6f 0%, #3de07e 100%)',
              width: 0,
              zIndex: 1,
              boxShadow: 'inset 0 0 16px rgba(255, 255, 255, 0.2)',
            }}
          />

          {/* ================= HEADLINE: W E L C O M E   I T Z F I Z Z ================= */}
          <div
            ref={valueTextRef}
            id="valueText"
            className="absolute inset-0 flex items-center justify-start pointer-events-none select-none whitespace-nowrap"
            style={{
              zIndex: 5,
              paddingLeft: 'clamp(180px, 18vw, 290px)',
              fontSize: 'clamp(2.5rem, 5.5vw, 6.2rem)',
              fontWeight: '900',
              lineHeight: 1,
            }}
          >
            {letters.map((item, idx) => (
              <span
                key={item.key}
                ref={(el) => (lettersRef.current[idx] = el)}
                className="value-letter unrevealed"
                style={{
                  marginRight: item.isSpace ? 'clamp(0.8rem, 2vw, 2.5rem)' : 'clamp(0.04rem, 0.2vw, 0.25rem)',
                }}
              >
                {item.char}
              </span>
            ))}
          </div>

          {/* ================= SUPERCAR (Vertically Centered in Middle of Road) ================= */}
          <div
            ref={carRef}
            id="car"
            className="absolute top-1/2 left-0 z-10 select-none pointer-events-none flex items-center gpu-accel"
            style={{
              height: '180px',
              width: 'auto',
              transform: 'translateY(-50%)',
            }}
          >
            <img
              src="/mclaren-720s.png"
              alt="McLaren 720S"
              className="h-full w-auto object-contain select-none"
              style={{
                filter: 'drop-shadow(0 15px 22px rgba(0, 0, 0, 0.6))',
              }}
              draggable="false"
            />
          </div>
        </div>

        {/* ================= 4 IMPACT METRICS / STATISTICS CARDS ================= */}

        {/* Card 1: 58% (Neon Lime) - Top Left */}
        <div
          ref={(el) => (cardsRef.current[0] = el)}
          id="box1"
          className="stat-card border border-black/10"
          style={{
            top: 'calc(50% - 215px)',
            right: '32%',
            backgroundColor: '#def54f',
            color: '#0f172a',
          }}
        >
          <span className="text-[44px] sm:text-[52px] font-black leading-none mb-1 tracking-tight font-sans">
            58%
          </span>
          <span className="text-xs sm:text-[13px] font-bold leading-tight max-w-[185px] text-neutral-800">
            Increase in pick up point use
          </span>
        </div>

        {/* Card 3: 27% (Obsidian Charcoal) - Top Right */}
        <div
          ref={(el) => (cardsRef.current[2] = el)}
          id="box3"
          className="stat-card border border-white/10"
          style={{
            top: 'calc(50% - 215px)',
            right: '11%',
            backgroundColor: '#222327',
            color: '#ffffff',
          }}
        >
          <span className="text-[44px] sm:text-[52px] font-black leading-none mb-1 tracking-tight text-white font-sans">
            27%
          </span>
          <span className="text-xs sm:text-[13px] font-bold leading-tight max-w-[185px] text-neutral-200">
            Increase in pick up point use
          </span>
        </div>

        {/* Card 2: 23% (Sky Blue) - Bottom Left */}
        <div
          ref={(el) => (cardsRef.current[1] = el)}
          id="box2"
          className="stat-card border border-black/10"
          style={{
            top: 'calc(50% + 125px)',
            right: '36%',
            backgroundColor: '#6ac9ff',
            color: '#0f172a',
          }}
        >
          <span className="text-[44px] sm:text-[52px] font-black leading-none mb-1 tracking-tight font-sans">
            23%
          </span>
          <span className="text-xs sm:text-[13px] font-bold leading-tight max-w-[185px] text-neutral-800">
            Decreased in customer phone calls
          </span>
        </div>

        {/* Card 4: 40% (Vibrant Orange) - Bottom Right */}
        <div
          ref={(el) => (cardsRef.current[3] = el)}
          id="box4"
          className="stat-card border border-black/10"
          style={{
            top: 'calc(50% + 125px)',
            right: '13%',
            backgroundColor: '#fa7328',
            color: '#0f172a',
          }}
        >
          <span className="text-[44px] sm:text-[52px] font-black leading-none mb-1 tracking-tight font-sans">
            40%
          </span>
          <span className="text-xs sm:text-[13px] font-bold leading-tight max-w-[185px] text-neutral-900">
            Decreased in customer phone calls
          </span>
        </div>

        {/* Minimal Scroll Cue */}
        <div
          id="scroll-cue"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 pointer-events-none transition-opacity duration-300"
          style={{ opacity: 0 }}
        >
          <span className="text-[11px] font-bold tracking-widest uppercase text-neutral-500">
            Scroll to Drive
          </span>
          <div className="w-5 h-8 rounded-full border-2 border-neutral-400/60 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-neutral-600 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
