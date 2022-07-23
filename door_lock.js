/** 
* @name DverZamok  
* @desc  
* @version 4 
*/

const SENSOR3 = Device("SENSOR3");//Положение замка off-открыто on-закрыто
const SENSOR2 = Device("SENSOR2");//Положение двери off-открыто on-закрыто
const ACTOR7 = Device("ACTOR7",[ 
  {"name":"at", "note":"Автоматически запирать", "type":"cb", "val":true},
  {"name":"dur", "note":"Автоматически запирать через с", "type":"number", "val":180}
  ]); //Кнопка открыть дверь off-закрыто on-открыто


startOnChange([SENSOR3,SENSOR2]);

script({
  d:0,
  start() {
    this.d=ACTOR7.getParam("dur");
    //
      if (SENSOR3.isOff())  {
      ACTOR7.on();
      this.addListener(SENSOR3,'dver');
   //   this.addListener(ACTOR7,'ACTOR7');
      this.startTimer("T1",this.d,"onTimerT1");
    }
    
    //  if ((ACTOR7.isOn()) && (ACTOR7.getParam("at") === true))  {
   //   this.addListener(ACTOR7,'ACTOR7');
     // this.startTimer("T2",d,"onTimerT2");
  //  }
  
  },
  dver()
  {
    this.exit();
  },
//    ACTOR7()
//  {
//    this.exit();
//  },
  onTimerT1() { 
    if ((SENSOR3.isOff()) && (ACTOR7.getParam("at") === true)) {
      ACTOR7.off();
    }
  },
//  onTimerT2() { 
//     if ((ACTOR7.isOn()) && (ACTOR7.getParam("at") === true))  {
//      ACTOR7.off();
//     }
//  }
});
