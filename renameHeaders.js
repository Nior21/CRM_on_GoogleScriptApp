function renameHeaders(array, name, isImport) {
  for (let row = 0; row < array.length; row++) { // Перебираем строки поступающих данных
    // Проходим отдельно по заголовкам и исправляем их
    if (row == 0) { // Забираем только первую строку с заголовками
      //Logger.log(array[row])
      
      for (let column = 0; column < array[row].length; column++) {
        let header = '';
        if (isImport) { // Только для импорта переписываем заголовок на данные из таблицы
          //name = formatStringToCap(name); // Logger.log(formatStringToCap(name))
          //header = getSetup(header)[0];
          //Logger.log(header)
        }
        // Задаем заголовок в точечной нотации
        header = name + "." + array[row][column]; //Logger.log(header)
        //headerLogger.log(array[row][column])
        array[row][column] = header;
        
        //pushDataRow_('Import', [header]);

        // Проверка на то дата в ячейке или нет (содержит ли заголово словов 'Дата')
        if (header.includes('Дата')) {
          // Приводим к одному формату весь столбец кроме 1ой строки заголовков
          for (let i = 1; i < array.length; i++) {
            let date = array[i][column]; //Logger.log(date);
            array[i][column] = formatDate(date); //Logger.log(array[i][column]);
          }
        }
      }
      //Logger.log(array[row])
    }
  }
  //Logger.log(array);
  return array;
}