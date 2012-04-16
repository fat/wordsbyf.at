window.addEvent('domready', function () {

  var pos = [0, 10]
    , canvasObjs = []
    , lineStyle = 'white'
    , eyeStyle = 'white'
    , irisStyle='rgb(80,80,80)'
    , speed = 0.2
    , eyes = $$('.canvasEye')
    , cloudBody = $('cloud-body')
    , myFx = new Fx.Tween(cloudBody, {
        duration: 'long'
      , link: 'cancel'
      , property: 'top'
      , onComplete: function () {
          pos.reverse()
          myFx.start.apply(myFx, pos)
        }
    })

  myFx.start.apply(myFx, pos)

  eyes.each(function (el) {

    var canvasDom = el
      , canvasObj = {}

    canvasObj.w = canvasDom.width
    canvasObj.h = canvasDom.height
    canvasObj.abs_cx = canvasObj.w/2 + canvasDom.offsetLeft
    canvasObj.abs_cy = canvasObj.h/2 + canvasDom.offsetTop

    canvasObj.rBig = Math.min(canvasObj.w, canvasObj.h) * 0.45
    canvasObj.rLittle = Math.min(canvasObj.w, canvasObj.h) * 0.37
    canvasObj.lcx = canvasObj.ncx = canvasObj.w/2
    canvasObj.lcy = canvasObj.h/2
    canvasObj.ncy = canvasObj.h/2 + (canvasObj.rBig - canvasObj.rLittle)

    canvasObj.context = canvasDom.getContext('2d')

    canvasObjs.push(canvasObj)
    setInterval(function() { drawEye(canvasObj) }, 20)

  })

  window.addEvent('mousemove', function (e) {

    canvasObjs.each(function (canvasObj, index) {

      var pos = cloudBody.getPosition()
        , x = e.page.x - pos.x
        , y = e.page.y - pos.y
        , angle = Math.atan2(y - canvasObj.abs_cy, x - canvasObj.abs_cx)

      canvasObj.ncx = canvasObj.w/2 + (canvasObj.rBig - canvasObj.rLittle) * Math.cos(angle)
      canvasObj.ncy = canvasObj.h/2 + (canvasObj.rBig - canvasObj.rLittle) * Math.sin(angle)

    })

  })

  function drawEye (canvasObj) {

      if(Math.abs(canvasObj.lcx - canvasObj.ncx) < 1 && Math.abs(canvasObj.lcy - canvasObj.ncy) < 1) return

      var tcx = canvasObj.ncx * speed + canvasObj.lcx * (1 - speed)
        , tcy = canvasObj.ncy * speed + canvasObj.lcy * (1 - speed)
        , ctx = canvasObj.context

      ctx.fillStyle = eyeStyle
      ctx.strokeStyle = lineStyle
      ctx.beginPath()
      ctx.arc(canvasObj.w/2, canvasObj.h/2, canvasObj.rBig, 0, Math.PI * 2, false)
      ctx.fill()
      ctx.stroke()

      ctx.fillStyle = irisStyle
      ctx.beginPath()
      ctx.arc(tcx, tcy, canvasObj.rLittle, 0, Math.PI * 2, false)
      ctx.fill()

      canvasObj.lcx = tcx
      canvasObj.lcy = tcy

  }

})