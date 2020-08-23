// https://script.google.com/macros/s/AKfycbzYiJJIpOQ0VFxb1I-v6zuvdFvgwcak8P3Tg1JJ67V7NbJjFGkb/exec
// https://script.google.com/macros/s/AKfycbzoWay5sXrNhPtLWc5E6f3W1RZKkhryt3owDHYjEwph/dev

function onEdit(event) {

  var Sheet = event.source.getActiveSheet().getSheetName()
  var Main = SpreadsheetApp.getActive().getSheetByName('Основная')
  var TestSheet = SpreadsheetApp.getActive().getSheetByName('ДляТестов')
  var Cell = SpreadsheetApp.getActive().getCurrentCell()
  var Row = Cell.getRow()
  var Column = Cell.getColumn()
  
  // Условие 1
  if (Sheet == 'Основная' && Row > 1 && Column == 2) {
    Logger.log('Условие 1 сработало')
    Organization()
  }
  
  // Условие 2
  if (Sheet == 'ДляТестов' && Row > 1 && Column == 2) {
    Logger.log('Условие 2 сработало')
    EditTable() // Функция для работы с двумерными таблицами
  }
  
}


function EditTable() {    // Функция для работы с двумерными таблицами

  // Добавление строк в конце таблицы
  
  // Адаптивный перенос строки после ввода значения в последней строке
  
  // Редактирование значений внутри таблицы ("растягивание" формул/условного форматирования/проверки данных/стиля ячейки по столбцам)
  
}

function CreateTable() {

  var TestSheet = SpreadsheetApp.getActive().getSheetByName('ДляТестов')
  var Cell = SpreadsheetApp.getActive().getCurrentCell()
  var Row = Cell.getRow()
  var Column = Cell.getColumn()
  var TableRange = SpreadsheetApp.getActiveRange()
  
  if (SpreadsheetApp.getActiveRange().getValue() == "test") {    // Проверка выделения ячеек
    SpreadsheetApp.getActiveRange().setValue("true")
  }
  // Если выделены, то попробовать создать таблицу из них. Если нет то создать таблицу 2х2 ячейки, где первая строка заголовок
  else {
    //SpreadsheetApp.getActiveRange().offset(0, 0).setValue("test_header_1");
    //SpreadsheetApp.getActiveRange().offset(0, 1).setValue("test_header_2");
    //SpreadsheetApp.getActiveRange().offset(1, 0).setValue("test_value_1");
    //SpreadsheetApp.getActiveRange().offset(1, 1).setValue("test_value_2");
    Logger.log(
      "in:  " +
      "SpreadsheetApp.getActiveRange().getRow()" +
      "\n" +
      "out: " + 
      SpreadsheetApp.getActiveRange().getRow()
    );
    Logger.log(
      "in:  " +
      "SpreadsheetApp.getActiveRange().getColumn()" +
      "\n" +
      "out: " + 
      SpreadsheetApp.getActiveRange().getColumn()
    );
    Logger.log(
      "in:  " +
      "SpreadsheetApp.getActiveRange().getLastRow()" +
      "\n" +
      "out: " + 
      SpreadsheetApp.getActiveRange().getLastRow()
    );
    Logger.log(
      "in:  " +
      "SpreadsheetApp.getActiveRange().getLastColumns()" +
      "\n" +
      "out: " + 
      SpreadsheetApp.getActiveRange().getLastColumn()
    );
    
    TableRange = SpreadsheetApp.getActiveSheet().getRange(
      SpreadsheetApp.getActiveRange().getRow(), // номер начальной строки
      SpreadsheetApp.getActiveRange().getColumn(), // номер начальной колонки
      2, // кол-во строк
      2 // кол-во колонок
      ); /// собираем диапазон
      
    Logger.log(
      "in:  " +
      "TableRange" +
      "\n" +
      "out: " + 
      TableRange
    );
    
    // собрали диапазон, требуется проверить дальнейшее его использование
    
    TableRange.setValue("1")
    
  }
      
  // Создание именнованного диапазона
  //SpreadsheetApp.getActive().setNamedRange('Цены', Prices.getRange('A2:C' + NewRowInPrices))
  
  
  // Создание фильтра
  
  // Проверка на "шапку" таблицы
}

