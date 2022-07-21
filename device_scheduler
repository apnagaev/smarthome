/** 
* @name Schedul
* @desc  
* @version 4 
*/
const dv = Device ("ActorD","dv",[
    {"name":"ston", "note":"Включить", "type":"cb", "val":true},
    {"name":"ton", "note":"Время включения", "type":"time", "val":0},
    {"name":"stof", "note":"Выключить", "type":"cb", "val":true},
    {"name":"toff", "note":"Время выключения", "type":"time", "val":0},
    {"name":"mon", "note":"Понедельник", "type":"cb", "val":true},
    {"name":"tue", "note":"Вторник", "type":"cb", "val":true},  
    {"name":"wen", "note":"Среда", "type":"cb", "val":true},
    {"name":"thu", "note":"Четверг", "type":"cb", "val":true},
    {"name":"fri", "note":"Пятница", "type":"cb", "val":true},
    {"name":"sat", "note":"Суббота", "type":"cb", "val":false},
    {"name":"san", "note":"Воскресенье", "type":"cb", "val":false},
    {"name":"onras", "note":"Включить на рассвете", "type":"cb", "val":false},
    {"name":"onrasm", "note":"смещение мин", "type":"number", "val":0},
    {"name":"onzak", "note":"Включить на закате", "type":"cb", "val":false},
    {"name":"onzakm", "note":"смещение мин", "type":"number", "val":0},
    {"name":"offras", "note":"Выключить на рассвете", "type":"cb", "val":false},
    {"name":"offrasm", "note":"смещение мин", "type":"number", "val":0},
    {"name":"offzak", "note":"Выключить на закате", "type":"cb", "val":false},
    {"name":"offzakm", "note":"смещение мин", "type":"number", "val":0}
  ]);
const pulse = Device ("SensorD");

startOnChange([pulse]);

script({
  tm:0,
  wd:0,
  tmin:0,
  alminon:0,
  alminoff:0,

  start() {




    const days = [dv.getParam("san"),dv.getParam("mon"),dv.getParam("tue"),dv.getParam("wen"),dv.getParam("thu"),dv.getParam("fri"),dv.getParam("sat")];
    const dtf = new Date();
    this.wd = dtf.getDay();
    this.tmin = dtf.getHours()*60+dtf.getMinutes();
    this.alminon = dv.getParam('ton')/60;
    this.alminoff = dv.getParam('toff')/60;

this.log(days[this.wd]);
this.log(this.tmin);
this.log(this.alminon);
this.log(dv.getParam("ston"));

       if ((days[this.wd] === true) && (this.tmin === this.alminon) && (dv.getParam("ston") === true)){
        dv.on();
        this.log("on");
       }
        if ((days[this.wd] === true) && (this.tmin === this.alminoff) && (dv.getParam("stof") === true)){
        dv.off();
        this.log("off");
       }
    const milsec = new Date().getTime()+3600*3;
    const suse = this.getSysTime('sunset');
    const suri = this.getSysTime('sunrise');

    
       if ((dv.getParam("onras") === true) && ((suri-milsec+dv.getParam("onrasm")*60*1000) <= 50000) && ((suri-milsec+dv.getParam("onrasm")*60*1000) > 0)){
         dv.on();
       }
       if ((dv.getParam("onzak") === true) && ((suse-milsec+dv.getParam("onzakm")*60*1000) <= 50000) &&((suse-milsec+dv.getParam("onzakm")*60*1000) > 0)){
         dv.on();
       }
        if ((dv.getParam("offras") === true) && ((suri-milsec+dv.getParam("offrasm")*60*1000) <= 50000) && ((suri-milsec+dv.getParam("offrasm")*60*1000) > 0)){
         dv.off();
       }
        if ((dv.getParam("offzak") === true) && ((suse-milsec+dv.getParam("offzakm")*60*1000) <= 50000) && ((suse-milsec+dv.getParam("offzakm")*60*1000) >0)){
         dv.off();
       }
    } 
});
