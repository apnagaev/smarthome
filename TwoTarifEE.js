/** 
* @name TwoTarifEE 
* @desc
* @version 4 
*/
const meterDay = Device("METER6", "Стоимость кВт", [ 
  {"name":"rkvt", "note":"Стоимость за кВт", "type":"number", "val":4.47} 
  ]); //Счетчик дневных показаний //Тариф день
const meterNight = Device("METER5", "Стоимость кВт", [ 
  {"name":"rkvt", "note":"Стоимость за кВт", "type":"number", "val":1.68} 
  ]);  //Счетчик ночных показаний //Тариф ночь
const meteree = Device("SENSORA6"); //Подсчет потраченной электроэнергии в месяц в рублях
const metereekvm = Device("SENSORA7"); //Электроэнергия за месяц в киловаттах
const metereedkvm = Device("SENSORA44"); //Дневной расход за месяц в киловаттах
const metereenkvt = Device("SENSORA45"); //Ночной расход за месяц в киловаттах
const curkvts = Device("SENSORA2", [ 
  {"name":"pre", "note":"Предыдущее показание", "type":"Number", "val":0}, 
  {"name":"dif", "note":"Разница", "type":"Number", "val":0} 
  ]); //"Мгновенный" расход //Предыдущее значение счетчика //Разница между текущим и предыдущим значением
const impl = Device("SENSORA58"); //Текущее показание счетчика

startOnChange(impl);

script({
    Weight:0.0002, // Объявляем вес импульса счетчика в киловаттах. Его можно узнать в документации к счетчику
    time:10,//Период запуска сниппета
    dif:0,
    eesum:0,
    eekvmsum:0,
    eedkvmsum:0,
    eenkvtsum:0,
    curkvtnow:0,
      start() {
        this.dif = impl.value - curkvts.getParam("pre"); //Считаем разницу между запусками
       // this.log(global.get(3));
        this.log(impl.value);
      
      if (this.dif<0) { //Если разница отрицательная
         this.log("отрицательный dif");
         this.dif = impl.value - curkvts.getParam("pre")+65536; //Считаем разницу с учетом круга
       }
       
      if (this.dif>150) { //MegaD был сброшен, расход >10.8квт
       //if (global.get(3) === '00:00:0') { //  MegaD был сброшен
          this.log("megad был сброшен");
          this.dif = impl.value; //Считаем по предыдущему значению
      }
      
      curkvts.setParam("dif", this.dif); //Присваиваем значение параметру "dif"
      curkvts.setParam("pre", impl.value); //Присваиваем значение в предыдущее значение
      
      this.curkvtnow=this.dif*(60/this.time)*60*this.Weight; //Расчет текущей нагрузки
      this.curkvtnow.toFixed(3); //Округление до 3го знака после запятой
      this.assign(curkvts, 'aval', this.curkvtnow); //Присваиваем текушую нагрузку датчику

        const dt = new Date(); //объявляем текущую дату и время
        if (dt.getHours() < 7 || dt.getHours()>=23) {  // Выполняется c 23:00 - 7:00 ночной тариф 
          this.assign(meterNight, 'aval', meterNight.value+this.Weight*this.dif); //Увеличиваем счетчик на вес_импульса*кол-во_имульсов
        } else { //Выполняется c 07:00 - 23:00 дневной тариф 
          this.assign(meterDay, 'aval', meterDay.value+this.Weight*this.dif); //Увеличиваем счетчик на вес_импульса*кол-во_имульсов
        }  
        this.eesum =(meterDay.value - meterDay.getParam("fd"))*meterDay.getParam("rkvt") + (meterNight.value - meterNight.getParam("fd"))*meterNight.getParam("rkvt"); //Считаем электроэнергию за месяц в рублях.
        this.eekvmsum = meterDay.value - meterDay.getParam("fd") + meterNight.value - meterNight.getParam("fd"); //Считаем расход электроэнергии за месяц в киловаттах
        this.eedkvmsum =  meterDay.value - meterDay.getParam("fd"); //Считаем расход в киловаттах в текущем месяце днем
        this.eenkvtsum = meterNight.value - meterNight.getParam("fd"); //и ночью
        
        //Присваиваем счетчикам значения округленных переменных
        this.assign(meteree, 'aval', this.eesum.toFixed(2));
        this.assign(metereekvm, 'aval',  this.eekvmsum.toFixed(2));
        this.assign(metereedkvm, 'aval', this.eedkvmsum.toFixed(2));
        this.assign(metereenkvt, 'aval', this.eenkvtsum.toFixed(2));
        }
});
