const stars = document.querySelectorAll(".star");
const submitBtn = document.getElementById("submit");
const commentInput = document.getElementById("comment");

let selectedRating = 0;

function highlightStars(rating) {
  stars.forEach((star, index) => {
    star.classList.toggle("hover", index < rating);
  });
}

function updateStars(rating) {
  stars.forEach((star, index) => {
    star.classList.toggle("selected", index < rating);
  });
}

stars.forEach((star, index) => {
  star.addEventListener("click", () => {
    selectedRating = index + 1;
    updateStars(selectedRating);
  });

  star.addEventListener("mouseover", () => {
    highlightStars(index + 1);
  });

  star.addEventListener("mouseout", () => {
    if (selectedRating === 0) {
      stars.forEach((star) => star.classList.remove("hover"));
    } else {
      updateStars(selectedRating);
    }
  });
});
