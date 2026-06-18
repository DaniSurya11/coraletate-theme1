"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const galleryPhotos = [
  "isai-jane-w1.jpg",
  "isai-jane-w20.jpg",
  "isai-jane-w2.jpg",
  "isai-jane-w3.jpg",
  "isai-jane-w4.jpg",
  "isai-jane-w8.jpg",
  "isai-jane-w9.jpg",
  "isai-jane-w5.jpg",
  "isai-jane-w6.jpg",
  "isai-jane-w7.jpg",
  "isai-jane-w16.jpg",
  "isai-jane-w12.jpg",
  "isai-jane-w14.jpg",
  "isai-jane-w15.jpg",
  "isai-jane-w10.jpg",
  "isai-jane-w17.jpg",
  "isai-jane-w11.jpg",
  "isai-jane-w13.jpg",
];

const loveStoryPhotos = [
  "isai-jane-w4-150x150.jpg",
  "isai-jane-w5-150x150.jpg",
  "isai-jane-w6-150x150.jpg",
  "isai-jane-w8-150x150.jpg",
  "isai-jane-w2-150x150.jpg",
];

const weddingMusicSrc = "/assets/coralestate-musci1.mp3";
const weddingMusicStartTime = 25;
const weddingMusicFadeDuration = 1500;

const coverFlorals = {
  topLeft: { file: "floral-top-left", width: 507, height: 662 },
  topRight: { file: "floral-top-right", width: 328, height: 579 },
  bottomLeft: { file: "floral-bottom-left", width: 526, height: 737 },
  bottomRight: { file: "floral-bottom-right", width: 435, height: 774 },
};

const CoverFloral = ({ className, floral, priority = false }) => (
  <picture className="floral-picture" aria-hidden="true">
    <source srcSet={`/assets/${floral.file}.avif`} type="image/avif" />
    <source srcSet={`/assets/${floral.file}.webp`} type="image/webp" />
    <img
      className={className}
      src={`/assets/${floral.file}.png`}
      alt=""
      width={floral.width}
      height={floral.height}
      decoding="async"
      fetchPriority={priority ? "high" : undefined}
    />
  </picture>
);

const getGalleryPhotoSize = (index) => {
  if (index === 17) {
    return { width: 1800, height: 1352 };
  }

  if (index >= 10) {
    return { width: 1350, height: 1800 };
  }

  return { width: 1200, height: 1800 };
};

const weddingGiftAccounts = [
  { bank: "BANK1", number: "1111111111", name: "Nama Lengkap1" },
  { bank: "BANK2", number: "2222222222", name: "Nama Lengkap2" },
  { bank: "BANK3", number: "3333333333", name: "Nama Lengkap3" },
  { bank: "BANK4", number: "4444444444", name: "Nama Lengkap4" },
];

const initialWishes = [
  {
    id: 1,
    name: "Keluarga & Sahabat",
    message:
      "Selamat menempuh hidup baru. Semoga cinta dan kebahagiaan selalu menyertai perjalanan kalian.",
    date: "Hari ini",
  },
  {
    id: 2,
    name: "Sahabat Mempelai",
    message:
      "Semoga menjadi keluarga yang penuh kasih, saling menguatkan, dan selalu diberkahi.",
    date: "1 hari yang lalu",
  },
  {
    id: 3,
    name: "Teman-teman",
    message:
      "Happy wedding, Aldo dan Tiara. Semoga setiap langkah baru kalian dipenuhi sukacita.",
    date: "2 hari yang lalu",
  },
];

const liquidNavItems = [
  {
    id: "ayatsuci",
    label: "Beranda",
    icon: <path d="M4 10.8 12 4l8 6.8v8.7a.5.5 0 0 1-.5.5H15v-5.5h-6V20H4.5a.5.5 0 0 1-.5-.5v-8.7Z" />,
  },
  {
    id: "profil",
    label: "Profil",
    icon: (
      <>
        <circle cx="12" cy="8" r="3.25" />
        <path d="M5.8 20c.45-4 2.52-6 6.2-6s5.75 2 6.2 6" />
      </>
    ),
  },
  {
    id: "event",
    label: "Acara",
    icon: (
      <>
        <rect x="4" y="6" width="16" height="14" rx="2.5" />
        <path d="M8 3.8V8m8-4.2V8M4 10.5h16m-8 3v4m-2-2h4" />
      </>
    ),
  },
  {
    id: "rsvp",
    label: "RSVP",
    icon: (
      <>
        <path d="M5 4.5h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-8l-4.5 3v-3H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2Z" />
        <path d="m7.5 10.8 2.7 2.7 6.2-6" />
      </>
    ),
  },
  {
    id: "wedding-gift",
    label: "Hadiah",
    icon: (
      <>
        <path d="M4 10h16v10H4V10Zm-1-4h18v4H3V6Zm9 0v14" />
        <path d="M12 6H8.7A2.2 2.2 0 1 1 12 3.1V6Zm0 0h3.3A2.2 2.2 0 1 0 12 3.1V6Z" />
      </>
    ),
  },
];

