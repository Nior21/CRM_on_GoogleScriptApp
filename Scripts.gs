// Я.Трекер - https://tracker.yandex.ru/agile/board/4

function onEdit(event) {
  var Sheet = event.source.getActiveSheet().getSheetName()
  var Main = SpreadsheetApp.getActive().getSheetByName('Основная')
  var Cell = SpreadsheetApp.getActive().getCurrentCell()
  var Row = Cell.getRow()
  var Column = Cell.getColumn()
  
  if (Sheet == 'Основная' && Row > 1 && Column == 2) {
    Logger.log('Условие №1 сработало')
    SortByOrganization()

    if () {
        // Проверка что ячейка с номером заявки пустая. Если TRUE - ничего не делать, если FALSE - создать ссылку "Создать"
        }
  }
  
  if (Sheet == 'Основная' && Row > 1 && Column == 4) {
    Logger.log('Условие №2 сработало')
    RM()
}

function SortByOrganization() {
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

function RM() {
// Запускать при условии что данных в ячейке нет - создается ссылка на создание новой заявки
  var Cell = SpreadsheetApp.getActive().getCurrentCell()
  var Row = Cell.getRow()
  var Column = Cell.getColumn()
  
  // Сохраняем значение ячейки в переменную
  var Value = Cell.getValue()
  // Заменяем гиперссылкой с использованием этого значения
  //Cell.setValue('=HYPERLINK("http://ra.grandexpert.ru:8080/redmine/projects/gp_podryad_sholohov/issues?utf8=%E2%9C%93&set_filter=1&f%5B%5D=subject&op%5Bsubject%5D=%7E&v%5Bsubject%5D%5B%5D='+Value+'&f%5B%5D=&c%5B%5D=status&c%5B%5D=subject&c%5B%5D=updated_on&c%5B%5D=spent_hours&group_by=";"'+Value+'")')
  =ЕСЛИ(ЕПУСТО($A63);;ЕСЛИ(ЕПУСТО($D63)=ЛОЖЬ;ГИПЕРССЫЛКА(СЦЕПИТЬ("http://ra.grandexpert.ru:8080/redmine/issues/";$D63);"Открыть");ГИПЕРССЫЛКА("http://ra.grandexpert.ru:8080/redmine/projects/gp_podryad_sholohov/issues/new";"Создать")))
  
  
  }
