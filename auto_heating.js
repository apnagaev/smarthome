/** 
* @name BalkHeat 
* @desc  
* @version 4 
*/

const STEMP10 = Device("STEMP10","Port", "byte",[
      {"name":"work", "note":"Поддерживать автоматически", "type":"cb", "val":0},
      {"name":"temp", "note":"Поддерживать температуру", "type":"number", "val":23},
      {"name":"gist", "note":"Гистерезис", "type":"number", "val":3}
         ]);  
const RADIATOR1 = Device("RADIATOR1"); 

startOnChange(STEMP10); 

script({
  dif:0,
    start() {
      this.log(STEMP10.getParam("work"));
       if (STEMP10.getParam("work") !== true) 
          {
            return false;
          }
       
       this.dif=STEMP10.getParam("temp")-STEMP10.value;
       
       if (STEMP10.value < (STEMP10.getParam("temp")-STEMP10.getParam("gist")) && (RADIATOR1.isOff())){
            this.log("r1on");
            RADIATOR1.on();
          }
          
       if (STEMP10.value >= (STEMP10.getParam("temp")+STEMP10.getParam("gist")) && (RADIATOR1.isOn())){
            this.log("r1off");
            RADIATOR1.off();
          }

    } 
});
