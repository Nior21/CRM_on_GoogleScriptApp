/* По таймеру проводим проверку всех заявок на странице
// Если есть пустая ячейка по которой должны быть данные, то вносим их
// Функция проверки РМ и внесения данных должна запускаться отдельно от проверки по времени, напр. из функции onEdit()
*/
function taskCosts() {
  // Как то найти *диапазон таблицы* в которой надо сверять данные (наверно достаточно листа и номера строки?) - указать название именнованного диапазона в первой колонке
  // Как то проверить *что за данные надо искать* в для этой таблице - указать в второй колонке настроек
  // Как то получить *название колонки* таблицы для которой ищутся данные - указать в третей колонке настроек
 
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let settings_sheet = ss.getSheetByName('Настройки');
  let main_sheet = ss.getSheetByName('Основная');
  // list(<NameRange>, <ColumnName>, <Site>, <Param>)
  
  let settingsRange = settings_sheet.getRange(55, 1, 1, 5).getValues() // 55 надо заменить на название настройки "taskCost"
  Logger.log(settingsRange);
  
  let Row = 2 // Row вычисляем прямо в скрипте (? как-то указать только название таблицы и колонки)
  let Column = 9 // Column берется за счет поиска названия колонки в таблице
  
  let taskCosts = main_sheet.getRange(Row, Column).getValue(); // сначала для одной ячейки
  Logger.log(taskCosts);

  if (Main == 'Основная' && Row > 1 && Column == 2) {
    Logger.log('Условие сработало')
  }

}
//=ЗНАЧЕН(ПОДСТАВИТЬ(IMPORTXML(gp_site&#REF!&".xml?key="&key;"/issue/spent_hours");".";","))
//=ЗНАЧЕН(ПОДСТАВИТЬ(IMPORTXML(gp_site&#REF!&".xml?key="&key;"/issue/spent_hours");".";","))

//for (var i in contacts) {
//    // Сохраняем данные о контактах в ячейки: имя, фамилия, номер телефона
//    sheet.getRange(sheet.getLastRow()+1, 1).setValue(contacts[i].getGivenName());
//    sheet.getRange(sheet.getLastRow(), 2).setValue(contacts[i].getFamilyName()); 
//    var phone = contacts[i].getPhones();
//    for (var j in phone) {
//      sheet.getRange(sheet.getLastRow(), 3).setValue(phone[j].getPhoneNumber());
//    }
//  }