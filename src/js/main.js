let getLocalStorage = JSON.parse(localStorage.getItem('arrTimers')) || [];

for(let i = 0; i < getLocalStorage.length; i++) {
  getLocalStorage[i].stopTime = 'true';
}

let mainData = {
  inputTitle: "",
  arrTimers: getLocalStorage || [],
  id: localStorage.getItem('id') || 0,
}

let timer = new Vue({
  el: "#timers",
  data: mainData,
  methods: {
    addTimer(title) {
      let objTimer = {
        'title': title || 'timer',
        'count': 0,
        'screenTime': `0 : 00 : 00`,
        'stopTime': true,
        'name': 'play_arrow',
        'intervalId': '',
        'id': this.id,
      }
      this.arrTimers.push(objTimer);
      this.inputTitle = '';
      this.id++;
      // console.log(timer);
      this.setLocal();
    },
    start(timer) {
      timer.stopTime = !timer.stopTime;
      if(timer.stopTime) {
        this.setLocal();
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
          this.setLocal();
        }, 1000);
      }
    },
    del(index) {
      clearInterval(timer.intervalId);
      this.arrTimers.splice(index, 1);
      this.setLocal();
    },
    setLocal() {
      localStorage.setItem('arrTimers' , JSON.stringify(this.arrTimers));
      localStorage.setItem('id' , this.id);
    },
  }
})
