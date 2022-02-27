function getRangeBySheet(name = 'Main') {
  // Получаем страницу с исходными данными
  // [+] Предусмотрена привязка страниц по названию, для ситуации перемещения страниц в списке
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(name); // При необходимости можно обращаться по номеру - ss.getSheets()[0];

  // Получаем данные из исходной страницы
  const range = sheet.getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn());
  //const data = range.getValues();

  return range;
}


function clearData(range = undefined) {
  range !== undefined ? range.clear() : getRangeBySheet('Result').clear();
}


const generateData = () => {
  // Получаем страницу с исходными данными
  // [+] Предусмотрена привязка страниц по названию, для ситуации перемещения страниц в списке
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Main"); // При необходимости можно обращаться по номеру - ss.getSheets()[0];

  // Получаем данные из исходной страницы
  const data = getDefaultData('Main').getValues();;

  // Получаем новую страницу для вывода данных или создаем ее если нет
  // [+] Учтена вероятность удаления результирующей страницы
  const isAvailableSheet = ss.getSheetByName('Result');
  const outputSheet = isAvailableSheet != null ? isAvailableSheet : ss.insertSheet('Result');

  // Очищаем данные и форматирование перед перезаписью
  try {
    const oldRange = outputSheet.getRange(1, 1, outputSheet.getLastRow(), outputSheet.getLastColumn()); // Получаем диапазон данных до обновления страницы
    clearData(oldRange); // Очищаем страницу
  } catch {}


  // Задаем и записываем заголовки
  // [+] В заголовках новой страницы учтена вероятность стирания или повреждения данных - заголовки восстановятся в любом случае 
  const NEW_TITLES = [
    ["Дата", "Показатель", "Сумма"]
  ];
  outputSheet.getRange("A1:C1").setValues(NEW_TITLES);

  // Проходим по всем данным и сохраняем нужные значения в правильную структуру
  // [+] Реализовано измененяем структуры данных под заданный заказчиком формат: <Дата> | <Показатели> | <Сумма>
  // [+] Из входящих данных исключен первый столбец, т.к. он идет под показатели
  // [+] Из входящих данных исключен последний столбец, т.к. он под итоги, а их нет в результирующей таблице
  // [+] Из входящих данных исключена первая строка, т.к. она под даты
  const newData = [];
  let countSumColumn = 0; // Счетчик для удаления лишних колонок из входящих данных
  for (let column = 1; column <= data[0].length; column++) {
    if (typeof data[0][column] == 'object') {
      for (let row = 1; row <= data.length - 1; row++) {
        newData.push(
          [
            data[0][column], // Date
            data[row][0], // Indicator
            data[row][column] // Summary
          ]
        )

        // Форматируем сами ячейки как в исходной таблице
        // [-] TODO: Форматирование происходит некорректно, произвести дополнительные тесты или копировать ячейки целиком если это не слишком замедлит процессы
        // sheet.getRange(row, column).copyFormatToRange(outputSheet, 1, 1, column * row, column * row);
      }
    } else {
      countSumColumn++;
    }
  }

  // Вносим данные в заготовленную таблицу
  // [+] Реализован функционал полного перерасчета данных и записи при изменении исходного листа
  // [+] Исправлена ошибка при удалении исходных данных, страница перезаписывалась некорректно
  let newFullRange = outputSheet.getRange(2, 1, (data[0].length - countSumColumn) * (data.length - 1), 3); // Уточняем диапазон под новые данные
  newFullRange.setValues(newData); // Записываем данные

  // Настраиваем форматы чисел как в исходной таблице
  // [+] Формат дат приведен к указанному в исходных данных
  // [+] Формат сумм приведен к указанному в исходных данных
  // [-] TODO: Формат количества заказов отличается, исправить на свое форматирование под каждый показатель
  const dateFormat = sheet.getRange("B1").getNumberFormat(); // Получаем формат дат
  const sumFormat = sheet.getRange("B2").getNumberFormat(); // Получаем формат сумм
  const dateRange = outputSheet.getRange(2, 1, outputSheet.getLastRow(), 1); // Диапазон дат
  const sumRange = outputSheet.getRange(2, 3, outputSheet.getLastRow(), 3); // Диапазон сумм
  dateRange.setNumberFormat(dateFormat);
  sumRange.setNumberFormat(sumFormat);
}