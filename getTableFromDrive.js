function getTableFromDrive() {
  //clearRangeBySheetName('Import'); // Отчистка места под данные

  // Получаем выгрузку из страницы с настройками
  const setupArray = getRangeBySheetName('Setup', "without_headers").getValues(); //Logger.log(setup);

  let driveFiles = DriveApp.getFiles();

  while (driveFiles.hasNext()) {
    let file = driveFiles.next();
    if (file.getMimeType() == MimeType.GOOGLE_SHEETS) {
      const id = file.getId();
      const fileName = file.getName();

      if (fileName.includes('Выгрузка из 1С')) file = driveFiles.next();

      for (let name of filesToImport) {

        if (fileName.includes(formatStringToCap(name))) {    //TODO Убрать этот метод, т.к. он не точный и есть поиск верного названия таблицы    
          /** EXPORT */
          // Здесь надо переключиться на нужную таблицу, загрузить ее данные
          let exportRange = getRangeBySheetName(formatStringToCap(name));
          let exportData;
          try {
            exportData = exportRange.getValues();
            //exportData = exportData.filter((item, index) => index !== exportData.length - 1) // Удаляем итого
          } catch {
            exportData = [];
          }
          
          // Добавляем в список неугодных помеченные на удаление
          let removes = getSetupID('REMOVE', setupArray); //Logger.log(removes) 
            
          // Удаляем колонки и получаем новый массив newData
          exportData = spliceArray(exportData, removes); //Logger.log(exportData);
          
          /** IMPORT */
          let importData = getTableData(id); // Получаем импортные данные
          importData = importData.filter((item, index) => index !== importData.length - 1) // Удаляем итого

          /** COMPARE */
          // Переименовываем заголовки
          renameHeaders(exportData, name, false);
          renameHeaders(importData, name, true);

          // Собираем Set из экспортных данных
          let exportSet = getDataAsObject(exportData); //exportSet.forEach(item => Logger.log(item));
          let importSet = getDataAsObject(importData); //importSet.forEach(item => Logger.log(item))

          // Выводим для отладки
          //exportSet.forEach(item => Logger.log(item));
          //importSet.forEach(item => Logger.log(item));

          // Получаем оличие в списках
          let diffArray = difference(importSet, exportSet); //diffArray.forEach(item => Logger.log(item));

          /** SET */
          // Записываем данные (Берем из diff)
          diffArray.forEach((item) => setJSON(item));

          file.setTrashed(true);
        };
      }
    }
  }
}


function setJSON(json) {
  let obj = JSON.parse(json); //Logger.log(JSON.stringify(obj)) // Разбираем JSON строку
  let index;
  for (let i in obj) { // Собираем верное название индекса
    index = obj[i]; //Logger.log(index);
    break;
  }
  
  let key;

  for (key in obj) { // Перебираем объект и записываем данные
    //Logger.log([key, obj[key], index]);
    setDataByColumnName(key, obj[key], index)
  }

  //let [sheetName] = key.split('.', 1);  // Получаю имя вкладки чтобы записать данные в конкретное место
  //let sheet = getRangeBySheetName[sheetName] // Получаю нужную вкладку
}


function setDataByColumnName(name = 'Операция.Организация', data = '-', index) {
  let [sheetName] = name.split('.', 1); //Logger.log(sheetName) // Получаю заголовок нужной вкладки
  let columnName = name.replace(sheetName + '.', ''); //Logger.log(columnName) // Имя искомой колонки

  let columnIndex = 1;

  sheetName = formatStringToCap(sheetName); //Logger.log(sheetName)
  let range = getRangeBySheetName(sheetName, 'headers');
  let textFinderResults = range.createTextFinder(columnName);
  try {
    let result = textFinderResults.findNext(); //Logger.log(result);
    columnIndex = result.getColumn(); // Проходим по заголовкам и получаем адрес колонки (цифру)
    pushDataRow(sheetName, [data], columnIndex, index); // Сохраняем каждое значение в ячеку с индексом равным номеру колонки в которой найдено нужное название
  } catch {

  }
}