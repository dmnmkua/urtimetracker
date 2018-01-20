let timer = new Vue({
  el: "#timers",
  data: {
    inputTitle: "",
    arrTimers: [],
    startIcon: '<i class="material-icons">play_arrow</i>',
    stopIcon: '<i class="material-icons">play_arrow</i>',
    id: 0,
  },
  methods: {
    addTimer(title) {
      let objTimer = {
        'title': title || 'timer',
        'count': 0,
        'screenTime': `0 : 00 : 00`,
        'stopTime': true,
        'name': 'play_arrow',
        'intervalId': '',
      }
      this.arrTimers.push(objTimer);
      this.inputTitle = '';
    },
    start(timer) {
      timer.stopTime = !timer.stopTime;
      if(timer.stopTime) {
        clearInterval(timer.intervalId);
      }
      else {
        timer.intervalId = setInterval(() => {
          timer.count++;
          let sec = timer.count % 60;
          if(sec < 10) {
            sec = '0' + sec;
          }
          let min = Math.floor(timer.count / 60);
          if(min < 10) {
            min = '0' + min;
          }
          let hour = Math.floor(timer.count / 3600);
          timer.screenTime = `${hour} : ${min} : ${sec}`;
        }, 1000);
      }
    },
    del(index) {
      clearInterval(timer.intervalId);
      this.arrTimers.splice(index, 1);
    }
  }
})
