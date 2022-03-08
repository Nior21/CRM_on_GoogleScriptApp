function setTableData(sheetName, importData, id) {
  const ss = SpreadsheetApp.openById(SHEET_ID);

  sheetName = formatStringToCap(sheetName);

  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) sheet = ss.insertSheet(sheetName);

  const importSS = SpreadsheetApp.openById(id);

  const importSheet = importSS.getSheetByName('TDSheet');
  const importRange = importSheet.getDataRange();

  sheet.getRange(1, 1, importRange.getHeight(), importRange.getWidth()).setValues(importData);

  //sheet.setName(sheetName);
  sheet.autoResizeColumns(1, importRange.getWidth());
}
