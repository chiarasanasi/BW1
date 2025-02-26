const buttons = document.querySelectorAll(".singleAnswer")
console.log(buttons)

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((btn) => (btn.style.backgroundColor = ""))
    button.style.backgroundColor = "#D20094"
  })
  // console.log(buttons);
})

const quiz = {
  response_code: 0,
  results: [
    {
      type: "multiple",
      difficulty: "easy",
      category: "Science: Computers",
      question: "What does the computer software acronym JVM stand for?",
      correct_answer: "Java Virtual Machine",
      incorrect_answers: [
        "Java Vendor Machine",
        "Java Visual Machine",
        "Just Virtual Machine",
      ],
    },
    {
      type: "multiple",
      difficulty: "easy",
      category: "Science: Computers",
      question:
        "The series of the Intel HD graphics generation succeeding that of the 5000 and 6000 series (Broadwell) is called:",
      correct_answer: "HD Graphics 500",
      incorrect_answers: [
        "HD Graphics 700 ",
        "HD Graphics 600",
        "HD Graphics 7000",
      ],
    },
    {
      type: "multiple",
      difficulty: "easy",
      category: "Science: Computers",
      question:
        "Which computer hardware device provides an interface for all other connected devices to communicate?",
      correct_answer: "Motherboard",
      incorrect_answers: [
        "Central Processing Unit",
        "Hard Disk Drive",
        "Random Access Memory",
      ],
    },
    {
      type: "multiple",
      difficulty: "easy",
      category: "Science: Computers",
      question: "What does the Prt Sc button do?",
      correct_answer:
        "Captures what&#039;s on the screen and copies it to your clipboard",
      incorrect_answers: [
        "Nothing",
        "Saves a .png file of what&#039;s on the screen in your screenshots folder in photos",
        "Closes all windows",
      ],
    },
    {
      type: "multiple",
      difficulty: "easy",
      category: "Science: Computers",
      question: "In computing, what does MIDI stand for?",
      correct_answer: "Musical Instrument Digital Interface",
      incorrect_answers: [
        "Musical Interface of Digital Instruments",
        "Modular Interface of Digital Instruments",
        "Musical Instrument Data Interface",
      ],
    },
    {
      type: "multiple",
      difficulty: "easy",
      category: "Science: Computers",
      question: "HTML is what type of language?",
      correct_answer: "Markup Language",
      incorrect_answers: [
        "Macro Language",
        "Programming Language",
        "Scripting Language",
      ],
    },
    {
      type: "multiple",
      difficulty: "medium",
      category: "Science: Computers",
      question: "On which computer hardware device is the BIOS chip located?",
      correct_answer: "Motherboard",
      incorrect_answers: [
        "Hard Disk Drive",
        "Central Processing Unit",
        "Graphics Processing Unit",
      ],
    },
    {
      type: "multiple",
      difficulty: "medium",
      category: "Science: Computers",
      question:
        "What was the first Android version specifically optimized for tablets?",
      correct_answer: "Honeycomb",
      incorrect_answers: ["Eclair", "Froyo", "Marshmellow"],
    },
    {
      type: "multiple",
      difficulty: "medium",
      category: "Science: Computers",
      question: "On which computer hardware device is the BIOS chip located?",
      correct_answer: "Motherboard",
      incorrect_answers: [
        "Hard Disk Drive",
        "Central Processing Unit",
        "Graphics Processing Unit",
      ],
    },
    {
      type: "multiple",
      difficulty: "easy",
      category: "Science: Computers",
      question:
        "Which programming language shares its name with an island in Indonesia?",
      correct_answer: "Java",
      incorrect_answers: ["Python", "C", "Jakarta"],
    },
  ],
}
let quizIndex = 0

