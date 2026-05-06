// CheckPoint 8 — Script de navegación interactiva
// Autor: Ander Bilbao Castejón

document.addEventListener("DOMContentLoaded", () => {
  // ── Resaltado de la sección activa al hacer scroll ──
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".sidebar nav a");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${id}`
            );
          });
        }
      });
    },
    { rootMargin: "-30% 0px -60% 0px" }
  );

  sections.forEach((section) => observer.observe(section));

  // ── Menú móvil ──
  const menuToggle = document.querySelector(".menu-toggle");
  const sidebar = document.querySelector(".sidebar");

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      sidebar.classList.toggle("open");
    });
  }

  // Cerrar sidebar al hacer click en un enlace (móvil)
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        sidebar.classList.remove("open");
      }
    });
  });

  // ── Botón "volver arriba" ──
  const backToTop = document.querySelector(".back-to-top");
  if (backToTop) {
    window.addEventListener("scroll", () => {
      backToTop.classList.toggle("visible", window.scrollY > 500);
    });

    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ── Resaltado de sintaxis básico ──
  document.querySelectorAll("pre code").forEach((block) => {
    let html = block.innerHTML;

    // Comentarios (primero, para no afectar al resto)
    html = html.replace(
      /(\/\/[^\n]*)/g,
      '<span class="token-comment">$1</span>'
    );

    // Strings
    html = html.replace(
      /(&quot;[^&]*?&quot;|'[^']*?')/g,
      '<span class="token-string">$1</span>'
    );

    // Números
    html = html.replace(
      /\b(\d+\.?\d*)\b/g,
      '<span class="token-number">$1</span>'
    );

    // Palabras clave
    const keywords = [
      "const", "let", "var", "function", "return", "if", "else",
      "for", "while", "do", "break", "continue", "class", "extends",
      "super", "new", "this", "async", "await", "try", "catch",
      "finally", "throw", "import", "export", "default", "from",
      "of", "in", "static", "true", "false", "null", "undefined"
    ];
    const kwRegex = new RegExp(`\\b(${keywords.join("|")})\\b`, "g");
    html = html.replace(kwRegex, '<span class="token-keyword">$1</span>');

    block.innerHTML = html;
  });

  // ── Animación de entrada de las cards ──
  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animation = "fadeInUp 0.6s ease-out forwards";
          cardObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".card").forEach((card) => {
    card.style.opacity = "0";
    cardObserver.observe(card);
  });
});
