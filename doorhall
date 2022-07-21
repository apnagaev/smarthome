/** 
* @name doorhall 
* @desc  
* @version 4 
*/

const SWITCH1 = Device("SWITCH1");
const SENSOR38 = Device("SENSOR38");

startOnChange([SWITCH1,SENSOR38]);

script({
  dur:0,
  start() {
    if (SWITCH1.getParam("blockout") === true) {
      return false;
    }
    this.dur = SWITCH1.getParam("tm");
    if (SWITCH1.isOff()) {
      this.startTimer("T1",this.dur,"onTimerT1");
    }
    if (SENSOR38.isOn() && SWITCH1.isOn()) {
      SWITCH1.off();
      this.startTimer("T2",this.dur,"onTimerT2");
    }
  },
  onTimerT1() { 
     SWITCH1.on();
  },
  onTimerT2() { 
     SWITCH1.on();
  }
});
