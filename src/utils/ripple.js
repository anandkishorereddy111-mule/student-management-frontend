export function createRipple(e) {
  const button = e.currentTarget;
  const existing = button.getElementsByClassName("rf-ripple")[0];
  if (existing) existing.remove();

  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;
  const rect = button.getBoundingClientRect();

  const circle = document.createElement("span");
  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${e.clientX - rect.left - radius}px`;
  circle.style.top = `${e.clientY - rect.top - radius}px`;
  circle.classList.add("rf-ripple");
  button.appendChild(circle);
  setTimeout(() => circle.remove(), 650);
}