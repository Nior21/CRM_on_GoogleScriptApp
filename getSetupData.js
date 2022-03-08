function getSetupData_(sheetName = 'Setup') {
  let data = getRangeBySheetName(sheetName).getValues();

  const exportData = new Object();
  const columnData = new Object();
  let currentTitle = '';

  for (let i = 0; i < data.length - 1; i++) {
    for (let j = 1; j < data[i].length; j++) {
      if (j == 1) { // Проходим средний столбец
        if (data[i][j] !== "" && data[i][j] !== " ") {
          //Logger.log(data[i][j])
          exportData[data[i][j]] = [ // ключ - значение
            data[i][j-1], [0]
            //сюда должна попасть колонка [1]
          ]
          currentTitle = data[i][j];
          //Logger.log(currentTitle)
        }
      }
      if (j == 2) { // Проходим последний столбец
        if (data[i][j] !== "" && data[i][j] !== " ") {
          columnData[data[i][j]] = data[i][j-2]; // Вставляем ключ: значение двух названий столбцов

          if (data[i+1][j] == "" || data[i+1][j] == " ") { // Если раздел закончился, то выводим полученный объект
            //Logger.log(columnData);
            exportData[currentTitle][1] = columnData;
            // Вносим значение в массив выше
          }
        }
      }
    }
  }

  //for (let i of exportData) Logger.log(JSON.stringify(i))
  //Logger.log(JSON.stringify(exportData))
  return exportData;
}