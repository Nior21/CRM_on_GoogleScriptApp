function formatStringToCap(str) {
  return str.toLowerCase().replace(/(?:^|\s)[a-z0-9а-яё]/g, function (m) {
    return m.toUpperCase().replace(/[\s\(\)]+/g, "");
  });
};

function formatStringToSnake(str) {
  // Заменяем все заглавные буквы символом подчеркивания (_), а затем строчными буквами
  var str = str.replace(/[A-ZА-ЯЁ]/g, function (letter) {
    return '_' + letter.toLowerCase();
  });
  // Удаляем символ подчеркивания (_) в начале строки
  return str.replace(/^_/, "");
}