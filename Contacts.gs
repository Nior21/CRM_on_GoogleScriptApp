function importContacts() {
  var group = ContactsApp.getContactGroup("ГрандПроект");
  var contacts = group.getContacts();
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Контакты");
  for (var i in contacts) {
    // Сохраняем данные о контактах в ячейки: имя, фамилия, номер телефона
    sheet.getRange(sheet.getLastRow()+1, 1).setValue(contacts[i].getGivenName());
    sheet.getRange(sheet.getLastRow(), 2).setValue(contacts[i].getFamilyName()); 
    var phone = contacts[i].getPhones();
    for (var j in phone) {
      sheet.getRange(sheet.getLastRow(), 3).setValue(phone[j].getPhoneNumber());
    }
  }
}
