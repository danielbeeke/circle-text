const style = document.body.style

const addDegree = (circle: number, degrees: number) => {
  const previousDegress = parseInt(style.getPropertyValue(`--circle-${circle}-start`))
  style.setProperty(`--circle-${circle}-start`, `${previousDegress + degrees}deg`);  
}

const circleTexts = ([...document.querySelectorAll('.circle-text')] as Array<HTMLDivElement>)

for (const [circleTextIndex, circleText] of circleTexts.entries()) {
  circleText.innerHTML = circleText.innerText
  .split('')
  .map((letter: string, index: number) => `<span style="--index: ${index}">${letter}</span>`)
  .join('')

  circleText.addEventListener('wheel', (event: WheelEvent) => {
    document.body.classList.add('is-scrolling')
    addDegree(circleTextIndex + 1, event.deltaY)
    circleText.addEventListener('mouseout', () => {
      document.body.classList.remove('is-scrolling')
    }, {
      once: true
    })
  });
}

const enter = document.querySelector('.enter')

enter.addEventListener('click', () => {
  document.body.classList.add('exit')
  addDegree(1, 60)
  setTimeout(() => addDegree(2, 70), 120);
  addDegree(3, 220)
  setTimeout(() => location.reload(), 3000);
})

let isRunning = false

enter.addEventListener('mouseenter', () => {
  if (isRunning || document.body.classList.contains('start-transition')) return
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

document.body.classList.remove('start')
setTimeout(() => {
  document.body.classList.remove('start-transition')
}, 2000);