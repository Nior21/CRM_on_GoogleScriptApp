/** Преобразуем файлы excel в формат google */
function convertToGSiute() {
  let files = DriveApp.getFilesByType(MimeType.MICROSOFT_EXCEL);

  while (files.hasNext()) {
    const source = files.next();

    const sourceId = source.getId();
    const fileName = source.getName().replace('.xlsx', '');

    let file = {
      title: fileName,
    };

    file = Drive.Files.copy(file, sourceId, {
      convert: true
    });

    source.setTrashed(true);
  }

  files = DriveApp.getFilesByType(MimeType.MICROSOFT_EXCEL_LEGACY);

  while (files.hasNext()) {
    const source = files.next();
    const sourceId = source.getId();
    const fileName = source.getName().replace('.xls', '');

    let file = {
      title: fileName,
    };

    file = Drive.Files.copy(file, sourceId, {
      convert: true
    });

    source.setTrashed(true);
  }
}