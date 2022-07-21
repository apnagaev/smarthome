/** 
* @name Security  
* @desc  
* @version 4 
*/

const ACTOR5 = Device("ACTOR5", [
  {"name":"autosec", "note":"Автоматическая постановка", "type":"cb", "val":true},
  {"name":"secd", "note":"Постановка через, с", "type":"number", "val":300}
  ]);
const LAMP1 = Device("LAMP1");
const LAMP8 = Device("LAMP8");
const LAMP3 = Device("LAMP3");
const SENSOR1 = Device("SENSOR1");
const ACTOR6 = Device("ACTOR6");
const ACTOR7 = Device("ACTOR7");
const SENSOR2 = Device("SENSOR2");
const SENSOR3 = Device("SENSOR3");

startOnChange([ACTOR5]);

script({
  dur:0,
  start() {
    this.dur=ACTOR5.getParam("secd");
    
    if (ACTOR5.getParam("autosec") === false) {
      ACTOR5.off();
      this.exit();
    }
    
    if ((ACTOR5.isOff()) && (SENSOR1.isOn())) {
      this.assign(SENSOR1,"value",0);
      LAMP1.on();
      ACTOR6.setParam("value",0);
      this.info("telegram","security_telegram",`Квартира снята с охраны`);
      this.startTimer("T3",10,"onTimerT3");
    }
    if ((ACTOR5.isOn()) && (SENSOR1.isOff())) {
      this.addListener(ACTOR5,'ex');
      this.startTimer("T2",this.dur,"onTimerT2");
    }
  },
  onTimerT2() { 
    if ((ACTOR5.isOn()) && (SENSOR1.isOff())) {
     this.removeListener(ACTOR5,'ex');
     this.doAll({ type: '510' },"off");
     ACTOR7.off();
     ACTOR7.setParam("at", true);
     this.startTimer("T4",10,"onTimerT4");

}
  },
  onTimerT3() { 
     LAMP8.on();
     LAMP3.on();
  },
  onTimerT4() {
     this.assign(SENSOR1,"value",1);
     ACTOR5.setParam("autosec", true);
     this.info("telegram","security_telegram",`Квартира поставлена на охрану
     ${SENSOR2.name} ${SENSOR2.stateName}
     ${SENSOR3.name} ${SENSOR3.stateName}
     `);
  },
   ex()
  {
    this.exit();
  },
});
