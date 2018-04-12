
function createRandomNodes (num, radius, max) {
  const canvas = document.querySelector('.patternBubbles')
  let ctx = canvas.getContext('2d')

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  for (var i = 0; i <= num; i++) {
    ctx.beginPath()
    ctx.lineWidth = 2
    ctx.strokeStyle = 'rgb(180,180,180)'
    var randX = Math.random(i) * max
    var randY = Math.random(i) * max
    ctx.arc(randX, randY, radius, 0, 2 * Math.PI)
    ctx.stroke()
    ctx.closePath()
  }
}

createRandomNodes(100, 4, 400)
