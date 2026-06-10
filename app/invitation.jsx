"use client";

import { useEffect, useRef, useState } from "react";

export default function Invitation() {
  const [isOpen, setIsOpen] = useState(false);
  const [guestName, setGuestName] = useState("Nama Tamu");
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
              src="/assets/section-assets/profile-top-transition.png"
              alt=""
            />

            <div className="profile-surface">
              <header className="profile-intro section-reveal">
                <p className="section-kicker">By the grace of God</p>
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
                <h3>Aldo</h3>
                <p className="person-fullname">Aldo Pratama</p>
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
                <h3>Tiara</h3>
                <p className="person-fullname">Tiara Maharani</p>
                <p>
                  Putri pertama dari
                  <br />
                  Bapak Nama Ayah &amp; Ibu Nama Ibu
                </p>
                <a href="#" aria-label="Instagram Tiara">@tiaramaharani</a>
              </article>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
