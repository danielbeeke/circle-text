const circleTexts = ([...document.querySelectorAll('.circle-text')] as Array<HTMLDivElement>)

for (const circleText of circleTexts) {
  circleText.innerHTML = circleText.innerText
  .split('')
  .map(letter => `<span>${letter}</span>`)
  .join('')
}

const style = document.body.style

const addDegree = (circle: number, degrees: number) => {
  const previousDegress = parseInt(style.getPropertyValue(`--circle-${circle}-start`))
  style.setProperty(`--circle-${circle}-start`, `${previousDegress + degrees}deg`);  
}

const enter = document.querySelector('.enter')

enter.addEventListener('click', () => {
  document.body.classList.add('exit')
  addDegree(1, 60)
  setTimeout(() => addDegree(2, 70), 120);
  addDegree(3, 220)
})

let isRunning = false

enter.addEventListener('mouseenter', () => {
  if (isRunning) return
  isRunning = true

  addDegree(3, 30)
  setTimeout(() => addDegree(2, 70), 200);
  setTimeout(() => addDegree(1, 110), 400);

  setTimeout(() => {
    addDegree(1, 60)
    addDegree(2, 60)
    addDegree(3, 60)
    isRunning = false
  }, 1000);
})