const SHEET_ID = '1PIUT5GSTyJxLZNByDY6bSTvgu7UzkXpqZkBBBMnefcM';
const SHEET_NAME = 'Почта';

//Gmail Advanced search https://support.google.com/mail/answer/7190
const QUERY = "in:inbox after:2022/03/02"


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


function generateMailsSidebarJSON_() {
  let mail2dArray = getGmails(QUERY);

  return [{
    type: "ul",
    array: mail2dArray
  }];
}


function generateDriveSidebarJSON_() {
  let files = getDriveFiles_();

  return [{
    type: "ul",
    array: files
  }];
}


const mailsSidebar = new mySidebar("getGmails", generateMailsSidebarJSON_)
const driveSidebar = new mySidebar("Google Drive", generateDriveSidebarJSON_)

function onOpen() {
  // Создаём новый пункт меню
  SpreadsheetApp.getUi()
    .createMenu("Дополнительно")
    .addItem("getGmails", "mailsSidebar.show")
    .addItem("Google Drive", "driveSidebar.show")
    .addItem("unZip", "unZip")
    .addItem("convertToGSiute", "convertToGSiute")
    .addToUi();
  // https://developers.google.com/apps-script/reference/base/ui#createmenucaption
  // https://developers.google.com/apps-script/reference/base/ui#createaddonmenu
}


function run() {
  getAttachments();
  unZip();
  convertToGSiute();
}

/** TODO:
 * 1 этап - выгрузка
 * [+] #1(16). Добавить меню и сайдбар
 * [+] #2(17). Нужно список сообщений с датами выводить в сайдбар
 * [+] #3(18). Добавить список файлов
 * [+] #4(19). Получить разархивированные файлы
 * [+] #5(20). Добавить дату выгрузки файлов в названия
 * [+] #6(21). Отладка конвертации и удаление исходных файлов после конвертации
 */