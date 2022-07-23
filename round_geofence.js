/** 
* @name phone_location 
* @desc  
* @version 4 
*/
const latitude = Device("SENSORA73"); 
const longitude = Device("SENSORA74"); 


script({
      start() {
    {
      var dom=[55.000,37.000,37.2];
      var dvor=[55.000,37.000,108.6];
      var lam=[55.000,37.000,29.2];
      var school=[55.000,37.000,54.5];
      var temp=0;
      var accurat=accuracy.value;
      
        
      temp=calcCrow(dom[0],dom[1],latitude.value,longitude.value);
      this.log (accurat);
        if (dom[2]-temp+accurat>0) {
        this.log(dom[2]-temp+accurat);
        this.log('дома');
        this.assign(loc, 'aval', 'Дома');
      }
      temp=calcCrow(dvor[0],dvor[1],latitude.value,longitude.value);
      this.log (temp);
        if (dvor[2]-temp+accurat>0) {
        this.log(dvor[2]-temp+accurat);
        this.log('двоп');
        this.assign(loc, 'aval', 'Во дворе');
      }
      temp=calcCrow(lam[0],lam[1],latitude.value,longitude.value);
      this.log (temp);
        if (lam[2]-temp+accurat>0) {
        this.log(lam[2]-temp+accurat);
        this.log('бабушка');
        this.assign(loc, 'aval', 'У бабушки');
      }
      temp=calcCrow(school[0],school[1],latitude.value,longitude.value);
      this.log (temp);
        if (school[2]-temp+accurat>0) {
        this.log(school[2]-temp+accurat);
        this.log('школа');
        this.assign(loc, 'aval', 'В школе');
      }
      
      
      
      
    }

    // Converts numeric degrees to radians
    function calcCrow(lat1, lon1, lat2, lon2) 
    {
      var R = 6371302; // m
      var dLat = toRad(lat2-lat1);
      var dLon = toRad(lon2-lon1);
      lat1 = toRad(lat1);
      lat2 = toRad(lat2);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c;
      return d;
    }

    // Converts numeric degrees to radians
    function toRad(Value) 
    {
        return Value * Math.PI / 180;
    }
    },

});
