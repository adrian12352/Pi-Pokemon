const arrow = document.getElementById("Arrow");
window.addEventListener("scroll", () => {
  console.log("scrolling");
  arrow.classList.toggle("appear", window.scrollY > 100);
});
