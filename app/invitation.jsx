"use client";

import { useEffect, useRef, useState } from "react";

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

export default function Invitation() {
  const [isOpen, setIsOpen] = useState(false);
  const [guestName, setGuestName] = useState("Nama Tamu");
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(null);
  const [countdown, setCountdown] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const invitationRef = useRef(null);

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

  useEffect(() => {
    const elements = invitationRef.current?.querySelectorAll(".section-reveal");

    if (!elements?.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.12,
      },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const revealElements = invitationRef.current?.querySelectorAll(
      ".gallery-scroll-reveal, .love-story-carousel-reveal",
    );

    if (!revealElements?.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -15% 0px",
        threshold: 0,
      },
    );

    revealElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [isOpen]);

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

  const openInvitation = () => {
    if (isOpen) {
      return;
    }

    setIsOpen(true);
    document.documentElement.classList.add("invitation-open");
    document.body.classList.add("invitation-open");

    window.setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "auto" });
      window.dispatchEvent(new CustomEvent("invitation:opened"));
    }, 850);
  };

  return (
    <>
      <div className="inner-fixed-background pointer-events-none" aria-hidden="true" />

      <main
        className={`invitation relative mx-auto ${isOpen ? "is-open" : ""}`}
        id="invitation"
        ref={invitationRef}
      >
        <div className="background" aria-hidden="true" />
        <div className="light-wash" aria-hidden="true" />

        <img className="floral floral-top-left" src="/assets/floral-top-left.png" alt="" />
        <img className="floral floral-top-right" src="/assets/floral-top-right.png" alt="" />
        <img className="floral floral-vine" src="/assets/floral-trailing-vine.png" alt="" />
        <img className="floral floral-bottom-left" src="/assets/floral-bottom-left.png" alt="" />
        <img className="floral floral-bottom-right" src="/assets/floral-bottom-right.png" alt="" />

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
                <span>Open Invitation</span>
              </button>
            </div>
          </div>
        </section>

        <div className="inner-page" id="innerPage">
          <section className="ayat-section" id="ayatsuci" aria-label="Kutipan ayat suci">
            <div className="editorial-photo-stack section-reveal">
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

            <div className="quote-panel section-reveal">
              <blockquote>
                &quot;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan
                untukmu pasangan hidup dari jenismu sendiri, supaya kamu merasa
                tenteram di sampingnya.&quot;
              </blockquote>
              <p>QS. Ar-Rum: 21</p>
            </div>

            <div className="ayat-divider-panel section-reveal" aria-hidden="true">
              <img
                className="ayat-divider"
                src="/assets/section-assets/ayat-divider.png"
                alt=""
              />
            </div>
          </section>

          <section className="profile-section" id="profil" aria-labelledby="profile-title">
            <img
              className="profile-transition"
              src="/assets/section-assets/profile-top-transition-white.png?v=edge-crop"
              alt=""
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
                  <img className="portrait-photo" src="/assets/demo-groom.jpg" alt="Aldo" />
                  <img
                    className="portrait-ornament"
                    src="/assets/section-assets/profile-photo-frame.png"
                    alt=""
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
                  <img className="portrait-photo" src="/assets/demo-bride.jpg" alt="Tiara" />
                  <img
                    className="portrait-ornament"
                    src="/assets/section-assets/profile-photo-frame.png"
                    alt=""
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

            <img
              className="profile-bottom-transition"
              src="/assets/section-assets/profile-bottom-transition.png?v=edge-crop"
              alt=""
            />
          </section>

          <section
            className="save-date-section"
            id="save-date"
            aria-labelledby="save-date-title"
          >
            <div className="save-date-portrait section-reveal">
              <div className="save-date-photo-window">
                <img
                  className="save-date-photo"
                  src="/assets/demo-couple.jpg"
                  alt="Aldo dan Tiara"
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

              <img
                className="save-date-frame"
                src="/assets/section-assets/save-date-photo-frame.png"
                alt=""
              />
            </div>

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
          </section>

          <section className="event-section" id="event" aria-labelledby="event-title">
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
              <img
                className="rsvp-photo"
                src="/assets/rsvp-photo.jpg"
                alt="Foto pasangan Aldo dan Tiara"
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
            <img
              className="gallery-left-ornament"
              src="/assets/section-assets/gallery-left-ornament.png"
              alt=""
            />

            <div className="gallery-inner">
              <h2 id="gallery-title">Gallery</h2>

              <div className="gallery-grid gallery-scroll-reveal">
                {galleryPhotos.map((photo, index) => (
                  <button
                    className={`gallery-item ${index >= 16 ? "gallery-item-wide" : ""}`}
                    key={photo}
                    type="button"
                    aria-label={`Buka foto galeri ${index + 1}`}
                    onClick={() => setActiveGalleryIndex(index)}
                  >
                    <img
                      src={`/assets/gallery-photos/${photo}`}
                      alt={`Momen Aldo dan Tiara ${index + 1}`}
                      width={index === 17 ? 1800 : index >= 10 ? 1350 : 1200}
                      height={index === 17 ? 1352 : 1800}
                      loading="lazy"
                    />
                    <span className="gallery-item-overlay" aria-hidden="true" />
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section
            className="love-story-section"
            id="love-story"
            aria-labelledby="love-story-title"
          >
            <div className="love-story-inner">
              <h2 id="love-story-title">Kisah Cinta</h2>

              <div
                className="love-story-carousel love-story-carousel-reveal"
                aria-label="Foto perjalanan cinta Aldo dan Tiara"
              >
                <div className="love-story-track">
                  {[...loveStoryPhotos, ...loveStoryPhotos].map((photo, index) => (
                    <div
                      className="love-story-photo"
                      key={`${photo}-${index}`}
                      aria-hidden={index >= loveStoryPhotos.length}
                    >
                      <img
                        src={`/assets/story-photos/${photo}`}
                        alt={
                          index < loveStoryPhotos.length
                            ? `Momen kisah cinta Aldo dan Tiara ${index + 1}`
                            : ""
                        }
                        width="150"
                        height="150"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="love-story-cards">
                <article className="love-story-card">
                  <h3>Awal pertemuan</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                    tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
                  </p>
                </article>

                <article className="love-story-card">
                  <h3>Menjalin Hubungan</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                    tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
                  </p>
                </article>
              </div>
            </div>
          </section>
        </div>
      </main>

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

          <img
            src={`/assets/gallery-photos/${galleryPhotos[activeGalleryIndex]}`}
            alt={`Momen Aldo dan Tiara ${activeGalleryIndex + 1}`}
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
