const pieChar = () => {
  const results = JSON.parse(sessionStorage.getItem("quizResults")) || []
  const totalQuestions = results.length
  const correctAnswers = results.filter((result) => result.correct).length
  const wrongAnswers = totalQuestions - correctAnswers

  const correctPercent = ((correctAnswers / totalQuestions) * 100).toFixed(1)
  const wrongPercent = ((wrongAnswers / totalQuestions) * 100).toFixed(1)

  document.getElementById("correct").textContent = `Correct`
  document.getElementById("wrong").textContent = `Wrong`
  document.getElementById(
    "percentageCorrect"
  ).textContent = ` ${correctPercent}%`
  document.getElementById("percentageWrong").textContent = ` ${wrongPercent}%`
  document.getElementById(
    "questionsWrong"
  ).textContent = `(${wrongAnswers}/${totalQuestions} questions)`
  document.getElementById(
    "questionsCorrect"
  ).textContent = `(${correctAnswers}/${totalQuestions} questions)`

  // Selezioniamo gli elementi da modificare
  const specialText = document.getElementById("special-text")
  const congratulations = document.querySelector(".congratulations h3") // Titolo "Congratulations!"

  if (correctPercent >= 60) {
    specialText.innerText = "You passed the exam."
    congratulations.style.display = "block" // Mostra "Congratulations!"
  } else {
    specialText.innerText = "You did not pass. Try again!"
    congratulations.style.display = "none" // Nasconde "Congratulations!"
  }

  const config = {
    type: "doughnut",
    data: {
      datasets: [
        {
          backgroundColor: ["#00ffff", "#c2128d"],
          data: [correctAnswers, wrongAnswers],
        },
      ],
    },
    options: {
      responsive: true,
      cutout: "90%",
    },
  }

  new Chart(document.getElementById("pie-chart"), config)
}

pieChar()
