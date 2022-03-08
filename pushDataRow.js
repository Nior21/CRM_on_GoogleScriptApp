/** Функция для добавления данных к конец таблицы */
function pushDataRow(sheetName = 'Операция', data = '-', column = 1, index = undefined) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(sheetName);

  const array = getRangeBySheetName(sheetName).getValues();
  
  let row = undefined;

  if (index !== undefined) {  // Ищем индекс
    for (let i = 0; i < array.length; i++) {
      if (array[i][0] == index) {
        //Logger.log(i)
        row = i;
      }
    }
  }
  
  if (row == undefined) {
    row = sheet.getLastRow();
  }
  const range = sheet.getRange(
    row + 1, // Начальная строка
    column, // Начальная колонка
    1, // Смещение по строкам
    data.length ? data.length : 1 // Смещение по колонкам (+ проверка на то что передан не массив)
  );
  
  range.setValue(data);

  return range;
}