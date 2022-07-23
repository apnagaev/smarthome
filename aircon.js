/** 
* @name aircon 
* @desc  
* @version 4 
*/


const mode = Device("STEMP15",[
    {"name":"control", "note":"Управление с умного дома V", "type":"cb", "val": true},
    {"name":"q1", "note":"Режимы работы", "type":"text", "val":""},
    {"name":"q2", "note":"Выключено - 0", "type":"text", "val":"0"},
    {"name":"q3", "note":"Охлаждение - 1", "type":"text", "val":1},
    {"name":"q4", "note":"Обогрев - 2", "type":"text", "val":"2"},
    {"name":"q5", "note":"Осушение - 3", "type":"text", "val":"3"},
    {"name":"q6", "note":"Вентилятор - 4", "type":"text", "val":"4"},
    {"name":"q7", "note":"Автоматически - 5", "type":"text", "val":"5"},
    {"name":"lsp", "note":"lsp", "type":"text", "val":""}
      ]);

const speed = Device("STEMP16",[
    {"name":"q1", "note":"Режимы работы", "type":"text", "val":""},
    {"name":"q2", "note":"Слабо - 0", "type":"text", "val":"0"},
    {"name":"q3", "note":"Слабо - 1", "type":"text", "val":1},
    {"name":"q4", "note":"Средне - 2", "type":"text", "val":"2"},
    {"name":"q5", "note":"Сильно - 3", "type":"text", "val":"3"},
    {"name":"q6", "note":"Сильно - 4", "type":"text", "val":"4"},
    {"name":"q7", "note":"Автоматически - 5", "type":"text", "val":"5"},
    {"name":"last", "note":"last", "type":"text", "val":""},
    {"name":"lsp", "note":"lsp", "type":"text", "val":""}
      ]);
      
const temp = Device("STEMP17",[
    {"name":"last", "note":"last", "type":"text", "val":""},
    {"name":"lsp", "note":"lsp", "type":"text", "val":""}
      ]);  
      
      
      
const s44 = Device("SENSOR44",[
    {"name":"last", "note":"last", "type":"text", "val":""}
      ]);  
const s45 = Device("SENSOR45",[
    {"name":"last", "note":"last", "type":"text", "val":""}
      ]);  
const s46 = Device("SENSOR46",[
    {"name":"last", "note":"last", "type":"text", "val":""}
      ]);  
const s47 = Device("SENSOR47",[
    {"name":"last", "note":"last", "type":"text", "val":""}
      ]);  
const s48 = Device("SENSOR48",[
    {"name":"last", "note":"last", "type":"text", "val":""}
      ]);  


startOnChange([mode,speed,temp]);

