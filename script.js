const SHEET_ID = '1PIUT5GSTyJxLZNByDY6bSTvgu7UzkXpqZkBBBMnefcM';
const SHEET_NAME = 'Почта';

//Gmail Advanced search https://support.google.com/mail/answer/7190
const QUERY = "in:inbox after:2022/03/02"

/** Функция для одновременного запуска других функций и получения входного диапазона */
function run_() {
  let array2d = getEmails_(QUERY);
  if (array2d) {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);
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
      let m = messages[j];
      m.markRead(); // Для каждого сообщения указываем прочитанным
      let inc_date = m.getDate()
      let timeZone = Session.getScriptTimeZone();
      let date = Utilities.formatDate(inc_date, timeZone, 'dd.MM.yyyy HH:mm:ss');
      email.push([`[${date}]`]);
      // Вытягиваем отдельные данные и собираем в массиве mail
      const attachments = messages[j].getAttachments();
      for (let z = 0; z < attachments.length; z++) {
        let file = folder.createFile(attachments[z]);

        //Logger.log(file);
        //Logger.log(file.getMimeType())
        //Logger.log(file.getMimeType() == MimeType.MICROSOFT_EXCEL)
      }
    }
    emails = emails.concat(email); // Соединяем отдельные массивы в один двухмерный
  }

  return emails;
}


function appendData_(sheet, array2d) {
  array2d.length !== 0 ? sheet.getRange(sheet.getLastRow() + 1, 1, array2d.length, array2d[0].length).setValues(array2d) : ''
}


class mySidebar {
  /**
   * Класс mySidebar позволяет создавать sidebars удобным способом с заранее сформулированными методами и свойства
   * @param {object} json
   * @param {string} title - Sidebar name настроек которые надо удалить
   */
  constructor(title = "Sidebar", json) {
    this.title = title,
      this.json = json,
      this.html =
      "<script>\n" +
      "   const handlerClick () {\n" +
      "       console.log(\"Button clicked\")\n" +
      "   } \n" +
      "</script>\n"

    const obj = []

    if (typeof json == 'function') {
      json = json();
    }

    Object.keys(json).forEach((value, key) => {
      //console.log ( `json[${ key }].${ json[value].type }:`, json[value] )
      switch (json[value].type) {
        case "input":
          obj[key] = new Input(json[value])
          break
        case "button":
          obj[key] = new Button(json[value])
          break
        case "p":
          obj[key] = new Paragraph(json[value])
          break
        case "ul":
          obj[key] = new UnorderedList(json[value])
          break
      }
      //obj[key].log()
      this.html += obj[key].getHtml() + "<br>\n"
      //console.log(this.html)
    })
  }

  /**
   * Метод открывает 'sidebar'.
   * https://developers.google.com/apps-script/reference/base/ui#showsidebaruserinterface
   */
  show() {
    SpreadsheetApp.getUi().showSidebar(HtmlService
      .createHtmlOutput(this.html)
      .setTitle(this.title)); // создаем HtmlOutput
  }

  log() {
    console.log(
      `title: ${ this.title },
            json: ${ JSON.stringify ( this.json ) },`
    )
  }
}
class Button {
  /**
   * Button class
   * @param title
   * @param listener
   * @param url
   * @param child
   */
  constructor({
    title = 'undefined_button',
    listener,
    url = 'undefined_url',
  }) {
    this.title = title
    this.listener = listener
    this.url = url
  }

  getHtml() {
    return HtmlService.createTemplate(
      `<input type=\"button\" value=\"${ this.title }\" ${ this.listener }>`
    ).evaluate().getContent()
  }

  log() {
    console.log(
      `
            title: ${ this.title },
            url: ${ this.url },
            listener: ${ this.listener },
            `
    )
  }
}
class Input {
  /**
   * Input class
   * @param title
   * @param listener
   * @param child
   */
  constructor({
    title = "input",
    listener
  }) {
    this.title = title
    this.listener = listener
  }

