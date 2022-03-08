function clearRangeBySheetName(sheetName = undefined) {
  if (sheetName !== undefined && getRangeBySheetName(sheetName) !== undefined) getRangeBySheetName(sheetName).clear();
}