script({
    start() {
      if (mode.getParam("control") === false){ ///Выйти если выбрано управление с приложения
        return false;
      }
      //this.log(mode.setpoint);
      //this.log(mode.value);
      //this.log(temp.setpoint);
      //this.log(temp.value);
      //this.log(speed.setpoint);
      //this.log(speed.value);
      
 //startOnChange([mode,speed,temp], (speed.setpoint !== (speed.getParam("lsp")) || (temp.setpoint !== temp.getParam("lsp")) || (mode.setpoint !== mode.getParam("lsp"))));     
      
/////////////////////Включение
    if (mode.setpoint == 'f0'){ ////не равно
      this.log('mode=on');
      this.assign(speed, 'aval', speed.getParam("last"));
      this.assign(temp, 'aval', temp.getParam("last"));
      this.assign(s44, 'dval', s44.getParam("last"));
      this.assign(s45, 'dval', s45.getParam("last"));
      this.assign(s46, 'dval', s46.getParam("last"));
      this.assign(s47, 'dval', s47.getParam("last"));
      this.assign(s48, 'dval', s48.getParam("last"));
    }
    /////////////////выключенное состояние
    if (mode.setpoint == 'f0'){
      this.log('mode=off');
      speed.setParam("last",speed.value);
      this.assign(speed, 'aval', '.');
      temp.setParam("last",temp.value);
      this.assign(temp, 'aval', '.');
      s44.setParam("last",s44.value);
      this.assign(s44, 'dval', 0);
      s45.setParam("last",s45.value);
      this.assign(s45, 'dval', 0);
      s46.setParam("last",s46.value);
      this.assign(s46, 'dval', 0);
      s47.setParam("last",s47.value);
      this.assign(s47, 'dval', 0);
      s48.setParam("last",s48.value);
      this.assign(s48, 'dval', 0);
    }



//
/////////////////Изменение из умного дома
   //this.log('Изменение из умного дома');
   /////////////Режим работы
    if ((mode.setpoint == '0') && (mode.value !== 'off') && (mode.setpoint !== mode.getParam('lsp'))){
      this.plugincCommand({unit:"mqttclient3", command:'publish', data:{topic:'/aircon/780f7724d300/mode_homeassistant/set', message:'off'}});
    }
    if ((mode.setpoint == '1') && (mode.value !== 'cool') && (mode.setpoint !== mode.getParam('lsp'))){
      this.plugincCommand({unit:"mqttclient3", command:'publish', data:{topic:'/aircon/780f7724d300/mode_homeassistant/set', message:'cool'}});
    }
    if ((mode.setpoint == '2') && (mode.value !== 'heat') && (mode.setpoint !== mode.getParam('lsp'))){
      this.plugincCommand({unit:"mqttclient3", command:'publish', data:{topic:'/aircon/780f7724d300/mode_homeassistant/set', message:'heat'}});
    }
    if ((mode.setpoint == '3') && (mode.value !== 'dry') && (mode.setpoint !== mode.getParam('lsp'))){
      this.plugincCommand({unit:"mqttclient3", command:'publish', data:{topic:'/aircon/780f7724d300/mode_homeassistant/set', message:'dry'}});
    }
    if ((mode.setpoint == '4') && (mode.value !== 'fan_only') && (mode.setpoint !== mode.getParam('lsp'))){
      this.plugincCommand({unit:"mqttclient3", command:'publish', data:{topic:'/aircon/780f7724d300/mode_homeassistant/set', message:'fan_only'}});
    }
    if ((mode.setpoint == '5') && (mode.value !== 'auto') && (mode.setpoint !== mode.getParam('lsp'))){
      this.plugincCommand({unit:"mqttclient3", command:'publish', data:{topic:'/aircon/780f7724d300/mode_homeassistant/set', message:'auto'}});
    }

/////////////////Температура
  let tmp=temp.setpoint+'';
    if ((temp.setpoint !== temp.value) && (temp.setpoint !== temp.getParam('lsp'))){
      this.plugincCommand({unit:"mqttclient3", command:'publish', data:{topic:'/aircon/780f7724d300/temp/set', message: tmp}});
    }

/////////////////Скорость
    if ((speed.setpoint == '0') && (speed.value !== 'Low') && (speed.setpoint !== speed.getParam('lsp'))){
      this.plugincCommand({unit:"mqttclient3", command:'publish', data:{topic:'/aircon/780f7724d300/fanspeed/set', message:'low'}});
      //this.plugincCommand({unit:"mqttclient3", command:'publish', data:{topic:'/aircon/780f7724d300/fanspeed/set', message:'low'}});
    }  
    if ((speed.setpoint == '1') && (speed.value !== 'Low') && (speed.setpoint !== speed.getParam('lsp'))){
      this.plugincCommand({unit:"mqttclient3", command:'publish', data:{topic:'/aircon/780f7724d300/fanspeed/set', message:'low'}});
    }     
    if ((speed.setpoint == '2') && (speed.value !== 'Medium') && (speed.setpoint !== speed.getParam('lsp'))){
      this.plugincCommand({unit:"mqttclient3", command:'publish', data:{topic:'/aircon/780f7724d300/fanspeed/set', message:'medium'}});
    } 
    if ((speed.setpoint == '3') && (speed.value !== 'High') && (speed.setpoint !== speed.getParam('lsp'))){
      this.plugincCommand({unit:"mqttclient3", command:'publish', data:{topic:'/aircon/780f7724d300/fanspeed/set', message:'high'}});
    } 
    if ((speed.setpoint == '4') && (speed.value !== 'High') && (speed.setpoint !== speed.getParam('lsp'))){
      this.plugincCommand({unit:"mqttclient3", command:'publish', data:{topic:'/aircon/780f7724d300/fanspeed/set', message:'high'}});
    } 
    if ((speed.setpoint == '5') && (speed.value !== 'Auto') && (speed.setpoint !== speed.getParam('lsp'))){
      this.plugincCommand({unit:"mqttclient3", command:'publish', data:{topic:'/aircon/780f7724d300/fanspeed/set', message:'auto'}});
    }


    mode.setParam("lsp", mode.setpoint);
    temp.setParam("lsp", temp.setpoint);
    speed.setParam("lsp", speed.setpoint);
    } 
});
