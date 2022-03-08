function test_getSetup() {
  let value = 'REMOVE'

  Logger.log(getSetup(value));

  Logger.log(getSetupID(value));
}


function getSetup(value, setupArray) {

  if (setupArray == undefined) setupArray = getRangeBySheetName('Setup', 'without_headers').getValues();

  let array = setupArray.filter(item => item[1] == value); //Logger.log(result);
  let result = array.map(([item0, item1]) => item0);
  
  return result;
}


function getSetupID(value, setupArray) {

  if (setupArray == undefined) setupArray = getRangeBySheetName('Setup', 'without_headers').getValues();

  let result = []
  setupArray.forEach(
    (item, index) => { if (item[1] == value) result.push(index); }) //Logger.log(result);

  return result;
}