const pieChar = () => {
  const results = JSON.parse(sessionStorage.getItem("quizResults")) || [];
  const totalQuestions = results.length;
  const correctAnswers = results.filter((result) => result.correct).length;
  const wrongAnswers = totalQuestions - correctAnswers;

  const correctPercent = ((correctAnswers / totalQuestions) * 100).toFixed(1);
  const wrongPercent = ((wrongAnswers / totalQuestions) * 100).toFixed(1);

  document.getElementById(
    "correct"
  ).textContent = `Correct: ${correctPercent}% (${correctAnswers}/${totalQuestions} questions)`;
  document.getElementById(
    "wrong"
  ).textContent = `Wrong: ${wrongPercent}% (${wrongAnswers}/${totalQuestions} questions)`;

  // Selezioniamo gli elementi da modificare
  const specialText = document.getElementById("special-text");
  const congratulations = document.querySelector(".congratulations h3"); // Titolo "Congratulations!"
  const emailText = document.querySelector(".congratulations p"); // Paragrafo con il messaggio dell'email

  if (correctPercent >= 60) {
    specialText.innerText = "You passed the exam.";
    congratulations.style.display = "block";
    emailText.style.display = "block";
  } else {
    specialText.innerText = "You did not pass. Try again!";
    congratulations.style.display = "none";
    emailText.style.display = "none";
  }

  const config = {
    type: "doughnut",
    data: {
      datasets: [
        {
          backgroundColor: ["#00ffff", "#c2128d"],
          data: [correctAnswers, wrongAnswers],
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      cutout: "70%", // ho modificato qui: aumentato il cutout da "50%" a "70%" per ridurre lo spessore del cerchio
      maintainAspectRatio: false, // ho modificato qui: aggiunto per assicurare che il canvas si adatti alle dimensioni del container
      plugins: {
        legend: {
          display: false, // ho modificato qui: nasconde la legenda
        },
      },
    },
  };

  new Chart(document.getElementById("pie-chart"), config);
};

pieChar();
