<template>
  <div id="app">
    <button @click="send">send</button>
    </div>
</template>

<script>

export default {
  name: "App",
  data(){
    return{
      val:123
    }
  },
  sockets: {
    connect: function () {
      console.log("socket connected");
    },
    customEmit: function () {
      console.log(
        'this method was fired by the socket server. eg: io.emit("customEmit", data)'
      )
    },
    send(data){
      console.log(data);
    }
  },
  methods: {
    send(){
       this.$socket.emit('send', this.val);
    }
  },
};
</script>

<style>
</style>
