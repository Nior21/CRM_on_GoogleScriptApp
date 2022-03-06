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
    const source = driveFiles.next();
    //const sourceId = source.getId();
    const fileName = source.getName();

    for (let name of filesToImport) {
      //if (fileName.includes(name)) Logger.log(fileName);
    }


    files.push(source);
  }
}

/**
 * [+] Для каждого файла выделяем название
 * [+] Проверяем содержание названий из прописанной таблицы в реальном названии файла
 * [-] Если название обнаружено то возвращается имя файла
 * [-] Если в прошлом пункте все работает, то выгружаем содержимое документа в виде массива объектов
 */