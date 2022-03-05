function getDriveFiles_() {
  let files = [];

  let driveFiles = DriveApp.getFiles();

  while (driveFiles.hasNext()) {
    const source = driveFiles.next();
    const sourceId = source.getId();
    const fileName = source.getName();

    files.push([sourceId, fileName]);
  }

  return files;
}