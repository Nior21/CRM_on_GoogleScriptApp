function getDataAsObject(data) {

  const result = new Set();

  for (let i = 1; i < data.length; i++) {
    let obj = {};
    for (let j = 0; j < data[i].length; j++) {
      obj[data[0][j]] = data[i][j];
    }
    result.add(JSON.stringify(obj));
  }

  return result;
}