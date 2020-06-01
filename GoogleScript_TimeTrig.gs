/* По таймеру проводим проверку всех заявок на странице
// Если есть пустая ячейка по которой должны быть данные, то вносим их
// Функция проверки РМ и внесения данных должна запускаться отдельно от проверки по времени, напр. из функции onEdit()
*/
function taskCosts() {
 
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let settings_sheet = ss.getSheetByName('Настройки');
  let main_sheet = ss.getSheetByName('Основная');
  
  /* ПОЛУЧАЕМ ДАННЫЕ ИЗ НАСТРОЕК ТАБЛИЦЫ
  - Как то найти *диапазон таблицы* в которой надо сверять данные (наверно достаточно листа и номера строки?) - указать 
  название именнованного диапазона в первой колонке
  - Как то проверить *что за данные надо искать* в для этой таблице - указать в второй колонке настроек
  - Как то получить *название колонки* таблицы для которой ищутся данные - указать в третей колонке настроек
  */
  
  // Получаем 55 строку с настройками
  let settingsRange = settings_sheet.getRange(55, 1, 1, 5).getValues() // TODO: 55 надо заменить на название настройки "taskCost"
  // В дальнейшем надо сделать чтобы самих настроек могло быть множество и все проверялись.
  // Т.е. надо избавиться от зависимости скрипта от самих настроек.
  Logger.log(settingsRange);
  
  // Временно указываем каким переменным присваивать каждое значение из настроек.
  // В последующем настройки должны обрабатываться как JSON формат: "<param>: <value>"
  // list(<NameRange>, <ColumnName>, <Site>, <Param>)

  for (i in settingsRange[0]) {
    let val = settingsRange[0][i];
    switch(i) {
      case '0': var NameSettings = val; Logger.log('NameSettings:' + NameSettings); break
      case '1': var NameRange = val;    Logger.log('NameRange:'    + NameRange);    break
      case '2': var ColumnName = val;   Logger.log('ColumnName:'   + ColumnName);   break
      case '3': var Site = val;         Logger.log('Site:'         + Site);         break
      case '4': var Param = val;        Logger.log('Param:'        + Param);        break  
      default :                         Logger.log('Switch-case: не получено данных или получен не ожиданный ввод')
    }
  }

  // ПОЛУЧАЕМ АВТОМАТИЗИРОВАНО НОМЕР СТРОКИ И КОЛОНКИ УПОМЯНУТЫЕ В НАСТРОЙКАХ
  
  let TableRange = ss.getRange(NameRange); Logger.log('TableRange:'+TableRange);
  
  // Цикл для поиска колонки с нужным названием. По-умолчанию считаем что названия в первой строке диапазона.
  for (i in TableRange) {}
  
  let Row = 2 // TODO: Row вычисляем прямо в скрипте (? как-то указать только название таблицы и колонки)
  let Column = 9 // TODO: Column берется за счет поиска названия колонки в таблице
  
  let taskCosts = main_sheet.getRange(Row, Column).getValue(); // сначала для одной ячейки
  Logger.log(taskCosts);

//  if (main_sheet == 'Основная' && Row > 1 && Column == 2) {
//    Logger.log('Условие сработало')
//  }

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