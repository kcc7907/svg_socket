const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const socket = io.connect('http://localhost:9999');

var app = new Vue({
  el: "#app",
  data: function () {
    return {
      mouse: {
        current: {
          x: 0,
          y: 0
        },
        previous: {
          x: 0,
          y: 0
        },
        down: false
      },
      start:{
        x:0,
        y:0
      },

      // ----------

      board: '',
      cursor: '',
      colorNum: 0,
      gesture: false,
      line: '',
      radius: 2.5,
      width: 8,
      undo: false,
      onCanvas: false // mouseout event is not firing, dunno why
    }
  },
  computed: {
    currentMouse: function () {
      var c = document.getElementById("canvas");
      var rect = c.getBoundingClientRect();

      return {
        x: this.mouse.current.x - rect.left,
        y: this.mouse.current.y - rect.top
      }
    },

    // ----- -----------

    canvasWidth: function () {
      return this.board.clientWidth
    },
    canvasHeight: function () {
      return this.board.clientHeight
    },
    toolBarRight: {
      get: function () {
        return -this.colors.length * 51.5 + 'px'
      },
      set: function (newVal) {
        // this.toolBarRight = newVal // This is more right way to do that, but it won't work( Did the same with css hover
      }

    }
  },
  methods: {
    draw: function (event) {

      // requestAnimationFrame(this.draw);
      if (this.mouse.down) {
        var c = document.getElementById("canvas");
        var ctx = c.getContext("2d");
        ctx.lineTo(this.currentMouse.x, this.currentMouse.y);
        ctx.strokeStyle = "#F63E02";
        ctx.lineWidth = 2;
        ctx.stroke();

        socket.emit('draw', {
          start : {
            x :this.start.x,
            y :this.start.y
          },
          end:{
            x: this.currentMouse.x,
            y: this.currentMouse.y
          }
        });

      }

    },
    handleMouseDown: function (event) {
      this.mouse.down = true;
      this.mouse.current = {
        x: event.pageX,
        y: event.pageY
      }
      var c = document.getElementById("canvas");
      var ctx = c.getContext("2d");
      ctx.beginPath();
      this.start = {
        x: this.currentMouse.x,
        y: this.currentMouse.y
      }
      ctx.moveTo(this.currentMouse.x, this.currentMouse.y)

      ///
      let e = event;
      let rect = this.board.getBoundingClientRect();
      let cay = c.getBoundingClientRect();
      console.log(cay );
      let cursorX = Math.round(e.clientX - cay.x) || Math.round(e.changedTouches[0].clientX - rect.x)
      let cursorY = Math.round(e.clientY - cay.y) || Math.round(e.changedTouches[0].clientY - rect.y)
      this.line += 'M' + cursorX + ',' + cursorY
      this.cursor.style.opacity = 1
      this.gesture = true
      e.preventDefault()
    },
    handleMouseUp: function (e) {
      this.mouse.down = false;
      var c = document.getElementById("canvas");
      var ctx = c.getContext("2d");
      ctx.clearRect(0, 0, 800, 800);

      ////

      // let e = event;
      let rect = this.board.getBoundingClientRect();
      let cay = c.getBoundingClientRect();
      let cursorX = Math.round(e.clientX - cay.x) || Math.round(e.changedTouches[0].clientX - rect.x);
      let cursorY = Math.round(e.clientY - cay.y) || Math.round(e.changedTouches[0].clientY - rect.y);
      this.line += 'L' + cursorX + ',' + cursorY;
      // this.line += 'L'+(e.clientX||e.changedTouches[0].clientX)+','+(e.clientY||e.changedTouches[0].clientY)
      this.cursor.style.opacity = .5
      let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttributeNS(null, 'd', this.line);
      path.setAttributeNS(null, 'fill', 'none');
      path.setAttributeNS(null, 'stroke-linecap', 'round');
      path.setAttributeNS(null, 'stroke-linejoin', 'round');
      path.setAttributeNS(null, 'stroke', `#000`);
      path.setAttributeNS(null, 'stroke-width', this.width);
      this.board.appendChild(path);
      console.log('path = ' + path);
      // this.board.innerHTML = this.board.innerHTML // force SVG repaint after DOM change
      this.gesture = false;
      this.line = '';
    },
    handleMouseMove: function (event) {
      this.mouse.current = {
        x: event.pageX,
        y: event.pageY
      }
      this.draw(event)

      ///

      let e = event
      let rect = this.board.getBoundingClientRect();
      var c = document.getElementById("canvas");
      let cay = c.getBoundingClientRect();

      let cursorX = Math.round(e.clientX - cay.x) || Math.round(e.changedTouches[0].clientX - rect.x)
      let cursorY = Math.round(e.clientY - cay.y) || Math.round(e.changedTouches[0].clientY - rect.y)
      if (this.gesture == true) {
        this.line += 'L' + cursorX + ',' + cursorY
        // this.line += 'L'+(e.clientX||e.touches[0].clientX)+','+(e.clientY||e.touches[0].clientY)+' '
        // this.trace((e.clientX || e.touches[0].clientX), (e.clientY || e.touches[0].clientY))
      }
      this.cursor.style.top = e.clientY - cay.y - this.radius + 'px'
      this.cursor.style.left = e.clientX - cay.x - this.radius + 'px'
      this.cursorX = e.clientX - cay.x
      this.cursorY = e.clientY - cay.y
      this.onCanvas = true
    },


    //---------------

    initBoard: function () {
      this.board = $('.drawSvg')
      this.cursor = $('#cursor')
      this.gesture = false
    },
    linestart: function (e) {
      // this.undo = true;
      // this.line += 'M' + this.cursorX + ',' + this.cursorY 
      // I prefer to use code above with computed value, but it drops some errors about setter, and I didn't succeed to solve it in 15 minutes.
      let rect = this.board.getBoundingClientRect();
      let cursorX = Math.round(e.clientX - rect.x) || Math.round(e.changedTouches[0].clientX - rect.x)
      let cursorY = Math.round(e.clientY - rect.y) || Math.round(e.changedTouches[0].clientY - rect.y)
      this.line += 'M' + cursorX + ',' + cursorY
      this.cursor.style.opacity = 1
      this.gesture = true
      e.preventDefault()
    },

  },
  mounted: function () {

    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    ctx.translate(0.5, 0.5);
    ctx.imageSmoothingEnabled = false;
    // this.draw();
    // const socket = io();

    // socket.on('time', function (timeString) {
    //   console.log(timeString);
    // });

    socket.on('draw', function (data) {
      var c = document.getElementById("canvas");
      var ctx = c.getContext("2d");
      // ctx.clearRect(0, 0, 800, 800);
      // ctx.beginPath();
      // ctx.moveTo(data.start.x, data.start.y)
      ctx.lineTo(data.end.x, data.end.y);
      ctx.strokeStyle = "#F63E02";
      ctx.lineWidth = 2;
      ctx.stroke();
    });
    
    //----------

    this.initBoard()
  },

})