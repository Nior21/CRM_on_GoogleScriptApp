/** Разархивирование 
 * @param { array } files
 * @returns { array } unZipFiles
 */
function unZip() {
  const folder = DriveApp.getRootFolder();

  const files = folder.getFiles();

  while (files.hasNext()) {
    let zip = files.next();

    if (zip.getMimeType() == MimeType.ZIP) {
      let unziped = Utilities.unzip(zip);

      for (let file of unziped) {
        let new_file = folder.createFile(file);

        let name = new_file.getName();        
        let inc_date = new_file.getDateCreated();
        let timeZone = Session.getScriptTimeZone();
        let date = Utilities.formatDate(inc_date, timeZone, 'ddMMyyyyHHmmss');
        new_file.setName(date + ' ' + name);
      }

      zip.setTrashed(true);
    }
  }
}