const pieChar = ()=>{
    let question = 10
    let  rigth =7
    let wrong = question-rigth
    let correctPercent = ((rigth/ question)*100).toFixed(1)
    let wrongPercent = ((wrong/ question)*100).toFixed(1)
    document.getElementById("correct").textContent= `Correct: ${correctPercent}% (${rigth}/${question} questions)`
    document.getElementById("wrong").textContent= `Wrong: ${wrongPercent}% (${wrong}/${question} questions)`
}