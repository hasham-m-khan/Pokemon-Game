export function getRandomNum (min, max, repeat=1, uniqueNums=false) {
  let returnArr = [];
  let i = 1;

  while (i <=repeat ) {
    let randomNum = Math.floor(Math.random() * (max - min)) + min;
    if(uniqueNums) {
      if (!returnArr.includes(randomNum)) {
        returnArr.push(randomNum)
        i++
      }
    } else {
      returnArr.push(randomNum)
      i++
    }
  }

  return returnArr
}

export let getExtension = str => str.substring(str.lastIndexOf('.'), str.length)