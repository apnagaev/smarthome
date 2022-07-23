/** 
* @name TempVentK 
* @desc  
* @version 4 
*/

const tempk = Device("STEMP4"); //Температура на кухне
const tempv = Device("STEMP1"); //Температура в камере вытяжки
const speed = Device("SENSORA14", "Скорость", [
  {"name":"AR", "note":"Автоматический режим", "type":"cb", "val":true},
  {"name":"s2", "note":"Разница между 1 и 2 скоростями", "type":"number", "val":1},
  {"name":"s3", "note":"Разница между 2 и 3 скоростями", "type":"number", "val":2},
  {"name":"man", "note":"Скорость выбрана вручную", "type":"CB", "val":false}
  ]); //Управление скоростью мотора втяжки
const pwr = Device("SENSORA2"); //Текущая электрическая нагрузка
const sensor4 = Device("SENSOR4"); //Датчик переключателя 1ой скорости вентилятора
const sensor5 = Device("SENSOR5"); //Датчик переключателя 2ой скорости вентилятора
const sensor6 = Device("SENSOR6"); //Датчик переключателя 3ей скорости вентилятора
const SENSOR1 = Device("SENSOR1");  //Актуатор постановки на охрану
const RADIATOR1 = Device("RADIATOR1");

//Сценарий выполняется при изменении температуры в камере вытяжки
startOnChange([tempv]); 

script({
    dif:0,
    s2:0,
    s3:0,
    ssa:0,
    sp:0,
    rad1:0,
    start() {
        
        this.dif = tempv.value - tempk.value; //Считаем разницу между температурой вытяжки и кухни
        this.log("DIF start");
        this.log(this.dif);
        this.s2=speed.getParam("s2"); //Константа разныцы температур между 1 и 2 скоростями
        this.s3=speed.getParam("s3"); //Константа разницы температур межды 1 и 3 скоростями
        if (RADIATOR1.isOn()) {this.rad1 = 2}
      if (SENSOR1.isOn()){ //Квартира на охране. Не включаем вытяжку
          this.ssa=speed.value - 1; //Вводим переменную для плавного понижения скорости
            speed.setParam("AR", 1);
            speed.setParam("man", false);
          if (this.ssa<= 0) {
            this.ssa=0;
          }
             this.assign(speed, 'aval', this.ssa); //Выключаем вытяжку
              speed.setParam("setpoint", this.ssa); //Отображаем отключение
               this.log('выход из сценария квартира на охране');
               return false;  //Завершение сценария
             }
    
      if (speed.getParam("man") === true){ //Скорость выбрана вручную. отключаем автоматический режим
      speed.setParam("AR", 0);
       this.log('выход из сценария скорость выбрана вручную');
        return false;  //Завершение сценария
      }
             
      
     if (speed.getParam("AR") === "false"){
        this.log('выход из сценария нет галки автоматический режим');
       return false;  //Завершение сценария
     }
      if (pwr.value-this.rad1>0.9){ //Нагрузка > 0,7кВт
        tempv.setParam("setpoint",2); //Разница межды 0 и 1 скоростью 2 градуса
      }
      if (pwr.value-this.rad1>=1.2){ //Нагрузка >= 1кВт
        tempv.setParam("setpoint",1.5); //Разница межды 0 и 1 скоростью 1,5 градуса
      }
      if (pwr.value-this.rad1>=2.2){ //Нагрузка >= 2кВт
        tempv.setParam("setpoint",1); //Разница межды 0 и 1 скоростью 1 градус
      }
      if (pwr.value-this.rad1<=0.9){ //Нагрузка до 0,7кВт
        tempv.setParam("setpoint",3); //Разница межды 0 и 1 скоростью 3 градуса
      }
        if ((this.dif >= this.s3+tempv.setpoint) && (speed.value === 2)){ //Если разница между температурами больше суммы s3 и уставки
                                               //а скорость равна 2
      this.startTimer("T3",10,"onTimerT3"); //Сохраняется 10 секунд, то запускам таймер T3
      this.startTimer("T30",30,"onTimerT30"); //Пауза 10 секунд
      return false; //Завершение сценария
        }
        if ((this.dif >= this.s2+tempv.setpoint) && (speed.value === 1)){ //Если разница между температурами больше суммы s2 и уставки
                                                //а скорость равна 1
      this.startTimer("T2",10,"onTimerT2"); //Сохраняется 10 секунд, то запускам таймер T2
      this.startTimer("T20",30,"onTimerT20"); //Пауза 10 секунд
      return false; //Завершение сценария
        }
        if ((this.dif >= tempv.setpoint) && (speed.value ===0)){ //Если разница между температурами больше уставки
                                               //а скорость равна 0
      this.startTimer("T1",10,"onTimerT1"); //Сохраняется 10 секунд, то запускам таймер T1
      this.startTimer("T10",30,"onTimerT10"); //Пауза 10 секунд
      return false; //Завершение сценария
        }
        if ((this.dif < tempv.setpoint) && (speed.setpoint > 0)){ //Если разница между температурами меньше уставки и вытяжка включена
      this.startTimer("T0",15,"onTimerT0"); //На протяжении 10 секунд, то запускам таймер T0
      return false; //Завершение сценария
        }
      if ((this.dif < tempv.setpoint) && (speed.setpoint === 0)){ //Если разница температур меньше уставки и вытяжка выключена
      this.log("соблюдены условия выхода без изменений");
      return false; //Завершение сценария
        }
        this.log('завершаем сценарий не сработал ни один if');
    }, 
      onTimerT10() { //Заглушка для паузы 10с
  }, 
      onTimerT20() { //Заглушка для паузы 10с
  }, 
      onTimerT30() { //Заглушка для паузы 10с
  }, 
      onTimerT3() { //Запуск процедуры T3
      this.log("запущен Т3");
        if (this.dif >= this.s3+tempv.setpoint){ //Если разница между температурами больше суммы s3 и уставки
         this.assign(speed, 'aval', 3); //Запускаем скорость 3
         speed.setParam("setpoint",3); //Отображаем скорость 3
        }
  },
      onTimerT2() {  //Запуск процедуры T2
        if (this.dif >= this.s2+tempv.setpoint){ //Если разница между температурами больше суммы s2 и уставки
         this.assign(speed, 'aval', 2); //Запускаем скорость 2
         speed.setParam("setpoint",2); //Отображаем скорость 2
        }
  },
      onTimerT1() {  //Запуск процедуры T1
        if (this.dif >= tempv.setpoint){ //Если разница между температурами больше уставки
         this.assign(speed, 'aval', 1); //Запускаем скорость 1
         speed.setParam("setpoint",1); //Отображаем скорость 1
        }
  },
      onTimerT0() {  //Запуск процедуры T0
    //  dif = tempv.value - tempk.value; //Считаем разницу между температурой вытяжки и кухни повторно. dif считается неверно
        this.log("t0 started");
        this.log("tempv.value");
        this.log(tempv.value);
        this.log("tempk.value");
        this.log(tempk.value);
        this.log("DIF finish");
        this.log(this.dif);//14
        if ((this.dif < tempv.setpoint) && (speed.setpoint > 0)){ //Если разница между температурами меньше уставки и вытяжка включена
        this.sp=speed.value - 1; //Вводим переменную для плавного понижения скорости
          if (this.sp<= 0) {
            this.sp = 0;
          }
          this.log(this.sp);
         this.assign(speed, 'aval', this.sp); //Выключаем вытяжку
         speed.setParam("setpoint", this.sp); //Отображаем отключение
        }
  },
});
