// Selezioniamo tutte le stelle e il pulsante
const stars = document.querySelectorAll(".star");
const submitBtn = document.getElementById("submit");
const commentInput = document.getElementById("comment");

let selectedRating = 0;

// Funzione per aggiornare l'aspetto delle stelle
function updateStars(rating) {
  stars.forEach((star, index) => {
    star.classList.toggle("active", index < rating);
  });
}

// Evento click per selezionare il rating
stars.forEach((star, index) => {
  star.addEventListener("click", () => {
    selectedRating = index + 1;
    updateStars(selectedRating);
  });

  // Anteprima stelle al passaggio del mouse
  star.addEventListener("mouseover", () => updateStars(index + 1));
  star.addEventListener("mouseout", () => updateStars(selectedRating));
});

// Invio feedback via email
submitBtn.addEventListener("click", () => {
  const comment = commentInput.value.trim();

  if (selectedRating === 0) {
    alert("Please select a rating before submitting!");
    return;
  }

  if (comment === "") {
    alert("Please write a comment before submitting!");
    return;
  }

  const emailBody = `Rating: ${selectedRating}/10%0D%0AComment: ${comment}`;
  window.location.href = `mailto:qualsiasiemail@hotmail.com?subject=Feedback%20Epicode&body=${emailBody}`;
});
