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

    Object.keys(json).forEach((value, key) => {
      //console.log ( `json[${ key }].${ json[value].type }:`, json[value] )
      switch (json[value].type) {
        case "input":
          obj[key] = new Input(json[value])
          break
        case "button":
          obj[key] = new Button(json[value])
          break
      }
      obj[key].log()
      this.html += obj[key].getHtml() + "<br>\n"
      console.log(this.html)
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

const myListener = ""

const testSidebar = new mySidebar(
  "Test Settings",
  [{
      type: "input",
      title: "test_input"
    },
    {
      type: "button",
      title: "get",
      listener: "onclick=\"handlerClick\"",
      url: "https://#"
    },
  ]
)

function onOpen() {
  // Создаём новый пункт меню
  SpreadsheetApp.getUi()
    .createMenu("Custom")
    .addItem("test", "testSidebar.show")
    .addToUi();
  // https://developers.google.com/apps-script/reference/base/ui#createmenucaption
  // https://developers.google.com/apps-script/reference/base/ui#createaddonmenu
}

/** План
 * [+] #1. Добавить меню и сайдбар
 * [-] Добавить дату выгрузки файлов в названия
 * [-] Нужна проверка на наличие excel файла, если его нет то нужно получать и разархивировать архив
 * setTrashed(trashed)
 * [-] Нужно список сообщений с датами выводить в сайдбар
 * [-] Автоматическая разархивация файла
 * [-] Удаление файлов после конвертации
 */