function loadQuestion() {
  const currentQuestion = quiz.results[quizIndex]
  const allAnswers = [
    currentQuestion.correct_answer,
    ...currentQuestion.incorrect_answers,
  ]

  const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5)

  document.getElementById("question").querySelector("p").innerHTML =
    currentQuestion.question

  /*document.querySelectorAll(".singleAnswer")[0].innerText =
    currentQuestion.correct_answer

  let i = 1
  shuffledAnswers.forEach((answer) => {
    if (answer !== currentQuestion.correct_answer) {
      document.querySelectorAll(".singleAnswer")[i].innerText = answer
      i++
    }
  });*/

  // Così strutturato il codice assegna la risposta corretta sempre al primo button. Ho risolto così ---Felice
  const answerOptions = document.querySelectorAll(".singleAnswer")
  shuffledAnswers.forEach((answer, i) => {
    answerOptions[i].innerText = answer
  })

  document.getElementById("questionNumber").innerHTML = `QUESTION ${
    quizIndex + 1
  } <span>/10</span>`
  //questionNumberElement.style.color = "rgb(210, 0, 148)";
}
loadQuestion()
function verifyAnswer() {
  const currentQuestion = quiz.results[quizIndex]
  let greenAnswer = currentQuestion.correct_answer
  let answerCorrect = false

  buttons.forEach((button) => {
    if (button.style.backgroundColor === "rgb(210, 0, 148)") {
      if (button.innerText === greenAnswer) {
        button.id = "positive"
        answerCorrect = true
      } else {
        button.id = "negative"
      }
    } else {
      button.id = "answer"
    }
  })

  const result = {
    questionIndex: quizIndex,
    correct: answerCorrect,
  }

  let results = JSON.parse(sessionStorage.getItem("quizResults")) || []
  results.push(result)
  sessionStorage.setItem("quizResults", JSON.stringify(results))
  console.log(result)
}

document.getElementById("goOn").addEventListener("click", () => {
  let selectedButton = false
  buttons.forEach((button) => {
    console.log(button.style.backgroundColor)
    if (button.style.backgroundColor === "rgb(210, 0, 148)") {
      selectedButton = true
    }
  })
  if (selectedButton) {
    verifyAnswer()
    setTimeout(() => {
      quizIndex++
      buttons.forEach((button) => {
        button.style.backgroundColor = "rgb(128, 128, 128, 0.1)"
        button.id = "answer"
      })
      if (quizIndex < quiz.results.length) {
        loadQuestion()
        inizio() //così il timer riparte a ogni domanda
      } else {
        window.location.href = "http://127.0.0.1:5500/results.html"
      }
    }, 2000)
  } else {
    alert("Select an answer!")
  }
})

//JS PER IMPLEMENTARE IL TIMER

let donutChart
let timer

//creo il grafico a donut
const createDonutChart = function (value, maxValue) {
  const countdown = document.getElementById("donuts-countdown").getContext("2d")

  if (donutChart) {
    donutChart.destroy()
  } //distrugge il grafico attuale per poi crearne uno nuovo senza sovrapporli

  donutChart = new Chart(countdown, {
    type: "doughnut",
    data: {
      datasets: [
        {
          data: [value, maxValue - value],
          backgroundColor: ["rgb(255, 255, 255,0.3)", "#00FFFF"],
          borderWidth: 0,
        },
      ],
    },
    options: {
      tooltips: {
        enabled: false,
        responsive: false,
        maintainAspectRatio: false,
      },
      cutout: 38,
    },
  })
}

//questa funzione aggiorna il grafico cambiando i dati
const updateDonutChart = function (chart, value, maxValue) {
  if (donutChart) {
    chart.data.datasets[0].data[0] = value
    chart.data.datasets[0].data[1] = maxValue - value
    chart.update({
      duration: 1000, // animazione di 1s
      easing: "easeInOutCirc",
    })
  }
  if (maxValue - value < 6) {
    chart.data.datasets[0].backgroundColor = [
      "rgba(255, 255, 255,0.3)",
      "rgb(255, 0, 0)",
    ]
  }
}

const inizio = function () {
  clearInterval(timer)

  const maxValue = 10
  let counter = 0

  createDonutChart(counter, maxValue)

  let number = document.getElementById("number-container")

  let donut = document.getElementById("countdown")
  console.log(donut)

  console.log(donut)

  timer = setInterval(() => {
    if (counter < maxValue) {
      counter = counter + 1
      console.log(counter)
      updateDonutChart(donutChart, counter, maxValue)
    } else {
      clearInterval(timer)
    }

    //aggiorna il numero del countdown
    number.innerHTML = `
    <p class="second-remaining">SECONDS</p>
    <p id="number">${maxValue - counter}</p>
    <p class="second-remaining">REMAINING</p>`
  }, 1000)
}

//questo if avvia il timer solo all'inizio
if (quizIndex === 0) {
  inizio()
} else if (quizIndex !== 0) {
  donutChart.destroy()
}

//riavvio del timer  a ogni domanda
document.getElementById("goOn").addEventListener("click", () => {
  inizio()
})
