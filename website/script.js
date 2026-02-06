// Simple scroll effect (optional)
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".btn-primary");
  const section = document.querySelector("#getting-started");
  if (!btn || !section) return;

  btn.addEventListener("click", e => {
    e.preventDefault();
    section.scrollIntoView({ behavior: "smooth" });
  });
});
