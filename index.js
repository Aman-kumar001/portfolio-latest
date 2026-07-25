const cursor = document.getElementById("cursor");
document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});
document
  .querySelectorAll("a, button, .project-card, .skill-category, .timeline-card")
  .forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("big"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("big"));
  });

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.1 },
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Contact form — no backend on this static site, so "Send Message"
// opens the visitor's email client with the fields pre-filled.
const sendBtn = document.getElementById("btn-send");
if (sendBtn) {
  const nameInput = document.getElementById("contact-name");
  const emailInput = document.getElementById("contact-email");
  const subjectInput = document.getElementById("contact-subject");
  const messageInput = document.getElementById("contact-message");
  const statusEl = document.getElementById("contact-status");
  const DEST_EMAIL = "akamanjangra@gmail.com";

  const setStatus = (text, type) => {
    if (!statusEl) return;
    statusEl.textContent = text;
    statusEl.classList.remove("error", "success");
    if (type) statusEl.classList.add(type);
  };

  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  sendBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const subject = subjectInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !email || !message) {
      setStatus("Please fill in your name, email, and message.", "error");
      return;
    }
    if (!isValidEmail(email)) {
      setStatus("That email address doesn't look right.", "error");
      return;
    }

    const mailSubject = subject || `Portfolio message from ${name}`;
    const mailBody = `${message}\n\n— ${name} (${email})`;
    const mailtoUrl = `mailto:${DEST_EMAIL}?subject=${encodeURIComponent(
      mailSubject,
    )}&body=${encodeURIComponent(mailBody)}`;

    window.location.href = mailtoUrl;
    setStatus("Opening your email client…", "success");
  });
}