var localStorageObject = {
    "Thu Oct 21 2021": { value: 10000 },
    "Thu Oct 21 2019": { value: 10000 }
  }
  
  var d = new Date(); //right now var today = new Date(d.getFullYear(), d.getMonth(), d.getDate()); //stripped of time data  dates = [today]; for(i = 1; i < 7; i++){     dates[i] = new 
  var dates = {};
  dates[d.toDateString()] = {date: d, value : 0};
  for (var i=0; i <= 5; i++ ) {
    
   d = new Date(d- (1000*60*60*24));
   dates[d.toDateString()] = {date: d, value : 0};
  }
  
  Object.keys(localStorageObject).forEach(key => {
    
    if (dates[key]) {
      dates[key].value = localStorageObject[key].value;
    } else {
      dates[key] = localStorageObject[key];
    }
  });
  
  console.log(dates);