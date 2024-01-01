const number = document.querySelector(".number");
const form = document.querySelector("#form-1");
const listItem = document.querySelector(".list-item");
const numberPlays = document.querySelector(".number-play");
const numberRepeat = document.querySelector(".number-of-repeat");
const numberRepeatNow = document.querySelector(".number-of-repeat-now");
const dataAnalysis = document.querySelector(".data-analysis");
const dataAnalysis20 = document.querySelector(".data-analysis20");
const dataAnalysis30 = document.querySelector(".data-analysis30");
const inputTime = document.querySelector(".input-datetime");
const titleNumber = document.querySelector(".title-number");
const hiddenInput = document.querySelector(".hidden-input");
const wrapTitle = document.querySelector(".wrap-title");
const totalMoneyEl = document.querySelector('.total-money')
const listNumberCorrect = document.querySelector('.list-index-number-correct')

const sameNumberEl = document.querySelector(".same-number");
const thanOneNumberEl = document.querySelector(".than-one-number");
const thanTwoNumberEl = document.querySelector(".than-two-number");
const thanTenNumberEl = document.querySelector(".than-ten-number");

const lessOneNumberEl = document.querySelector(".less-one-number");
const lessTwoNumberEl = document.querySelector(".less-two-number");
const lessTenNumberEl = document.querySelector(".less-ten-number");

const form2 = document.querySelector('#form-2')
const listNumbered = document.querySelector('.list-number')

let numberTime = 0;

let numbers = [];
let numbersNeedPlay = [];
let listOfIndexNumberCorrect = []
let probalityNumber = [];
let probalityOfANummbers = [];
let allNumbers = [];
let temp1 = 0;
let temp2 = 0;

let listOfSameNumber = [];
let listOfLessOneNumber = [];
let listOfLessTwoNumber = [];
let listOfLessTenNumber = [];
let listOfThanOneNumber = [];
let listOfThanTwoNumber = [];
let listOfThanTenNumber = [];

for (let i = 0; i < 100; i++) {
  numbers[i] = new Array();
  probalityNumber[i] = 0;
  listOfIndexNumberCorrect[i] = 0
}

let preventNumber = -1;
let presentNumber = -1;
let totalNumber = 0;
let largeOfNumberRepeat = 0;
let numberOfRepeat = 0;
let totalMoney = 0

var allNumber = document.createElement("span");
var twentyNumberLast = document.createElement("span");
var thirdtyNumberLast = document.createElement("span");

// base function

const addTwoTime = (str1, str2) => {
  const time1 = str1.split(":");
  const time2 = str2.split(":");
  const time3 = time1.map((num) => parseInt(num));
  const time4 = time2.map((num) => parseInt(num));
  const timeResult = [0, 0, 0];

  if (time3[2] + time4[2] >= 60) {
    timeResult[1] = 1;
    timeResult[2] = time3[2] + time4[2] - 60;
  } else {
    timeResult[2] = time3[2] + time4[2];
  }
  if (time3[1] + time4[1] + timeResult[1] >= 60) {
    timeResult[0] = 1;
    timeResult[1] = time3[1] + time4[1] + timeResult[1] - 60;
  } else {
    timeResult[1] = time3[1] + time4[1] + timeResult[1];
  }
  if (time3[0] + time4[0] + timeResult[0] >= 24) {
    timeResult[0] = time3[0] + time4[0] + timeResult[0] - 24;
  } else {
    timeResult[0] = time3[0] + time4[0] + timeResult[0];
  }
  return timeResult.join(":");
};

const convertNumberToTime = (num) => {
  const secondsPerOnce = 45;
  num %= 10000;
  const stoneTime = "07:00:06";
  const result = new Date(num * secondsPerOnce * 1000)
    .toISOString()
    .slice(11, 19);
  return addTwoTime(stoneTime, result);
};

const isSameNumber = (num1, num2) => {
  if (num1 <= 49 && num2 <= 49) return true;
  else if (num1 > 49 && num2 > 49) {
    return true;
  } else return false;
};

