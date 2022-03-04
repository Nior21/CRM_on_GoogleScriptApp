/** Служебная часть функции получить письма с gmail
 * @param {string} query
*/
function getGmails(query = 'in:inbox') {

  // Итератор с папками
  let emails = []; // Создаем список адресов

  const threads = GmailApp.search(query); // Возвращаем список потоков по запросу

  for (let thread of threads) { // Для каждого из списка потоков возвращаем отдельный поток

    const messages = thread.getMessages(); // Получаем список сообщений из каждого отдельного потока
    const email = [] // Инициируем массив сообщений

    for (let message of messages) { // Для каждого из списка сообщений в потоке отделяем отдельное письмо
      message.markRead(); // Для каждого сообщения указываем прочитанным
      email.push(message);
    }

    emails = emails.concat(email); // Соединяем отдельные массивы в один
  }

  return emails;
}


/** Вытягиваем отдельные данные и собираем в массиве
 * @param {array} message
 * @param {object} folder
 */
function getAttachments(messages, folder) {

  if (messages == undefined) {
    messages = getGmails();
  }

  if (folder == undefined) {
    folder = DriveApp.getRootFolder(); // Здесь надо указать имя папки куда сохранять вложения
  }
 
  for (let message of messages) {
    const attachments = message.getAttachments();

    for (let attachment of attachments) {
      folder.createFile(attachment);
    }

    message.moveToTrash();
  }
}


/** Собираем дату сообщения в нужном формате 
 * @param {object} message 
 * @return {object} Formatted date
*/
function formatMessageDate(message) {
  
  let inc_date = message.getDate();

  let timeZone = Session.getScriptTimeZone();
  let date = Utilities.formatDate(inc_date, timeZone, 'dd.MM.yyyy HH:mm:ss');
  
  return date
}