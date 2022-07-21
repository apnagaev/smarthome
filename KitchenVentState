/** 
* @name KitchenVentState 
* @desc  
* @version 4  
*/


const speed1 = Device("SENSOR4"); //Датчик скорости 1
const speed2 = Device("SENSOR5"); //Датчик скорости 2
const speed3 = Device("SENSOR6"); //Датчик скорости 3
const vsw = Device("SENSORA14"); //Виртуальное устройство вытяжки

startOnChange([speed1,speed2,speed3]); 

script({
    start() {
     if (speed1.isOn()) { //При срабатывании скорости 1
       this.assign(vsw, 'aval', 1); //Присваиваем устройству значение 1
       vsw.setParam("setpoint",1); //И значение 1 для уставки
       vsw.setParam("man", true);
      return false; //Завершаем сценарий
      }
    if (speed2.isOn()) { //Присваиваем устройству значение 2
       this.assign(vsw, 'aval', 2); //Присваиваем устройству значение 2
       vsw.setParam("setpoint",2); //И значение 2 для уставки
       vsw.setParam("man", true);
      return false; //Завершаем сценарий
      }
    if (speed3.isOn()) { //Присваиваем устройству значение 3
      this.assign(vsw, 'aval', 3); //Присваиваем устройству значение 3
      vsw.setParam("setpoint",3); //И значение 3 для уставки
      vsw.setParam("man", true);
      return false; //Завершаем сценарий
      }
    if ((speed1.isOff()) && speed2.isOff() && (speed3.isOff())) { //Когда все датчики отключены
      this.assign(vsw, 'aval', 0); //Присваиваем устройству значение 0
      vsw.setParam("setpoint",0); //И значение 0 для уставки
      vsw.setParam("man", false);
      vsw.setParam("AR", true);
      return false; //Завершаем сценарий
      }
    } 
});