  getHtml() {
    return HtmlService.createTemplate(
      `<input type=\"input\" value=\"${ this.title }\" ${ this.listener }>`
    ).evaluate().getContent()
  }

  log() {
    console.log(
      `
      title: ${ this.title },
      listener: ${ this.listener },
      `
    )
  }
}
class Paragraph {
  /**
   * Input class
   * @param text
   */
  constructor({
    text = "paragraph",
  }) {
    this.text = text
  }

  getHtml() {
    return HtmlService.createTemplate(
      `<p>${ this.text }</p>`
    ).evaluate().getContent()
  }

  log() {
    console.log(
      `text: ${ this.text }`
    )
  }
}
class UnorderedList {
  /**
   * Input class
   * @param array
   */
  constructor({
    array = [],
  }) {
    this.array = array
  }

  getHtml() {
    let resultHTML = '';
    for (let i = 0; i < this.array.length; i++) {
      if (i == 0) {
        resultHTML += '<ul>';
      }
      resultHTML += '<li>' + this.array[i] + '</li>';
      if (i == this.array.length - 1) {
        resultHTML += '</ul>'
      }
    }
    return HtmlService.createTemplate(resultHTML).evaluate().getContent()
  }

  log() {
    console.log(
      `array: ${ this.array }`
    )
  }
}


function importHTML_(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
    .getContent()
}


//const myListener = ""

function generateMailsSidebarJSON_() {
  let mail2dArray = getEmails_(QUERY);

  return [{
    type: "ul",
    array: mail2dArray
  }];
}

/** Преобразуем файлы excel в формат google */
function convert_() {
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

    //Logger.log(file.isTrashed());
    file.setTrashed(true);
    //Logger.log(file.isTrashed());
    file = Drive.Files.copy(file, sourceId, {
      convert: true
    });
  }
}


function getDriveFiles_() {
  let files = [];

  let driveFiles = DriveApp.getFiles();

  while (driveFiles.hasNext()) {
    const source = driveFiles.next();
    const sourceId = source.getId();
    const fileName = source.getName();

    files.push([sourceId, fileName]);
  }

  return files;
}

function generateDriveSidebarJSON_() {
  let files = getDriveFiles_();

  return [{
    type: "ul",
    array: files
  }];
}


/** Разархивирование 
 * @param { array } files
 * @returns { array } unZipFiles
 */
function unZip() {
  const folder = DriveApp.getRootFolder();
  const files = folder.getFiles();
  while (files.hasNext()) {
    let zip = files.next();
    if (zip.getMimeType() == MimeType.ZIP) {
      let unziped = Utilities.unzip(zip);
      for (let file of unziped) {
        folder.createFile(file);
      }
      zip.moveTo(destination)
    }
  }
}


const mailsSidebar = new mySidebar("GMail", generateMailsSidebarJSON_)
const driveSidebar = new mySidebar("Google Drive", generateDriveSidebarJSON_)

function onOpen() {
  // Создаём новый пункт меню
  SpreadsheetApp.getUi()
    .createMenu("Дополнительно")
    .addItem("GMail", "mailsSidebar.show")
    .addItem("Google Drive", "driveSidebar.show")
    .addItem("unZip", "unZip")
    .addToUi();
  // https://developers.google.com/apps-script/reference/base/ui#createmenucaption
  // https://developers.google.com/apps-script/reference/base/ui#createaddonmenu
}

/** TODO:
 * [+] #1. Добавить меню и сайдбар
 * [+] #2. Нужно список сообщений с датами выводить в сайдбар
 * [+] #3. Добавить список файлов
 * [+] #4. Получить разархивированные файлы
 * [-] Добавить дату выгрузки файлов в названия
 * [-] Нужна проверка на наличие excel файла, если его нет то нужно получать и разархивировать архив
 * setTrashed(trashed)
 * [-] Автоматическая разархивация файла
 * [-] Удаление файлов после конвертации
 * [-] Переделать ul в select и сделать поле для отображения сообщений
 * [-] Занести все доступные параметры сообщения в меню настройки, где можно выбрать что отображать
 * [-] Добавить стили
 */