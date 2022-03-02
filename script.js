var SHEET_ID = '1PIUT5GSTyJxLZNByDY6bSTvgu7UzkXpqZkBBBMnefcM';
var SHEET_NAME = 'Почта';

//Gmail Advanced search https://support.google.com/mail/answer/7190
var QUERY = "in:inbox after:2022/03/02"

/** Функция для одновременного запуска других функций и получения входного диапазона */
function run() {
  let array2d = getEmails_(QUERY);
  if (array2d) {
    var ss = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
    appendData_(sheet, array2d);
  }
}

/** Служебная часть функции получить письма с gmail */
function getEmails_(query = 'in:inbox') {
  const folder = DriveApp.getRootFolder(); // Здесь надо указать имя папки куда сохранять вложения
  // Итератор с папками
  let emails = []; // Создаем список адресов
  const thds = GmailApp.search(query); // Возвращаем список потоков по запросу

  for (let i in thds) { // Для каждого из списка потоков возвращаем отдельный поток
    const messages = thds[i].getMessages(); // Получаем список сообщений из каждого отдельного потока
    const email = [] // Инициируем массив сообщений
    for (let j in messages) { // Для каждого из списка сообщений в потоке отделяем отдельное письмо
      messages[j].markRead(); // Для каждого сообщения указываем прочитанным
      email.push([messages[j].getDate(), messages[j].getFrom(), messages[j].getAttachments()]);
      // Вытягиваем отдельные данные и собираем в массиве mail
      const attachments = messages[j].getAttachments();
      for (let z = 0; z < attachments.length; z++) {
        let file = folder.createFile(attachments[z]);

        Logger.log(file);
        Logger.log(file.getMimeType())
        Logger.log(file.getMimeType() == MimeType.MICROSOFT_EXCEL)
      }
    }
    emails = emails.concat(email); // Соединяем отдельные массивы в один двухмерный
  }

  return emails;
}


function appendAfter(range, array2d) {
  range.clearContent();
  range.setValues(array2d);
}


function appendData_(sheet, array2d) {
  array2d.length !== 0 ? sheet.getRange(sheet.getLastRow() + 1, 1, array2d.length, array2d[0].length).setValues(array2d) : ''
}

/** Преобразуем файлы excel в формат google */
function convert() {
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
  }

  files = DriveApp.getFilesByType(MimeType.MICROSOFT_EXCEL_LEGACY);

  while (files.hasNext()) {
    const source = files.next();
    const sourceId = source.getId();
    const fileName = source.getName().replace('.xls', '');

    let file = {
      title: fileName,
    };

    Logger.log(file.isTrashed());
    file.setTrashed(true);
    Logger.log(file.isTrashed());
    file = Drive.Files.copy(file, sourceId, {
      convert: true
    });
  }
}

/** План
 * [-] Добавить дату выгрузки файлов в названия
 * [-] Нужна проверка на наличие excel файла, если его нет то нужно получать и разархивировать архив
 * setTrashed(trashed)
 * [-] Нужно список сообщений с датами выводить в сайдбар
 * [-] Автоматическая разархивация файла
 * [-] Удаление файлов после конвертации
 */