function Organization() {
  var Cell = SpreadsheetApp.getActive().getCurrentCell()
  var Row = Cell.getRow()
  var Column = Cell.getColumn()
  
  // Сохраняем значение ячейки в переменную
  var Value = Cell.getValue()
  // Заменяем гиперссылкой с использованием этого значения
  Cell.setValue('=HYPERLINK("http://ra.grandexpert.ru:8080/redmine/projects/gp_podryad_sholohov/issues?utf8=%E2%9C%93&set_filter=1&f%5B%5D=subject&op%5Bsubject%5D=%7E&v%5Bsubject%5D%5B%5D='+Value+'&f%5B%5D=&c%5B%5D=status&c%5B%5D=subject&c%5B%5D=updated_on&c%5B%5D=spent_hours&group_by=";"'+Value+'")')
}

function SortByID() {
// Запускать при условии что данные в ячейке есть - создается ссылка на существующую заявку
  var Cell = SpreadsheetApp.getActive().getCurrentCell()
  var Row = Cell.getRow()
  var Column = Cell.getColumn()
  //=ЕСЛИ(ЕПУСТО($A2);;ЕСЛИ(ЕПУСТО($D2)=ЛОЖЬ;ГИПЕРССЫЛКА(СЦЕПИТЬ("http://ra.grandexpert.ru:8080/redmine/issues/";$D2);"Открыть");ГИПЕРССЫЛКА("http://ra.grandexpert.ru:8080/redmine/projects/gp_podryad_sholohov/issues/new";"Создать")))
  
  // Сохраняем значение ячейки в переменную
  var Value = Cell.getValue()
  // Заменяем гиперссылкой с использованием этого значения
  Cell.setValue('=HYPERLINK("http://ra.grandexpert.ru:8080/redmine/projects/gp_podryad_sholohov/issues?utf8=%E2%9C%93&set_filter=1&f%5B%5D=subject&op%5Bsubject%5D=%7E&v%5Bsubject%5D%5B%5D='+Value+'&f%5B%5D=&c%5B%5D=status&c%5B%5D=subject&c%5B%5D=updated_on&c%5B%5D=spent_hours&group_by=";"'+Value+'")')
}

//function SortByID() {
//// Запускать при условии что данных в ячейке нет - создается ссылка на создание новой заявки
//  var Cell = SpreadsheetApp.getActive().getCurrentCell()
//  var Row = Cell.getRow()
//  var Column = Cell.getColumn()
//  //=ЕСЛИ(ЕПУСТО($A2);;ЕСЛИ(ЕПУСТО($D2)=ЛОЖЬ;ГИПЕРССЫЛКА(СЦЕПИТЬ("http://ra.grandexpert.ru:8080/redmine/issues/";$D2);"Открыть");ГИПЕРССЫЛКА("http://ra.grandexpert.ru:8080/redmine/projects/gp_podryad_sholohov/issues/new";"Создать")))
//  
//  // Сохраняем значение ячейки в переменную
//  var Value = Cell.getValue()
//  // Заменяем гиперссылкой с использованием этого значения
//  Cell.setValue('=HYPERLINK("http://ra.grandexpert.ru:8080/redmine/projects/gp_podryad_sholohov/issues?utf8=%E2%9C%93&set_filter=1&f%5B%5D=subject&op%5Bsubject%5D=%7E&v%5Bsubject%5D%5B%5D='+Value+'&f%5B%5D=&c%5B%5D=status&c%5B%5D=subject&c%5B%5D=updated_on&c%5B%5D=spent_hours&group_by=";"'+Value+'")')
//}

