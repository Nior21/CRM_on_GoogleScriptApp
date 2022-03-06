function getTableFromDrive() {
  const filesToImport = [
    'Выдача наличных',
    'Операция',
    'Поступление (акты накладные УПД)',
    'Поступление наличных',
    'Реализация (акты накладные УПД)',
    'Списание с расчетного счета',
    'Счет покупателю'
  ]

  let files = [];

  let driveFiles = DriveApp.getFiles();

  while (driveFiles.hasNext()) {
    const file = driveFiles.next();
    const id = file.getId();
    const fileName = file.getName();

    for (let name of filesToImport) {
      if (fileName.includes(name)) {
        getTableData(id, name)
      };
    }

    files.push(file);
  }
}


function getTableData(id, name) {
  const ss = SpreadsheetApp.openById(SHEET_ID);

  name = initCap(name);

  let sheet = ss.getSheetByName(name);
  if (!sheet) sheet = ss.insertSheet(name);

  const importSS = SpreadsheetApp.openById(id);

  const importSheet = importSS.getSheetByName('TDSheet');
  const importRange = importSheet.getDataRange();
  const importValueArray = importRange.getValues();

  sheet.getRange(1, 1, importRange.getHeight(), importRange.getWidth()).setValues(importValueArray);

  sheet.setName(name);
  sheet.autoResizeColumns(1, importRange.getWidth());
}


function initCap(str) {
  return str.toLowerCase().replace(/(?:^|\s)[a-z0-9а-яё]/g, function (m) {
    return m.toUpperCase().replace(/[\s\(\)]+/g, "");
  });
};

function initSnake(str) {
  // Заменяем все заглавные буквы символом подчеркивания (_), а затем строчными буквами
  var str = str.replace(/[A-ZА-ЯЁ]/g, function (letter) {
    return '_' + letter.toLowerCase();
  });
  // Удаляем символ подчеркивания (_) в начале строки
  return str.replace(/^_/, "");
}