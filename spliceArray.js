function test_spliceArray() {
  let array = [
    [0, 1, 2, 3, 4, 5, 6],
    [0, 1, 2, 3, 4, 5, 6],
    [0, 1, 2, 3, 4, 5, 6],
    [0, 1, 2, 3, 4, 5, 6]
  ]

  Logger.log(
    JSON.stringify(
      spliceArray(array, [0, 2, 4, 5, 6])
  ))
}


/** Delete column in array 
 * arr.splice(index[, deleteCount, elem1, ..., elemN])
 * @param {array} array
 * @param {Number|array} removeIndex
 * @return {array}
*/
function spliceArray(array, removeIndex) {
  if (array[0][0] !== undefined) {
    if (Array.isArray(removeIndex)) { // Если передан массив удаляемых столбцов
      
      array.forEach(row => {
        removeIndex.forEach(removeColumn => row.splice(removeColumn, 1, '-'))
      })

      let new_array = []

      array.forEach(row => {
        new_array.push(
          row.filter(item => item !== '-')
        ) 
      })

      return new_array;
    }

    array.forEach(item => item.splice(removeIndex, 1))

    return array;
  }
  // Если не двумерный массив то выполнить следующее
}
