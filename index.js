const cursor = document.getElementById("cursor");
      document.addEventListener("mousemove", (e) => {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
      });
      document
        .querySelectorAll(
          "a, button, .project-card, .skill-category, .timeline-card",
        )
        .forEach((el) => {
          el.addEventListener("mouseenter", () => cursor.classList.add("big"));
          el.addEventListener("mouseleave", () =>
            cursor.classList.remove("big"),
          );
        });

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add("visible");
          });
        },
        { threshold: 0.1 },
      );

      document
        .querySelectorAll(".reveal")
        .forEach((el) => observer.observe(el));``