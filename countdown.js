let donutChart
//questa function crea un donut chart
const createDonutChart = function (value, maxValue) {
  const countdown = document.getElementById("donuts-countdown").getContext("2d")
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
      cutoutPercentage: 80,
    },
  })
}

//questa funzione aggiorna il grafico cambiando i dati
const updateDonutChart = function (chart, counter, maxValue) {
  chart.data.datasets[0].data[0] = counter
  chart.data.datasets[0].data[1] = maxValue
  chart.update({
    duration: 1000, // animazione di 1s
    easing: "easeInOutCirc",
  })
}

const inizio = function () {
  const maxValue = 31
  let counter = 0

  createDonutChart(counter, maxValue)

  let number = document.createElement("div")

  const donut = document.getElementById("countdown")

  donut.appendChild(number)

  setInterval(() => {
    if (counter < maxValue) {
      counter = counter + 1
      console.log(counter)
      updateDonutChart(donutChart, counter, maxValue) // Passa anche maxValue
    }
    number.innerHTML = `
    <p>SECONDS</p>
    <p class="number">${maxValue - counter}</p>
    <p>REMAINING</p>`
  }, 1000)
}

inizio()
