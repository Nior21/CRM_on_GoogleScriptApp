/**
 * Include external files
 * https://developers.google.com/apps-script/guides/html/best-practices
 * https://developers.google.com/apps-script/guides/html/templates#printing_scriptlets
 * @param filename
 * @returns {string}
 */
const include = (filename) => {
  return HtmlService.createHtmlOutputFromFile(filename)
    .getContent();
}