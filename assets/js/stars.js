// Selezioniamo tutte le stelle e il pulsante
const stars = document.querySelectorAll(".star");
const submitBtn = document.getElementById("submit");
const commentInput = document.getElementById("comment");

let selectedRating = 0;

// Funzione per aggiornare l'aspetto delle stelle
function updateStars(rating) {
  for (let i = 0; i < stars.length; i++) {
    if (i < rating) {
      stars[i].classList.add("active"); // Aggiunge la classe "active"
    } else {
      stars[i].classList.remove("active"); // Rimuove la classe "active"
    }
  }
}

// Evento click per selezionare il rating
for (let i = 0; i < stars.length; i++) {
  stars[i].addEventListener("click", function () {
    selectedRating = i + 1; // Imposta il rating basato sulla stella cliccata
    updateStars(selectedRating);
  });

  // Anteprima stelle al passaggio del mouse
  stars[i].addEventListener("mouseover", function () {
    updateStars(i + 1);
  });

  // Ripristina la selezione quando il mouse esce
  stars[i].addEventListener("mouseout", function () {
    updateStars(selectedRating);
  });
}

// Invio feedback via email
submitBtn.addEventListener("click", function () {
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
