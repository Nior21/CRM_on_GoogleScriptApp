/** Функция для одновременного запуска других функций и получения входного диапазона */
function run_() {
  let array2d = getEmails(QUERY);
  if (array2d) {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
    appendData_(sheet, array2d);
  }
}

function appendData_(sheet, array2d) {
  array2d.length !== 0 ? sheet.getRange(sheet.getLastRow() + 1, 1, array2d.length, array2d[0].length).setValues(array2d) : ''
}