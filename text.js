// import io from 'socket.io-client'
// import io from './node_modules/socket.io/dist/client.js'

// const socket = io.connect('http://localhost:9999');
// console.log(socket);
// const socket = io();
// socket.on('get', data => {
//   console.log(data);
// });
let app = new Vue({
  el: '#square',
  data() {
    return {
      size: 100,
    }
  },
  methods: {
    zoom(e) {
      if (e.wheelDelta >= 120) {
        this.size += 10
      } else if (e.wheelDelta <= 120) {
        this.size -= 10
      }
    },
  },
  mounted() {

    // socket.on('time', function (timeString) {
    //   console.log(timeString);
    // });
    // console.log(socket);

  },
  watch: {
    // size() {
    //   socket.emit('sendObj', this.size);
    // }
  }
});
