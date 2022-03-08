function getDataBySheetName(sheetName = 'Поступление (актыНакладныеУпд)') {
  let data = getRangeBySheetName(sheetName).getValues();

  const exportData = new Set();

  for (let i = 1; i < data.length - 1; i++) {
    let obj = {};
    for (let j = 0; j < data[i].length; j++) {
      obj[formatStringToSnake(data[0][j])] = data[i][j];
    }
    exportData.add(obj);
  }

  Logger.log(exportData)
  return exportData;
}