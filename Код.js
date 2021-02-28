function onOpen() {
  showSidebar()
  SpreadsheetApp.getUi()
    .createMenu("Sidebar")
    .addItem("Test Settings", "showSidebar")
    .addToUi()
}


function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
    .getContent()
}

function importHTML(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
    .getContent()
}

function showSidebar(updateHTML="") {

  // Соединяем 3 html
  const html1 = importHTML("template_header")
  const html2 = importHTML("template_body")
  includeHTML = `<div>${updateHTML}</div>`
  const html3 = importHTML("template_footer")
  const html = html1 + html2 + includeHTML + html3
  SpreadsheetApp.getUi()
    .showSidebar(HtmlService.createTemplate(html)
    .evaluate()
    .setTitle("Sidebar"))
}

/**
 * SET
 * Функция записывает настройки указанные в полях ввода в Свойства проекта
 * https://developers.google.com/apps-script/reference/properties/properties?hl=en
 * @param {object} settings Список настроек которые надо сохранить
 * @return {boolean} True или False
 */
function setSettings() {
  // Set a property in each of the three property stores.
  var scriptProperties = PropertiesService.getScriptProperties();
  var userProperties = PropertiesService.getUserProperties();
  var documentProperties = PropertiesService.getDocumentProperties();

  scriptProperties.setProperty('SERVER_URL', 'http://www.example.com/');
  userProperties.setProperty('DISPLAY_UNITS', 'metric');
  documentProperties.setProperty('SOURCE_DATA_ID', '1234567890abcdefghijklmnopqrstuvwxyz');

  return console.log("####: Proprties saved");
}

/**
 * GET
 */
function getSettings() {
  // Set a property in each of the three property stores.
  var scriptProperties = PropertiesService.getScriptProperties().getProperties();
  var userProperties = PropertiesService.getUserProperties().getProperties();
  var documentProperties = PropertiesService.getDocumentProperties().getProperties();

  const out = JSON.stringify({scriptProperties, userProperties, documentProperties})

  showSidebar(out)

  return console.log(out)
}


function setCount() {

  let documentProperties = PropertiesService.getDocumentProperties()
  let count = documentProperties.getProperty("count")
  count = Number(count) + 1
  documentProperties.setProperty('count', count)

  return count
}