const getNumberTitle = (num) => {
  tempNum = num % 10000;
  if (tempNum >= 1920) {
    const date = new Date();
    num = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}0001`;
    // num = +num
    return +num;
  } else return num + 1;
};

// event in app

inputTime.addEventListener("input", (e) => {
  numberTime = +`${e.target.value}`;
  titleNumber.textContent = numberTime;
});

hiddenInput.addEventListener("click", () => {
  wrapTitle.classList.add("hidden");
});

form.onsubmit = (e) => {
  e.preventDefault();

  if (typeof number.value != "undefined" && number.value.length > 0) {
    dataAnalysis.textContent = "";
    dataAnalysis20.textContent = "";
    dataAnalysis30.textContent = "";
    // Tong so da nhap
    totalNumber++;
    probalityNumber[number.value]++;
    allNumbers.push(number.value);
    if (allNumbers.length > 12) {
      if (
        !isSameNumber(
          allNumbers[allNumbers.length - 1],
          allNumbers[allNumbers.length - 11]
        )
      ) {
        numberOfRepeat++;
        numberRepeatNow.textContent = numberOfRepeat;
      } else {
        numberOfRepeat = 0;
        numberRepeatNow.textContent = numberOfRepeat;
      }

      if (numberOfRepeat > largeOfNumberRepeat) {
        largeOfNumberRepeat = numberOfRepeat;
        numberRepeat.textContent = largeOfNumberRepeat;
      }
    }

    allNumber.textContent = allNumbers.slice(-10).join("|");
    twentyNumberLast.textContent = allNumbers.slice(-20, -10).join("|");
    thirdtyNumberLast.textContent = allNumbers.slice(-30, -20).join("|");

    if (preventNumber === -1) {
      preventNumber = number.value;
    } else {
      listItem.textContent = "";
      numberPlays.textContent = "";
      let tempNum = +number.value;

      // kiem tra nhung so nguoc voi ket qua da ra
      if(numbers[preventNumber].length >= 20) {
        const newArray = numbers[preventNumber].filter((item, index) => numbers[preventNumber].indexOf(item) === index)
        const isSameNumberAtArray = numbers[preventNumber].find(num => {
          return num == number.value
        })

        if (isSameNumberAtArray){
          totalMoney = totalMoney - (100 - newArray.length)
          var itemMoney = document.createElement("li");
          itemMoney.classList.add('red')
          itemMoney.textContent = `Thua: ${totalMoney}`
          totalMoneyEl.appendChild(itemMoney)
        }else{
          totalMoney = totalMoney + newArray.length
          var itemMoney = document.createElement("li");
          itemMoney.classList.add('green')
          itemMoney.textContent = `Thang: ${totalMoney}`
          totalMoneyEl.appendChild(itemMoney)
        }
      }

      // kiem tra nhung so trung voi ket qua da ra
      const sameNumber = numbersNeedPlay.find((num) => {
        return num == tempNum;
      });
      if (sameNumber) {
        listOfSameNumber.push({
          id: numberTime,
          time: convertNumberToTime(numberTime),
          number: number.value,
        });
      }

      const lessOneNumber = numbersNeedPlay.find((num) => {
        return num == tempNum + 1;
      });
      if (lessOneNumber) {
        listOfLessOneNumber.push({
          id: numberTime,
          time: convertNumberToTime(numberTime),
          number: number.value,
        });
      }

      const lessTwoNumber = numbersNeedPlay.find((num) => {
        return num == tempNum + 2;
      });
      if (lessTwoNumber) {
        listOfLessTwoNumber.push({
          id: numberTime,
          time: convertNumberToTime(numberTime),
          number: number.value,
        });
      }

      const lessTenNumber = numbersNeedPlay.find((num) => {
        return num == tempNum + 10;
      });
      if (lessTenNumber) {
        listOfLessTenNumber.push({
          id: numberTime,
          time: convertNumberToTime(numberTime),
          number: number.value,
        });
      }

      const thanOneNumber = numbersNeedPlay.find((num) => {
        return num == tempNum - 1;
      });
      if (thanOneNumber) {
        listOfThanOneNumber.push({
          id: numberTime,
          time: convertNumberToTime(numberTime),
          number: number.value,
        });
      }

      const thanTwoNumber = numbersNeedPlay.find((num) => {
        return num == tempNum - 2;
      });
      if (thanTwoNumber) {
        listOfThanTwoNumber.push({
          id: numberTime,
          time: convertNumberToTime(numberTime),
          number: number.value,
        });
      }

      const thanTenNumber = numbersNeedPlay.find((num) => {
        return num == tempNum - 10;
      });
      if (thanTenNumber) {
        listOfThanTenNumber.push({
          id: numberTime,
          time: convertNumberToTime(numberTime),
          number: number.value,
        });
      }
      listNumberCorrect.innerHTML = 'Danh sach index: '

      numbersNeedPlay = [];

      numbers[preventNumber].push(number.value);

      for (let i = 0; i < numbers[preventNumber].length - 1; i++){
        if (numbers[preventNumber][i] == numbers[preventNumber][numbers[preventNumber].length - 1]){
          listOfIndexNumberCorrect[ (numbers[preventNumber].length - 1) - i ]++
          listNumberCorrect.innerHTML += `${(numbers[preventNumber].length - 1) - i} |`
        }
      }

      presentNumber = preventNumber;
      preventNumber = number.value;

      if(numbers[preventNumber].length >= 20) {
        const newArray = numbers[preventNumber].filter((item, index) => numbers[preventNumber].indexOf(item) === index)
        const tempArray = []
        for (let i = 0; i < 100; i++){
          const isSame = newArray.find(num => num == i)
          if(!isSame){
            tempArray.push(i > 9 ? i : `0${i}`)
          }
        }
        console.log(tempArray.join(' '));
        console.log('------------------------------------------------------------');

        
      }


      for (let i = 0; i < numbers.length; i++) {
        var item = document.createElement("li");
        item.classList.add("item");

        if (i == preventNumber) item.classList.add("isPresentNumber");

        if (i == presentNumber) item.classList.add("isLastNumber");

        let temp = 0;
        if (numbers[i].length > 0) {
          temp = numbers[i].length - 1;
        }

        if (preventNumber === numbers[i][temp] && i != presentNumber) {
          numbersNeedPlay.push(i);
          item.classList.add("isNumberPlay");
        }

        numberPlays.textContent = numbersNeedPlay.join("|");

        probalityOfANummbers[i] = (
          (probalityNumber[i] / totalNumber) *
          100
        ).toFixed(2);
        let listNumber = numbers[i].join(" ");
        item.innerHTML = `${i < 10 ? "0" : ""}${i}: ${
          probalityNumber[i]
        }| ${listNumber}`;
        listItem.appendChild(item);
      }

      dataAnalysis.appendChild(allNumber);
      dataAnalysis20.appendChild(twentyNumberLast);
      dataAnalysis30.appendChild(thirdtyNumberLast);
    }
    numberTime = getNumberTitle(numberTime);
    titleNumber.textContent = numberTime;

    sameNumberEl.innerHTML = listOfSameNumber
      .map((ob) => {
        return `<li>${ob.id} ${ob.time} ${ob.number}</li>`;
      })
      .join("");
    thanOneNumberEl.innerHTML = listOfThanOneNumber
      .map((ob) => {
        return `<li>${ob.id} ${ob.time} ${ob.number}</li>`;
      })
      .join("");
    thanTwoNumberEl.innerHTML = listOfThanTwoNumber
      .map((ob) => {
        return `<li>${ob.id} ${ob.time} ${ob.number}</li>`;
      })
      .join("");
    thanTenNumberEl.innerHTML = listOfThanTenNumber
      .map((ob) => {
        return `<li>${ob.id} ${ob.time} ${ob.number}</li>`;
      })
      .join("");

    lessOneNumberEl.innerHTML = listOfLessOneNumber
      .map((ob) => {
        return `<li>${ob.id} ${ob.time} ${ob.number}</li>`;
      })
      .join("");
    lessTwoNumberEl.innerHTML = listOfLessTwoNumber
      .map((ob) => {
        return `<li>${ob.id} ${ob.time} ${ob.number}</li>`;
      })
      .join("");
    lessTenNumberEl.innerHTML = listOfLessTenNumber
      .map((ob) => {
        return `<li>${ob.id} ${ob.time} ${ob.number}</li>`;
      })
      .join("");

    number.value = null;
  }
};

form2.onsubmit = (e) => {
  e.preventDefault()
  
  const numberedArray = listNumbered.value.split(' ')
  numberedArray.forEach(num1 => {
    dataAnalysis.textContent = "";
    dataAnalysis20.textContent = "";
    dataAnalysis30.textContent = "";
    // Tong so da nhap
    totalNumber++;
    probalityNumber[num1]++;
    allNumbers.push(num1);
    if (allNumbers.length > 12) {
      if (
        !isSameNumber(
          allNumbers[allNumbers.length - 1],
          allNumbers[allNumbers.length - 11]
        )
      ) {
        numberOfRepeat++;
        numberRepeatNow.textContent = numberOfRepeat;
      } else {
        numberOfRepeat = 0;
        numberRepeatNow.textContent = numberOfRepeat;
      }

      if (numberOfRepeat > largeOfNumberRepeat) {
        largeOfNumberRepeat = numberOfRepeat;
        numberRepeat.textContent = largeOfNumberRepeat;
      }
    }

    allNumber.textContent = allNumbers.slice(-10).join("|");
    twentyNumberLast.textContent = allNumbers.slice(-20, -10).join("|");
    thirdtyNumberLast.textContent = allNumbers.slice(-30, -20).join("|");

    if (preventNumber === -1) {
      preventNumber = num1;
    } else {
      listItem.textContent = "";
      numberPlays.textContent = "";
      let tempNum = +num1;

      // kiem tra nhung so nguoc voi ket qua da ra
      if(numbers[preventNumber].length >= 20) {
        const newArray = numbers[preventNumber].filter((item, index) => numbers[preventNumber].indexOf(item) === index)
        const isSameNumberAtArray = numbers[preventNumber].find(num => {
          return num == num1
        })

        if (isSameNumberAtArray){
          totalMoney = totalMoney - (100 - newArray.length)
          var itemMoney = document.createElement("li");
          itemMoney.classList.add('red')
          itemMoney.textContent = `Thua: ${totalMoney}`
          totalMoneyEl.appendChild(itemMoney)
        }else{
          totalMoney = totalMoney + newArray.length
          var itemMoney = document.createElement("li");
          itemMoney.classList.add('green')
          itemMoney.textContent = `Thang: ${totalMoney}`
          totalMoneyEl.appendChild(itemMoney)
        }
      }

      // kiem tra nhung so trung voi ket qua da ra
      const sameNumber = numbersNeedPlay.find((num) => {
        return num == tempNum;
      });
      if (sameNumber) {
        listOfSameNumber.push({
          id: numberTime,
          time: convertNumberToTime(numberTime),
          number: num1,
        });
      }

      const lessOneNumber = numbersNeedPlay.find((num) => {
        return num == tempNum + 1;
      });
      if (lessOneNumber) {
        listOfLessOneNumber.push({
          id: numberTime,
          time: convertNumberToTime(numberTime),
          number: num1,
        });
      }

      const lessTwoNumber = numbersNeedPlay.find((num) => {
        return num == tempNum + 2;
      });
      if (lessTwoNumber) {
        listOfLessTwoNumber.push({
          id: numberTime,
          time: convertNumberToTime(numberTime),
          number: num1,
        });
      }

      const lessTenNumber = numbersNeedPlay.find((num) => {
        return num == tempNum + 10;
      });
      if (lessTenNumber) {
        listOfLessTenNumber.push({
          id: numberTime,
          time: convertNumberToTime(numberTime),
          number: num1,
        });
      }

      const thanOneNumber = numbersNeedPlay.find((num) => {
        return num == tempNum - 1;
      });
      if (thanOneNumber) {
        listOfThanOneNumber.push({
          id: numberTime,
          time: convertNumberToTime(numberTime),
          number: num1,
        });
      }

      const thanTwoNumber = numbersNeedPlay.find((num) => {
        return num == tempNum - 2;
      });
      if (thanTwoNumber) {
        listOfThanTwoNumber.push({
          id: numberTime,
          time: convertNumberToTime(numberTime),
          number: num1,
        });
      }

      const thanTenNumber = numbersNeedPlay.find((num) => {
        return num == tempNum - 10;
      });
      if (thanTenNumber) {
        listOfThanTenNumber.push({
          id: numberTime,
          time: convertNumberToTime(numberTime),
          number: num1,
        });
      }

      numbersNeedPlay = [];

      numbers[preventNumber].push(num1);

      presentNumber = preventNumber;
      preventNumber = num1;

      for (let i = 0; i < numbers.length; i++) {
        var item = document.createElement("li");
        item.classList.add("item");

        if (i == preventNumber) item.classList.add("isPresentNumber");

        if (i == presentNumber) item.classList.add("isLastNumber");

        let temp = 0;
        if (numbers[i].length > 0) {
          temp = numbers[i].length - 1;
        }

        if (preventNumber === numbers[i][temp] && i != presentNumber) {
          numbersNeedPlay.push(i);
          item.classList.add("isNumberPlay");
        }

        numberPlays.textContent = numbersNeedPlay.join("|");

        probalityOfANummbers[i] = (
          (probalityNumber[i] / totalNumber) *
          100
        ).toFixed(2);
        let listNumber = numbers[i].join(" ");
        item.innerHTML = `${i < 10 ? "0" : ""}${i}: ${
          probalityNumber[i]
        }| ${listNumber}`;
        listItem.appendChild(item);
      }

      dataAnalysis.appendChild(allNumber);
      dataAnalysis20.appendChild(twentyNumberLast);
      dataAnalysis30.appendChild(thirdtyNumberLast);
    }
    numberTime = getNumberTitle(numberTime);
    titleNumber.textContent = numberTime;

    sameNumberEl.innerHTML = listOfSameNumber
      .map((ob) => {
        return `<li>${ob.id} ${ob.time} ${ob.number}</li>`;
      })
      .join("");
    thanOneNumberEl.innerHTML = listOfThanOneNumber
      .map((ob) => {
        return `<li>${ob.id} ${ob.time} ${ob.number}</li>`;
      })
      .join("");
    thanTwoNumberEl.innerHTML = listOfThanTwoNumber
      .map((ob) => {
        return `<li>${ob.id} ${ob.time} ${ob.number}</li>`;
      })
      .join("");
    thanTenNumberEl.innerHTML = listOfThanTenNumber
      .map((ob) => {
        return `<li>${ob.id} ${ob.time} ${ob.number}</li>`;
      })
      .join("");

    lessOneNumberEl.innerHTML = listOfLessOneNumber
      .map((ob) => {
        return `<li>${ob.id} ${ob.time} ${ob.number}</li>`;
      })
      .join("");
    lessTwoNumberEl.innerHTML = listOfLessTwoNumber
      .map((ob) => {
        return `<li>${ob.id} ${ob.time} ${ob.number}</li>`;
      })
      .join("");
    lessTenNumberEl.innerHTML = listOfLessTenNumber
      .map((ob) => {
        return `<li>${ob.id} ${ob.time} ${ob.number}</li>`;
      })
      .join("");
  })
}
