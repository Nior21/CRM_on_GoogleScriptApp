function getAndSetHeaders() {
  clearRangeBySheetName('Setup'); // Отчистка места под данные

  for (let sheetName of filesToImport) {
    sheetName = formatStringToCap(sheetName);  
    Logger.log([sheetName, sheetName])
    let range = getRangeBySheetName(sheetName, 'headers'); // Собираем данные отдельно по каждой вкладке
    if (range !== undefined) [headers] = range.getValues();
    if (range !== undefined) {
      Logger.log(headers);

      // Записываем в ячейки
      
      // Нужен перебор отдельно по каждой странице, начинаем с названия таблицы
      
      Logger.log(sheetName) // Записываем заголовок вкладки

      pushDataRow_('Setup', [sheetName])

      for (header of headers) {
        Logger.log(header) // Записываем отдельный заголовок колонки на этой вкладке
        pushDataRow_('Setup', [header])
      }

      pushDataRow_('Setup', [" "])
    }
  }
}