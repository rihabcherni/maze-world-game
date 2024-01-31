const stars = document.querySelectorAll(".stars a");

stars.forEach((clickedStar, clickedIndex) => {
  clickedStar.addEventListener("click", () => {
    stars.forEach((star, starIndex) => {
      if (starIndex <= clickedIndex) {
        star.classList.add("active");
      } else {
        star.classList.remove("active");
      }
    });
  });
});