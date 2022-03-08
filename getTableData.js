function getTableData(id) {
  const importSS = SpreadsheetApp.openById(id);

  const importSheet = importSS.getSheetByName('TDSheet');
  const importRange = importSheet.getDataRange();
  const importValueArray = importRange.getValues();

  return importValueArray;
}