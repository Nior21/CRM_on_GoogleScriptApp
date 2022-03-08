/**
 * const date1 = new Date('December 17, 1995 03:24:00');
 * const date2 = new Date('1995-12-17T03:24:00');
 * 
 * 17.01.2022 14:41:16
 * 
 * Mon Jan 17 14:41:16 GMT+03:00 2022
 * 
 * "yyyy-MM-dd'T'HH:mm:ss'Z'"
 * 
  new Date();
  new Date(value);
  new Date(dateString);
  new Date(year, month[, day[, hour[, minute[, second[, millisecond]]]]]);
  */
function formatDate(dateString) {
  
  //Logger.log('in: ' + dateString);

  let timeZone = Session.getScriptTimeZone(); //Logger.log(timeZone)
  let formattedDate = '';
  let d;
  
  // Нужно распарсить чтобы наверняка и сбрать заного
  const regex = /(\d+)/gm;
  d = String(dateString).match(regex);
  //d.forEach((item) => Logger.log('split: ' + item));

  const format = "dd.MM.yyyy HH:mm:ss";

  try {
    //Logger.log('length: ' + d[2].length);
    if (d[2].length == 4) {
      dateString = `${d[1]}.${d[0]}.${d[2]} ${d[3]}:${d[4]}:${d[5]}`;
      //Logger.log('1: ' + dateString)
      //formattedDate = Utilities.formatDate(new Date(dateString), timeZone, format);
    }
    if (d[0].length == 4) {
      dateString = `${d[1]}.${d[2]}.${d[0]} ${d[3]}:${d[4]}:${d[5]}`;
      //Logger.log('2: ' + dateString)
      //formattedDate = Utilities.formatDate(new Date(dateString), timeZone, format); 
    }
    formattedDate = Utilities.formatDate(new Date(dateString), timeZone, format); //Utilities.formatDate(new Date(dateString), timeZone, format); 
    //Logger.log('3: ' + dateString);
  } catch {}

  //Logger.log('in: ' + dateString + '; out: ' + formattedDate);

  return formattedDate;
}