function LiquidGlassNavbar({ activeItem, onNavigate }) {
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollEndTimerRef = useRef(null);
  const activeIndex = Math.max(
    liquidNavItems.findIndex((item) => item.id === activeItem),
    0,
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      window.clearTimeout(scrollEndTimerRef.current);
      scrollEndTimerRef.current = window.setTimeout(() => {
        setIsScrolling(false);
      }, 140);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.clearTimeout(scrollEndTimerRef.current);
    };
  }, []);

  return (
    <nav
      className={`liquid-nav ${isScrolling ? "is-scrolling" : ""}`}
      aria-label="Navigasi undangan"
    >
      <div className="liquid-nav-glow" aria-hidden="true" />
      <div
        className="liquid-nav-list"
        style={{ "--liquid-nav-active-index": activeIndex }}
      >
        <span className="liquid-nav-active-indicator" aria-hidden="true" />
        {liquidNavItems.map((item) => {
          const isActive = activeItem === item.id;

          return (
            <button
              className={`liquid-nav-item ${isActive ? "is-active" : ""}`}
              type="button"
              key={item.id}
              aria-label={`Menuju ${item.label}`}
              aria-current={isActive ? "location" : undefined}
              onClick={() => onNavigate(item.id)}
            >
              <span className="liquid-nav-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  {item.icon}
                </svg>
              </span>
              <span className="liquid-nav-dot" aria-hidden="true" />
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function GlassMusicButton({ isPlaying, onToggleMusic }) {
  return (
    <button
      className={`glass-music-button ${isPlaying ? "is-playing" : ""}`}
      type="button"
      aria-label={isPlaying ? "Matikan musik" : "Nyalakan musik"}
      aria-pressed={isPlaying}
      onClick={onToggleMusic}
    >
      <span className="glass-music-button-glow" aria-hidden="true" />
      <span className="glass-music-button-icon" aria-hidden="true">
        {isPlaying ? (
          <svg viewBox="0 0 24 24">
            <rect x="7" y="6" width="3.5" height="12" rx="1.2" />
            <rect x="13.5" y="6" width="3.5" height="12" rx="1.2" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24">
            <path d="M9 18.2a2.4 2.4 0 1 1-1.8-2.32V6.4l9.4-1.9v9.8a2.4 2.4 0 1 1-1.8-2.32V8.2L9 9.38v8.82Z" />
          </svg>
        )}
      </span>
    </button>
  );
}

function SaveDateCountdown() {
  const [countdown, setCountdown] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const weddingDate = new Date("2026-10-30T08:00:00+07:00").getTime();

    const updateCountdown = () => {
      const distance = Math.max(0, weddingDate - Date.now());

      setCountdown({
        days: String(Math.floor(distance / 86400000)).padStart(2, "0"),
        hours: String(Math.floor((distance / 3600000) % 24)).padStart(2, "0"),
        minutes: String(Math.floor((distance / 60000) % 60)).padStart(2, "0"),
        seconds: String(Math.floor((distance / 1000) % 60)).padStart(2, "0"),
      });
    };

    updateCountdown();
    const timer = window.setInterval(updateCountdown, 1000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="save-date-countdown section-reveal">
      <h2 id="save-date-title">Menuju hari bahagia</h2>

      <div className="save-date-countdown-grid" aria-label="Hitung mundur pernikahan">
        {[
          ["days", "Hari"],
          ["hours", "Jam"],
          ["minutes", "Menit"],
          ["seconds", "Detik"],
        ].map(([unit, label]) => (
          <div className="save-date-countdown-item" key={unit}>
            <strong>{countdown[unit]}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Invitation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAyatIntroReady, setIsAyatIntroReady] = useState(false);
  const [guestName, setGuestName] = useState("Nama Tamu");
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(null);
  const [isGiftOpen, setIsGiftOpen] = useState(false);
  const [copiedGiftNumber, setCopiedGiftNumber] = useState("");
  const [activeNavItem, setActiveNavItem] = useState("ayatsuci");
  const [wishName, setWishName] = useState("");
  const [wishMessage, setWishMessage] = useState("");
  const [wishes, setWishes] = useState(initialWishes);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const invitationRef = useRef(null);
  const giftDetailsRef = useRef(null);
  const loveStoryCarouselRef = useRef(null);
  const loveStoryTrackRef = useRef(null);
  const musicAudioRef = useRef(null);
  const musicFadeAnimationRef = useRef(null);
  const navScrollAnimationRef = useRef(null);

  useEffect(() => {
    const guest = new URLSearchParams(window.location.search).get("to")?.trim();

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    document.documentElement.classList.remove("invitation-open");
    document.body.classList.remove("invitation-open");
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    if (guest) {
      setGuestName(guest);
      document.title = `The Wedding of Aldo & Tiara - ${guest}`;
    }

    return () => {
      document.documentElement.classList.remove("invitation-open");
      document.body.classList.remove("invitation-open");
    };
  }, []);

  const stopMusicFade = () => {
    if (musicFadeAnimationRef.current) {
      window.cancelAnimationFrame(musicFadeAnimationRef.current);
      musicFadeAnimationRef.current = null;
    }
  };

  const fadeMusicIn = () => {
    const audio = musicAudioRef.current;

    if (!audio) {
      return;
    }

    stopMusicFade();

    const startTime = performance.now();

    const animateFade = (currentTime) => {
      const progress = Math.min(
        (currentTime - startTime) / weddingMusicFadeDuration,
        1,
      );

      audio.volume = progress;

      if (progress < 1 && !audio.paused) {
        musicFadeAnimationRef.current = window.requestAnimationFrame(animateFade);
      } else {
        audio.volume = audio.paused ? audio.volume : 1;
        musicFadeAnimationRef.current = null;
      }
    };

    musicFadeAnimationRef.current = window.requestAnimationFrame(animateFade);
  };

  const playWeddingMusic = async ({ fadeIn = false, restart = false } = {}) => {
    const audio = musicAudioRef.current;

    if (!audio) {
      return false;
    }

    stopMusicFade();

    try {
      if (restart || audio.currentTime < weddingMusicStartTime) {
        audio.currentTime = weddingMusicStartTime;
      }

      audio.volume = fadeIn ? 0 : 1;
      await audio.play();

      if (fadeIn) {
        fadeMusicIn();
      }

      return true;
    } catch {
      stopMusicFade();
      setIsMusicPlaying(false);
      return false;
    }
  };

  const toggleWeddingMusic = async () => {
    const audio = musicAudioRef.current;

    if (!audio) {
      return;
    }

    if (audio.paused) {
      await playWeddingMusic();
      return;
    }

    stopMusicFade();
    audio.pause();
  };

  useEffect(() => {
    const audio = musicAudioRef.current;

    if (!audio) {
      return undefined;
    }

    const handleLoadedMetadata = () => {
      if (audio.currentTime < weddingMusicStartTime) {
        audio.currentTime = weddingMusicStartTime;
      }
    };
    const handleEnded = () => {
      audio.currentTime = weddingMusicStartTime;
      audio.volume = 1;
      audio.play().catch(() => setIsMusicPlaying(false));
    };
    const handlePause = () => setIsMusicPlaying(false);
    const handlePlay = () => setIsMusicPlaying(true);
    const handleError = () => {
      stopMusicFade();
      setIsMusicPlaying(false);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("error", handleError);

    return () => {
      stopMusicFade();
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("error", handleError);
    };
  }, []);

  useEffect(() => {
    const elements = invitationRef.current?.querySelectorAll(
      ".section-reveal, .ornament-reveal",
    );

    if (!elements?.length) {
      return undefined;
    }

    const revealObserverOptions = window.matchMedia("(max-width: 767px)").matches
      ? { rootMargin: "0px 0px -32% 0px", threshold: 0.01 }
      : { rootMargin: "0px 0px -12% 0px", threshold: 0.12 };

    const pendingElements = new Set(elements);
    let observer;
    let lastScrollY = window.scrollY;
    let fallbackFrame;

    const revealElement = (element) => {
      if (!pendingElements.has(element)) {
        return;
      }

      element.classList.add("is-visible");
      pendingElements.delete(element);
      observer?.unobserve(element);
    };

    const revealFastPassedElements = () => {
      fallbackFrame = undefined;

      if (!document.body.classList.contains("invitation-open")) {
        return;
      }

      pendingElements.forEach((element) => {
        const rect = element.getBoundingClientRect();

        if (rect.top < window.innerHeight && rect.bottom > 0) {
          revealElement(element);
        }
      });
    };

    const handleFallbackScroll = () => {
      const scrollDelta = Math.abs(window.scrollY - lastScrollY);
      lastScrollY = window.scrollY;

      if (scrollDelta < window.innerHeight * 0.72 || fallbackFrame) {
        return;
      }

      fallbackFrame = window.requestAnimationFrame(revealFastPassedElements);
    };

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          revealElement(entry.target);
        });
      },
      revealObserverOptions,
    );

    elements.forEach((element) => observer.observe(element));
    window.addEventListener("scroll", handleFallbackScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleFallbackScroll);
      window.cancelAnimationFrame(fallbackFrame);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setIsAyatIntroReady(false);
      return undefined;
    }

    const ayatIntroTimer = window.setTimeout(() => {
      setIsAyatIntroReady(true);
    }, 600);

    return () => window.clearTimeout(ayatIntroTimer);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const galleryReveal = invitationRef.current?.querySelector(".gallery-scroll-reveal");
    const galleryImages = invitationRef.current?.querySelectorAll(".gallery-item img");
    const loveStoryReveal = invitationRef.current?.querySelector(
      ".love-story-carousel-reveal",
    );

    if (!galleryReveal || !galleryImages?.length || !loveStoryReveal) {
      return undefined;
    }

    const loveStoryRevealOptions = window.matchMedia("(max-width: 767px)").matches
      ? { rootMargin: "0px 0px -32% 0px", threshold: 0.01 }
      : { rootMargin: "0px", threshold: 0.01 };
    const fallbackTargets = new Set([galleryReveal, loveStoryReveal, ...galleryImages]);
    let lastScrollY = window.scrollY;
    let fallbackFrame;

    const revealMediaTarget = (element) => {
      if (!fallbackTargets.has(element)) {
        return;
      }

      if (element.tagName === "IMG") {
        element.classList.add("is-loaded");
        imageObserver?.unobserve(element);
      } else {
        element.classList.add("is-visible");
        revealObserver?.unobserve(element);
        loveStoryObserver?.unobserve(element);
      }

      fallbackTargets.delete(element);
    };

    const revealFastPassedMedia = () => {
      fallbackFrame = undefined;

      fallbackTargets.forEach((element) => {
        const rect = element.getBoundingClientRect();

        if (rect.top < window.innerHeight && rect.bottom > 0) {
          revealMediaTarget(element);
        }
      });
    };

    const handleMediaFallbackScroll = () => {
      const scrollDelta = Math.abs(window.scrollY - lastScrollY);
      lastScrollY = window.scrollY;

      if (scrollDelta < window.innerHeight * 0.72 || fallbackFrame) {
        return;
      }

      fallbackFrame = window.requestAnimationFrame(revealFastPassedMedia);
    };

    let revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          revealMediaTarget(entry.target);
        });
      },
      {
        rootMargin: "0px 0px 75% 0px",
        threshold: 0.01,
      },
    );

    let imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          revealMediaTarget(entry.target);
        });
      },
      {
        rootMargin: "0px",
        threshold: 0.01,
      },
    );

    let loveStoryObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          revealMediaTarget(entry.target);
        });
      },
      loveStoryRevealOptions,
    );

    revealObserver.observe(galleryReveal);
    galleryImages.forEach((image) => imageObserver.observe(image));
    loveStoryObserver.observe(loveStoryReveal);
    window.addEventListener("scroll", handleMediaFallbackScroll, { passive: true });

    return () => {
      revealObserver.disconnect();
      imageObserver.disconnect();
      loveStoryObserver.disconnect();
      window.removeEventListener("scroll", handleMediaFallbackScroll);
      window.cancelAnimationFrame(fallbackFrame);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const sections = liquidNavItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);
    let animationFrame;

    const updateActiveItem = () => {
      const readingLine = window.innerHeight * 0.72;
      const activeSection = sections.reduce((active, section) => {
        if (section.getBoundingClientRect().top <= readingLine) {
          return section;
        }

        return active;
      }, sections[0]);

      if (activeSection) {
        setActiveNavItem(activeSection.id);
      }
    };

    const handleScroll = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(updateActiveItem);
    };

    updateActiveItem();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isOpen]);

  useLayoutEffect(() => {
    const details = giftDetailsRef.current;

    if (!details) {
      return undefined;
    }

    const updateGiftHeight = () => {
      details.style.setProperty("--gift-details-height", `${details.scrollHeight}px`);
    };

    updateGiftHeight();

    if (!window.ResizeObserver) {
      return undefined;
    }

    const resizeObserver = new ResizeObserver(updateGiftHeight);
    resizeObserver.observe(details);

    return () => resizeObserver.disconnect();
  }, [isGiftOpen]);

  useEffect(() => {
    if (activeGalleryIndex === null) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveGalleryIndex(null);
      }

      if (event.key === "ArrowLeft") {
        setActiveGalleryIndex(
          (current) => (current - 1 + galleryPhotos.length) % galleryPhotos.length,
        );
      }

      if (event.key === "ArrowRight") {
        setActiveGalleryIndex((current) => (current + 1) % galleryPhotos.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeGalleryIndex]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const carousel = loveStoryCarouselRef.current;
    const track = loveStoryTrackRef.current;

    if (!carousel || !track) {
      return undefined;
    }

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let slideIndex = loveStoryPhotos.length;
    let advanceTimer;
    let transitionTimer;
    let isAdvancing = false;

    const updateSlideSize = () => {
      const slideWidth = (carousel.clientWidth - 10) / 3;
      carousel.style.setProperty("--love-story-slide-width", `${slideWidth}px`);
      return slideWidth + 5;
    };

    const positionTrack = (animate) => {
      track.style.transitionDuration = animate ? "3000ms" : "0ms";
      track.style.transform = `translate3d(${-slideIndex * updateSlideSize()}px, 0, 0)`;
    };

    const advance = () => {
      isAdvancing = true;
      slideIndex += 1;
      positionTrack(true);

      transitionTimer = window.setTimeout(finishAdvance, 3500);
    };

    const finishAdvance = () => {
      if (!isAdvancing) {
        return;
      }

      isAdvancing = false;
      window.clearTimeout(transitionTimer);

      if (slideIndex >= loveStoryPhotos.length * 2) {
        slideIndex = loveStoryPhotos.length;
        positionTrack(false);
        track.getBoundingClientRect();
      }

      advanceTimer = window.setTimeout(advance, 500);
    };

    const handleTransitionEnd = (event) => {
      if (event.target === track && event.propertyName === "transform") {
        finishAdvance();
      }
    };

    positionTrack(false);
    if (reducedMotionQuery.matches) {
      const resizeObserver = new ResizeObserver(() => positionTrack(false));
      resizeObserver.observe(carousel);

      return () => resizeObserver.disconnect();
    }

    advanceTimer = window.setTimeout(advance, 500);
    track.addEventListener("transitionend", handleTransitionEnd);

    const resizeObserver = new ResizeObserver(() => positionTrack(false));
    resizeObserver.observe(carousel);

    return () => {
      window.clearTimeout(advanceTimer);
      window.clearTimeout(transitionTimer);
      track.removeEventListener("transitionend", handleTransitionEnd);
      resizeObserver.disconnect();
    };
  }, [isOpen]);

  const openInvitation = () => {
    if (isOpen) {
      return;
    }

    void playWeddingMusic({ fadeIn: true, restart: true });

    setIsOpen(true);
    document.documentElement.classList.add("invitation-open");
    document.body.classList.add("invitation-open");

    window.setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "auto" });
      window.dispatchEvent(new CustomEvent("invitation:opened"));
    }, 1100);
  };

  const copyGiftNumber = async (number) => {
    let isCopied = false;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(number);
        isCopied = true;
      }
    } catch {
      isCopied = false;
    }

    if (!isCopied) {
      const copyField = document.createElement("textarea");
      copyField.value = number;
      copyField.setAttribute("readonly", "");
      copyField.style.position = "fixed";
      copyField.style.opacity = "0";
      document.body.appendChild(copyField);
      copyField.select();
      isCopied = document.execCommand("copy");
      copyField.remove();
    }

    if (isCopied) {
      setCopiedGiftNumber(number);
      window.setTimeout(() => setCopiedGiftNumber(""), 1600);
    } else {
      setCopiedGiftNumber("");
    }
  };

  const navigateToSection = (sectionId) => {
    const section = document.getElementById(sectionId);

    if (!section) {
      return;
    }

    setActiveNavItem(sectionId);

    if (navScrollAnimationRef.current) {
      window.cancelAnimationFrame(navScrollAnimationRef.current);
      navScrollAnimationRef.current = null;
    }

    const startPosition = window.scrollY;
    const targetPosition = section.getBoundingClientRect().top + startPosition;
    const distance = targetPosition - startPosition;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      window.scrollTo({ top: targetPosition, behavior: "auto" });
      return;
    }

    const duration = Math.min(2600, Math.max(1400, Math.abs(distance) * 0.24));
    const startTime = performance.now();
    const easeInOutSine = (progress) =>
      -(Math.cos(Math.PI * progress) - 1) / 2;

    const animateScroll = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);

      window.scrollTo({
        top: startPosition + distance * easeInOutSine(progress),
        behavior: "auto",
      });

      if (progress < 1) {
        navScrollAnimationRef.current = window.requestAnimationFrame(animateScroll);
      } else {
        navScrollAnimationRef.current = null;
      }
    };

    navScrollAnimationRef.current = window.requestAnimationFrame(animateScroll);
  };

  const submitWish = (event) => {
    event.preventDefault();

    const name = wishName.trim();
    const message = wishMessage.trim();

    if (!name || !message) {
      return;
    }

    setWishes((current) => [
      {
        id: Date.now(),
        name,
        message,
        date: "Baru saja",
      },
      ...current,
    ]);
    setWishName("");
    setWishMessage("");
  };

  return (
    <>
      <audio ref={musicAudioRef} src={weddingMusicSrc} preload="metadata" />
      <div className="inner-fixed-background pointer-events-none" aria-hidden="true" />

      <main
        className={`invitation relative mx-auto ${isOpen ? "is-open" : ""}`}
        id="invitation"
        ref={invitationRef}
      >
        <div className="background" aria-hidden="true" />
        <div className="light-wash" aria-hidden="true" />

        <CoverFloral className="floral floral-top-left" floral={coverFlorals.topLeft} />
        <CoverFloral className="floral floral-top-right" floral={coverFlorals.topRight} />
        <img className="floral floral-vine" src="/assets/floral-trailing-vine.png" alt="" />
        <CoverFloral className="floral floral-bottom-left" floral={coverFlorals.bottomLeft} />
        <CoverFloral
          className="floral floral-bottom-right"
          floral={coverFlorals.bottomRight}
          priority
        />

        <section className="cover-content" aria-labelledby="couple-names">
          <div className="invitation-card">
            <div className="card-line" aria-hidden="true" />

            <p className="eyebrow reveal reveal-1">The Wedding of</p>

            <h1 className="couple reveal reveal-2" id="couple-names">
              <span>Aldo</span>
              <span className="ampersand">&amp;</span>
              <span>Tiara</span>
            </h1>

            <div className="divider reveal reveal-3" aria-hidden="true">
              <span />
              <i>◇</i>
              <span />
            </div>

            <time className="date reveal reveal-3" dateTime="2026-10-30">
              30 October 2026
            </time>

            <div className="guest-card reveal reveal-4">
              <div className="guest-block">
                <p>
                  <span>Kepada Yth.</span>
                  <span>Bapak/ Ibu/ Saudara/ i</span>
                </p>
                <strong id="guestName">{guestName}</strong>
              </div>

              <button
                className="open-button reveal reveal-5"
                id="openInvitation"
                type="button"
                disabled={isOpen}
                onClick={openInvitation}
              >
                <span>OPEN INVITATION</span>
              </button>
            </div>
          </div>
        </section>

        <div className="inner-page" id="innerPage">
          <section
            className={`ayat-section ${isAyatIntroReady ? "is-cinematic-visible" : ""}`}
            id="ayatsuci"
            aria-label="Kutipan ayat suci"
          >
            <div className="editorial-photo-stack ayat-cinematic-photo">
              <img
                className="editorial-photo-arch"
                src="/assets/section-assets/ayat-top-arch.png"
                alt=""
              />
              <figure className="editorial-photo">
                <img
                  className="editorial-photo-image"
                  src="/assets/demo-couple.jpg"
                  alt="Foto pasangan Aldo dan Tiara"
                />
              </figure>
            </div>

            <div className="quote-panel ayat-cinematic-quote">
              <blockquote>
                &quot;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan
                untukmu pasangan hidup dari jenismu sendiri, supaya kamu merasa
                tenteram di sampingnya.&quot;
              </blockquote>
              <p>QS. Ar-Rum: 21</p>
            </div>

            <div className="ayat-divider-panel ayat-cinematic-divider" aria-hidden="true">
              <img
                className="ayat-divider"
                src="/assets/section-assets/ayat-divider.png"
                alt=""
              />
            </div>
          </section>

          <section className="profile-section" id="profil" aria-labelledby="profile-title">
            <Image
              className="profile-transition"
              src="/assets/section-assets/profile-top-transition-matched.png"
              alt=""
              width={1080}
              height={349}
              quality={92}
              sizes="(max-width: 500px) 100vw, 500px"
              loading="lazy"
              decoding="async"
            />

            <div className="profile-surface">
              <header className="profile-intro section-reveal">
                <h2 id="profile-title">With Love</h2>
                <p>
                  Dengan penuh sukacita, kami mengundang Bapak/Ibu/Saudara/i
                  untuk hadir dan menjadi bagian dari hari bahagia kami.
                </p>
              </header>

              <article className="person person-groom section-reveal">
                <div className="portrait-frame">
                  <Image
                    className="portrait-photo"
                    src="/assets/demo-groom.jpg"
                    alt="Aldo"
                    width={1200}
                    height={1800}
                    quality={95}
                    sizes="(max-width: 500px) 58vw, 225px"
                    loading="lazy"
                    decoding="async"
                  />
                  <Image
                    className="portrait-ornament"
                    src="/assets/section-assets/profile-photo-frame.png"
                    alt=""
                    width={942}
                    height={1416}
                    quality={92}
                    sizes="(max-width: 500px) 77vw, 300px"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <p className="person-role">The Groom</p>
                <h3>Aldo Pratama</h3>
                <p>
                  Putra pertama dari
                  <br />
                  Bapak Nama Ayah &amp; Ibu Nama Ibu
                </p>
                <a href="#" aria-label="Instagram Aldo">@aldopratama</a>
              </article>

              <div className="profile-ampersand section-reveal" aria-hidden="true">
                &amp;
              </div>

              <article className="person person-bride section-reveal">
                <div className="portrait-frame">
                  <Image
                    className="portrait-photo"
                    src="/assets/demo-bride.jpg"
                    alt="Tiara"
                    width={1200}
                    height={1800}
                    quality={95}
                    sizes="(max-width: 500px) 58vw, 225px"
                    loading="lazy"
                    decoding="async"
                  />
                  <Image
                    className="portrait-ornament"
                    src="/assets/section-assets/profile-photo-frame.png"
                    alt=""
                    width={942}
                    height={1416}
                    quality={92}
                    sizes="(max-width: 500px) 77vw, 300px"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <p className="person-role">The Bride</p>
                <h3>Tiara Maharani</h3>
                <p>
                  Putri pertama dari
                  <br />
                  Bapak Nama Ayah &amp; Ibu Nama Ibu
                </p>
                <a href="#" aria-label="Instagram Tiara">@tiaramaharani</a>
              </article>
            </div>

            <Image
              className="profile-bottom-transition"
              src="/assets/section-assets/profile-bottom-transition-matched.png"
              alt=""
              width={1080}
              height={349}
              quality={92}
              sizes="(max-width: 500px) 100vw, 500px"
              loading="lazy"
              decoding="async"
            />
          </section>

          <section
            className="save-date-section"
            id="save-date"
            aria-labelledby="save-date-title"
          >
            <div className="save-date-portrait section-reveal">
              <div className="save-date-photo-window">
                <Image
                  className="save-date-photo"
                  src="/assets/demo-couple.jpg"
                  alt="Aldo dan Tiara"
                  width={1200}
                  height={1800}
                  quality={95}
                  sizes="(max-width: 500px) 54vw, 225px"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="save-date-statement">
                <time dateTime="2026-10-30">
                  <span>30</span>
                  <span>OCT</span>
                  <span>2026</span>
                </time>
                <p>save the date</p>
              </div>

              <Image
                className="save-date-frame"
                src="/assets/section-assets/save-date-photo-frame.png"
                alt=""
                width={1023}
                height={1537}
                quality={92}
                sizes="(max-width: 500px) 84vw, 350px"
                loading="lazy"
                decoding="async"
              />
            </div>

            <SaveDateCountdown />
          </section>

          <section
            className="event-section section-reveal"
            id="event"
            aria-labelledby="event-title"
          >
            <div className="event-top-ornament" aria-hidden="true" />

            <div className="event-main-card">
              <article className="event-detail section-reveal">
                <h2 id="event-title">Pemberkatan</h2>
                <time dateTime="2026-10-30">Jumat, 30 Oktober 2026</time>
                <p className="event-time">08.00 WIB</p>
                <p className="event-venue">Kediaman Mempelai Wanita</p>
                <address>Jalan Kemerdekaan No. 1945</address>
                <a
                  className="event-location-button"
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  Lihat Lokasi
                </a>
              </article>

              <article className="event-detail event-detail-reception section-reveal">
                <h2>Resepsi</h2>
                <time dateTime="2024-10-10">Sabtu, 10 Oktober 2024</time>
                <p className="event-time">12.00 WIB</p>
                <p className="event-venue">Kediaman Mempelai Wanita</p>
                <address>Jalan kemerdekaanno 1945</address>
                <a
                  className="event-location-button"
                  href="https://studio.goodchoice.id/alisha/?to=Nama+Tamu#"
                  target="_blank"
                  rel="noreferrer"
                >
                  Lihat Lokasi
                </a>
              </article>
            </div>

            <div className="event-lower-ornament" aria-hidden="true" />
          </section>

          <section className="rsvp-section" id="rsvp" aria-labelledby="rsvp-title">
            <div className="rsvp-card section-reveal">
              <Image
                className="rsvp-photo"
                src="/assets/rsvp-photo.jpg"
                alt="Foto pasangan Aldo dan Tiara"
                width={683}
                height={1024}
                quality={95}
                sizes="(max-width: 500px) calc(100vw - 100px), 366px"
                loading="lazy"
                decoding="async"
              />

              <h2 id="rsvp-title">RSVP</h2>

              <p className="rsvp-intro">
                Merupakan suatu kehormatan dan kebahagiaan bagi kami sekeluarga
                apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa
                restu kepada kedua mempelai. Atas kehadiran serta doa restu,
                kami ucapkan terima kasih.
              </p>

              <form className="rsvp-form" onSubmit={(event) => event.preventDefault()}>
                <div className="rsvp-field">
                  <label htmlFor="rsvp-name">Nama</label>
                  <input
                    id="rsvp-name"
                    name="name"
                    type="text"
                    placeholder="..."
                    required
                  />
                </div>

                <div className="rsvp-field">
                  <label htmlFor="rsvp-guests">Jumlah tamu (orang)</label>
                  <div className="rsvp-select-wrap">
                    <select id="rsvp-guests" name="guests" defaultValue="0" required>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>
                  </div>
                </div>

                <fieldset className="rsvp-field rsvp-attendance">
                  <legend>Konfirmasi Kehadiran</legend>
                  <label className="rsvp-radio">
                    <input type="radio" name="attendance" value="Hadir" required />
                    <span>Hadir</span>
                  </label>
                  <label className="rsvp-radio">
                    <input
                      type="radio"
                      name="attendance"
                      value="Maaf, saya tidak bisa hadir"
                      required
                    />
                    <span>Maaf, saya tidak bisa hadir</span>
                  </label>
                </fieldset>

                <button className="rsvp-submit" type="submit">
                  Submit
                </button>
              </form>
            </div>
          </section>

          <section className="gallery-section" id="gallery" aria-labelledby="gallery-title">
            <Image
              className="gallery-left-ornament ornament-reveal"
              src="/assets/section-assets/gallery-left-ornament.png"
              alt=""
              width={1080}
              height={1920}
              quality={92}
              sizes="(max-width: 500px) 62vw, 310px"
              loading="lazy"
              decoding="async"
            />

            <div className="gallery-inner">
              <h2 id="gallery-title">Gallery</h2>

              <div className="gallery-grid gallery-scroll-reveal">
                {galleryPhotos.map((photo, index) => {
                  const { width, height } = getGalleryPhotoSize(index);
                  const isWide = index >= 16;

                  return (
                    <button
                      className={`gallery-item ${isWide ? "gallery-item-wide" : ""}`}
                      key={photo}
                      type="button"
                      aria-label={`Buka foto galeri ${index + 1}`}
                      onClick={() => setActiveGalleryIndex(index)}
                    >
                      <Image
                        src={`/assets/gallery-photos/${photo}`}
                        alt={`Momen Aldo dan Tiara ${index + 1}`}
                        width={width}
                        height={height}
                        quality={95}
                        sizes={
                          isWide
                            ? "(max-width: 500px) calc(100vw - 40px), 460px"
                            : "(max-width: 500px) calc((100vw - 43px) / 2), 229px"
                        }
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="gallery-item-overlay" aria-hidden="true" />
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          <section
            className="love-story-section"
            id="love-story"
            aria-labelledby="love-story-title"
          >
            <div className="love-story-inner">
              <h2 className="section-reveal" id="love-story-title">Kisah Cinta</h2>

              <div
                className="love-story-carousel love-story-carousel-reveal"
                aria-label="Foto perjalanan cinta Aldo dan Tiara"
                ref={loveStoryCarouselRef}
              >
                <div className="love-story-track" ref={loveStoryTrackRef}>
                  {[0, 1, 2].flatMap((sequenceIndex) =>
                    loveStoryPhotos.map((photo, index) => (
                    <div
                      className="love-story-photo"
                      key={`${sequenceIndex}-${photo}`}
                      aria-hidden={sequenceIndex !== 1}
                    >
                      <Image
                        src={`/assets/story-photos/${photo}`}
                        alt={
                          sequenceIndex === 1
                            ? `Momen kisah cinta Aldo dan Tiara ${index + 1}`
                            : ""
                        }
                        width={150}
                        height={150}
                        quality={95}
                        sizes="(max-width: 500px) calc((100vw - 70px) / 3), 147px"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  )))}
                </div>
              </div>

              <div className="love-story-cards">
                <article className="love-story-card section-reveal">
                  <h3>Awal pertemuan</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                    tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
                  </p>
                </article>

                <article className="love-story-card section-reveal">
                  <h3>Menjalin Hubungan</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                    tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
                  </p>
                </article>
              </div>
            </div>
          </section>

          <section
            className="wedding-gift-section"
            id="wedding-gift"
            aria-labelledby="wedding-gift-title"
          >
            <div className="wedding-gift-panel section-reveal">
              <h2 id="wedding-gift-title">
                Hadiah
                <br />
                Pernikahan
              </h2>

              <p className="wedding-gift-intro">
                Kehadiran dan doa Anda adalah hadiah terindah bagi kami. Namun,
                apabila berkenan memberikan tanda kasih, silakan gunakan informasi
                di bawah ini:
              </p>

              <button
                className="wedding-gift-toggle"
                type="button"
                aria-expanded={isGiftOpen}
                aria-controls="wedding-gift-details"
                onClick={() => setIsGiftOpen((current) => !current)}
              >
                {isGiftOpen ? "Sembunyikan" : "Tampilkan Gift"}
              </button>

              <div
                className={`wedding-gift-details ${isGiftOpen ? "is-open" : ""}`}
                id="wedding-gift-details"
                ref={giftDetailsRef}
                aria-hidden={!isGiftOpen}
              >
                {weddingGiftAccounts.map((account) => (
                  <article className="wedding-gift-card" key={account.number}>
                    <h3>{account.bank}</h3>
                    <div className="wedding-gift-number-row">
                      <span>{account.number}</span>
                      <button
                        className="wedding-gift-copy"
                        type="button"
                        aria-label={`Salin nomor rekening ${account.number}`}
                        onClick={() => copyGiftNumber(account.number)}
                      >
                        {copiedGiftNumber === account.number ? (
                          "Tersalin"
                        ) : (
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M8 7V5.8A2.8 2.8 0 0 1 10.8 3h7.4A2.8 2.8 0 0 1 21 5.8v7.4a2.8 2.8 0 0 1-2.8 2.8H17v1.2a2.8 2.8 0 0 1-2.8 2.8H6.8A2.8 2.8 0 0 1 4 17.2V9.8A2.8 2.8 0 0 1 6.8 7H8Zm2 0h4.2A2.8 2.8 0 0 1 17 9.8V14h1.2a.8.8 0 0 0 .8-.8V5.8a.8.8 0 0 0-.8-.8h-7.4a.8.8 0 0 0-.8.8V7Zm-3.2 2a.8.8 0 0 0-.8.8v7.4a.8.8 0 0 0 .8.8h7.4a.8.8 0 0 0 .8-.8V9.8a.8.8 0 0 0-.8-.8H6.8Z" />
                          </svg>
                        )}
                      </button>
                    </div>
                    <p>{account.name}</p>
                  </article>
                ))}

                <article className="wedding-gift-card wedding-gift-address">
                  <div className="wedding-gift-package" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path d="m12 2.5 8.5 4.25v10.5L12 21.5l-8.5-4.25V6.75L12 2.5Zm0 2.24L6.1 7.69 12 10.64l5.9-2.95L12 4.74Zm-6.5 4.57v6.7l5.5 2.75v-6.7L5.5 9.31Zm7.5 9.45 5.5-2.75v-6.7L13 12.06v6.7Z" />
                    </svg>
                  </div>
                  <div>
                    <h3>Nama Penerima</h3>
                    <p>Alamat lengkap disertai dengan kode pos</p>
                  </div>
                </article>

                <aside className="wedding-gift-note">
                  <strong>&#9432; Perhatian</strong>
                  <p>
                    Pastikan nama dan nomor rekening sudah sesuai dengan nama
                    mempelai ketika melakukan proses transfer.
                  </p>
                  <p>
                    Mohon melakukan konfirmasi hadiah dengan mengirim bukti
                    transfer atau resi pengiriman melalui pesan pribadi.
                  </p>
                </aside>
              </div>
            </div>
          </section>

          <section
            className="wishes-section ornament-reveal"
            id="wishes"
            aria-labelledby="wishes-title"
          >
            <div className="wishes-heading section-reveal">
              <h2 id="wishes-title">
                Ucapan
                <br />
                &amp; Doa
              </h2>
              <p>
                Sampaikan doa dan harapan terbaik di sini, saat kami memulai
                perjalanan baru bersama.
              </p>
            </div>

            <form className="wishes-form section-reveal" onSubmit={submitWish}>
              <label className="wishes-field">
                <span>Nama:</span>
                <input
                  type="text"
                  value={wishName}
                  onChange={(event) => setWishName(event.target.value)}
                  placeholder="Tuliskan nama Anda"
                  required
                />
              </label>

              <label className="wishes-field">
                <span>Ucapan &amp; doa:</span>
                <textarea
                  value={wishMessage}
                  onChange={(event) => setWishMessage(event.target.value)}
                  placeholder="Tuliskan ucapan dan doa terbaik"
                  maxLength="1000"
                  required
                />
              </label>

              <button className="wishes-submit" type="submit">
                Kirim
              </button>
            </form>

            <div
              className="wishes-list section-reveal"
              aria-label="Daftar ucapan dan doa"
              aria-live="polite"
            >
              {wishes.map((wish) => (
                <article className="wish-card" key={wish.id}>
                  <header>
                    <h3>{wish.name}</h3>
                    <time>{wish.date}</time>
                  </header>
                  <p>{wish.message}</p>
                </article>
              ))}
            </div>
          </section>

          <section
            className="closing-section"
            id="closing"
            aria-labelledby="closing-title"
          >
            <div className="closing-visual section-reveal">
              <div className="closing-frame-wrap">
                <div className="closing-photo-window">
                  <Image
                    src="/assets/gallery-photos/isai-jane-w8.jpg"
                    alt="Aldo dan Tiara"
                    width={1200}
                    height={1800}
                    quality={95}
                    sizes="(max-width: 500px) 50vw, 228px"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <Image
                  className="closing-frame"
                  src="/assets/section-assets/coastal-closing-frame.png"
                  alt=""
                  width={900}
                  height={1120}
                  quality={92}
                  sizes="(max-width: 500px) 77vw, 350px"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <h2 id="closing-title">Thankyou!</h2>
            </div>

            <div className="closing-message section-reveal">
              <p>
                Menjadi sebuah kebahagiaan bagi kami apabila
                Bapak/Ibu/Saudara/i berkenan hadir dalam hari bahagia ini.
                Terima kasih atas segala ucapan, doa, dan perhatian yang
                diberikan.
              </p>
              <p className="closing-see-you">See you on our big day!</p>
              <p className="closing-couple">Aldo &amp; Tiara</p>
            </div>
          </section>
        </div>
      </main>

      {isOpen && activeGalleryIndex === null && (
        <>
          <GlassMusicButton
            isPlaying={isMusicPlaying}
            onToggleMusic={toggleWeddingMusic}
          />
          <LiquidGlassNavbar
            activeItem={activeNavItem}
            onNavigate={navigateToSection}
          />
        </>
      )}

      {activeGalleryIndex !== null && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Pratinjau foto galeri"
          onClick={() => setActiveGalleryIndex(null)}
        >
          <button
            className="gallery-lightbox-close"
            type="button"
            aria-label="Tutup pratinjau foto"
            onClick={() => setActiveGalleryIndex(null)}
          >
            &times;
          </button>

          <button
            className="gallery-lightbox-nav gallery-lightbox-prev"
            type="button"
            aria-label="Foto sebelumnya"
            onClick={(event) => {
              event.stopPropagation();
              setActiveGalleryIndex(
                (activeGalleryIndex - 1 + galleryPhotos.length) % galleryPhotos.length,
              );
            }}
          >
            &#8249;
          </button>

          <Image
            src={`/assets/gallery-photos/${galleryPhotos[activeGalleryIndex]}`}
            alt={`Momen Aldo dan Tiara ${activeGalleryIndex + 1}`}
            width={getGalleryPhotoSize(activeGalleryIndex).width}
            height={getGalleryPhotoSize(activeGalleryIndex).height}
            quality={95}
            sizes="100vw"
            loading="lazy"
            decoding="async"
            onClick={(event) => event.stopPropagation()}
          />

          <button
            className="gallery-lightbox-nav gallery-lightbox-next"
            type="button"
            aria-label="Foto berikutnya"
            onClick={(event) => {
              event.stopPropagation();
              setActiveGalleryIndex((activeGalleryIndex + 1) % galleryPhotos.length);
            }}
          >
            &#8250;
          </button>
        </div>
      )}
    </>
  );
}
