/** 
* @name VityazkaKuhnay 
* @desc  
* @version 4 
*/


const speed1 = Device("VENT4"); //Вытяжка скорость 1
const speed2 = Device("VENT5"); //Вытяжка скорость 2
const speed3 = Device("VENT6"); //Вытяжка скорость 3
const vsw = Device("SENSORA14"); //Виртуальное устройство управлеиния

//Запуск скрипта по изменению устройства управления
startOnChange(vsw); 

script({
    start() {
     if (vsw.setpoint === 1){ //Если уставка =1
       this.assign(vsw, 'aval', 1); //Присваиваем устройству значение 1
        speed2.off(); //Выключаем скорость 2
        speed3.off(); //Выключаем скорость 3
        speed1.on(); //Включаем скорость 1
        return false; //Завершаем сценарий
      }
    if (vsw.setpoint === 2){ //Если уставка =2
      this.assign(vsw, 'aval', 2); //Присваиваем устройству значение 2
        speed1.off(); //Выключаем скорость 1
        speed3.off(); //Выключаем скорость 3
        speed2.on(); //Включаем скорость 2
        return false; //Завершаем сценарий
      }
  if (vsw.setpoint === 3){ //Если уставка =3
    this.assign(vsw, 'aval', 3); //Присваиваем устройству значение 3
        speed1.off(); //Выключаем скорость 1
        speed2.off(); //Выключаем скорость 2
        speed3.on(); //Включаем скорость 3
        return false; //Завершаем сценарий
      }
   if (vsw.setpoint === 0){ //Если уставка =0
     this.assign(vsw, 'aval', 0); //Присваиваем устройству значение 3
        speed1.off(); //Выключаем скорость 1
        speed2.off(); //Выключаем скорость 2
        speed3.off(); //Выключаем скорость 3
        return false; //Завершаем сценарий
      }
    }
});
