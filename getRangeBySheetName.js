/** getRangeBySheetName
 * @param {string} name
 * @param {{string: ('headers'|'without_headers')}} target
 * @return {array} range
 */
function getRangeBySheetName(name, target = undefined) {
  if (name !== undefined) {
    // Получаем страницу с исходными данными
    // [+] Предусмотрена привязка страниц по названию, для ситуации перемещения страниц в списке
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    const sheet = ss.getSheetByName(name); // При необходимости можно обращаться по номеру - ss.getSheets()[0];
    if (sheet == undefined) {
      Logger.log(`Please define the correct value of "name" (current: ${name})`);
      return;
    }

    // Получаем данные из исходной страницы
    let range;
    switch (target) {
      case 'headers':
        range = sheet.getRange(1, 1, 1, sheet.getLastColumn());
        break;
      case 'without_headers':
        range = sheet.getRange(2, 1, sheet.getLastRow(), sheet.getLastColumn());
        break;
      default:
        range = sheet.getDataRange();
        break;
    }

    return range;
  }
}