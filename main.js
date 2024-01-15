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
const totalMoneyEl = document.querySelector(".total-money");
const listNumberCorrect = document.querySelector(".list-index-number-correct");

const sameNumberEl = document.querySelector(".same-number");
const thanOneNumberEl = document.querySelector(".than-one-number");
const thanTwoNumberEl = document.querySelector(".than-two-number");
const thanTenNumberEl = document.querySelector(".than-ten-number");

const lessOneNumberEl = document.querySelector(".less-one-number");
const lessTwoNumberEl = document.querySelector(".less-two-number");
const lessTenNumberEl = document.querySelector(".less-ten-number");
const reverseNumberEl = document.querySelector(".reverse-number");

const form2 = document.querySelector("#form-2");
const listNumbered = document.querySelector(".list-number");

const addListNumber = document.querySelector(".add-list-number");

const listTagDataEl = document.querySelector(".list-tag-data");
const listLienTiepEl = document.querySelector(".list-number-lien-tiep");
const lienTiepEl = document.querySelector(".number-lien-tiep");

const listSameNumber = document.querySelector(".list-same-data");

let numberTime = 0;

let numbers = [];
let numbersNeedPlay = [];
let listOfIndexNumberCorrect = [];
let probalityNumber = [];
let probalityOfANummbers = [];
let allNumbers = [];
let temp1 = 0;
let temp2 = 0;
let numLienTiep = 0;

let listOfSameNumber = [];
let listOfLessOneNumber = [];
let listOfLessTwoNumber = [];
let listOfLessTenNumber = [];
let listOfThanOneNumber = [];
let listOfThanTwoNumber = [];
let listOfThanTenNumber = [];
let listOfReverseNumber = [];
let listOfNumberLienTiep = [];
let listOfTaiXiu = [];

for (let i = 0; i < 100; i++) {
  numbers[i] = new Array();
  probalityNumber[i] = 0;
  listOfIndexNumberCorrect[i] = 0;
}

let preventNumber = -1;
let presentNumber = -1;
let totalNumber = 0;
let largeOfNumberRepeat = 0;
let numberOfRepeat = 0;
let totalMoney = 0;
let totalMoneyTag = 0;
let totalSameTwoNumber = 0;
let countSameTwoNumber = 1;
let countSameNumber = 0;

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

addListNumber.addEventListener("click", () => {
  const dataLocalStore = localStorage.getItem("allNumbers");
  console.log("data: ", dataLocalStore);
});

inputTime.addEventListener("input", (e) => {
  numberTime = +`${e.target.value}`;
  titleNumber.textContent = numberTime;
});

hiddenInput.addEventListener("click", () => {
  wrapTitle.classList.add("hidden");
});

const mainFn = (num1) => {
  dataAnalysis.textContent = "";
  dataAnalysis20.textContent = "";
  dataAnalysis30.textContent = "";
  // Tong so da nhap
  totalNumber++;
  probalityNumber[num1]++;
  allNumbers.push(num1);
  localStorage.setItem("allNumbers", allNumbers);

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
    if (numbers[preventNumber].length >= 30) {
      const newArray = numbers[preventNumber].filter(
        (item, index) => numbers[preventNumber].indexOf(item) === index
      );
      if (newArray.lengthv > 31) newArray = newArray.slice(-31);
      if (newArray.length >= 30) {
        const isSameNumberAtArray = numbers[preventNumber].find((num) => {
          return num == num1;
        });

        if (isSameNumberAtArray) {
          totalMoney = totalMoney - (100 - newArray.length);
          var itemMoney = document.createElement("li");
          itemMoney.classList.add("red");
          itemMoney.textContent = `Thua: ${totalMoney}`;
          totalMoneyEl.appendChild(itemMoney);
        } else {
          totalMoney = totalMoney + newArray.length;
          var itemMoney = document.createElement("li");
          itemMoney.classList.add("green");
          itemMoney.textContent = `Thang: ${totalMoney}`;
          totalMoneyEl.appendChild(itemMoney);
        }
      }
    }

    // kiem tra so trung voi so dang 11 22 33
    {
      numbersNeedPlay.forEach((num) => {
        const sameTwoNumber1 = num.toString().split("");
        if (
          (sameTwoNumber1.length == 2 &&
            sameTwoNumber1[0] == sameTwoNumber1[1]) ||
          num == 0
        ) {
          const sameTwoNumber = num1.split("");
          if (
            (sameTwoNumber.length > 1 &&
              sameTwoNumber[0] == sameTwoNumber[1]) ||
            num1 == 0
          ) {
            totalSameTwoNumber = totalSameTwoNumber + 89;
            countSameTwoNumber = 1;
            var itemMoney = document.createElement("li");
            itemMoney.classList.add("green");
            itemMoney.textContent = `Thang: ${totalSameTwoNumber}`;
            listSameNumber.appendChild(itemMoney);
          } else {
            countSameTwoNumber++;
            totalSameTwoNumber = totalSameTwoNumber - 10;

            var itemMoney = document.createElement("li");
            itemMoney.classList.add("red");
            itemMoney.textContent = `Thua: ${totalSameTwoNumber}`;
            listSameNumber.appendChild(itemMoney);
          }
        }
      });
    }

    // kiem tra nhung so trung voi ket qua da ra
    {
      const sameNumber = numbersNeedPlay.find((num) => {
        return num == tempNum;
      });
      if (sameNumber) {
        listOfSameNumber.push({
          id: numberTime,
          time: convertNumberToTime(numberTime),
          number: num1,
        });
        let tam = 0;
        for (let i = allNumbers.length - 2; i >= 0; i--) {
          if (num1 == allNumbers[i]) {
            console.log("Vi tri thu: ", tam);
            break;
          } else {
            tam++;
          }
        }
      }

      const reverseNumber = numbersNeedPlay.find((num) => {
        return num.toString().split("").reverse().join("") == tempNum;
      });
      if (reverseNumber) {
        listOfReverseNumber.push({
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
    }

    listNumberCorrect.innerHTML = "Danh sach index: ";

    // Kiem tra nhung so trung voi so duoi
    if (numbersNeedPlay.length > 0) {
      const isSameNumberAtTag = numbersNeedPlay.find((value) => {
        return String(value).slice(-1) == num1.slice(-1);
      });

      if (!isSameNumberAtTag) {
        totalMoneyTag = totalMoneyTag - numbersNeedPlay.length;
        var itemMoneyTag = document.createElement("li");
        itemMoneyTag.classList.add("red");
        itemMoneyTag.textContent = `Thua: ${totalMoneyTag}`;
        listTagDataEl.appendChild(itemMoneyTag);
      } else {
        totalMoneyTag = totalMoneyTag + (10 - numbersNeedPlay.length);
        var itemMoneyTag = document.createElement("li");
        itemMoneyTag.classList.add("green");
        itemMoneyTag.textContent = `Thang: ${totalMoneyTag}`;
        listTagDataEl.appendChild(itemMoneyTag);
      }
    }

    if (numbersNeedPlay.length == 1) {
      if (isSameNumber(num1, numbersNeedPlay[0])) {
        listOfTaiXiu.push(countSameNumber);
        countSameNumber = 0;
      } else {
        countSameNumber++;
      }
    }

    numbersNeedPlay = [];

    numbers[preventNumber].push(num1);

    // Kiem tra nhung so trung nhau lien tiep nhau
    {
      if (
        numbers[preventNumber][numbers[preventNumber].length - 1] ==
          numbers[preventNumber][numbers[preventNumber].length - 2] &&
        numbers[preventNumber][numbers[preventNumber].length - 2] != undefined
      ) {
        listOfNumberLienTiep.push(numLienTiep);
        listLienTiepEl.textContent = `Danh sach so lien tiep: ${listOfNumberLienTiep.join(
          " | "
        )}`;
        numLienTiep = 0;
      } else {
        numLienTiep++;
        lienTiepEl.textContent = `So trung hien tai: ${numLienTiep}`;
      }
    }

    for (let i = 0; i < numbers[preventNumber].length - 1; i++) {
      if (
        numbers[preventNumber][i] ==
        numbers[preventNumber][numbers[preventNumber].length - 1]
      ) {
        listOfIndexNumberCorrect[numbers[preventNumber].length - 1 - i]++;
        listNumberCorrect.innerHTML += `${
          numbers[preventNumber].length - 1 - i
        } |`;
      }
    }

    presentNumber = preventNumber;
    preventNumber = num1;

    if (numbers[preventNumber].length >= 30) {
      const newArray = numbers[preventNumber].filter(
        (item, index) => numbers[preventNumber].indexOf(item) === index
      );
      if (newArray.length >= 30) {
        const tempArray = [];
        for (let i = 0; i < 100; i++) {
          const isSame = newArray.find((num) => num == i);
          if (!isSame) {
            tempArray.push(i > 9 ? i : `0${i}`);
          }
        }
        console.log(`Ky: ${numberTime}`);
        console.log(tempArray.join(" "));
        console.log(
          "------------------------------------------------------------"
        );
      }
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
  reverseNumberEl.innerHTML = listOfReverseNumber
    .map((ob) => {
      return `<li>${ob.id} ${ob.time} ${ob.number}</li>`;
    })
    .join("");

  number.value = null;
};

form.onsubmit = (e) => {
  e.preventDefault();

  if (typeof number.value != "undefined" && number.value.length > 0) {
    mainFn(number.value);
  }
};

form2.onsubmit = (e) => {
  e.preventDefault();

  const numberedArray = listNumbered.value.split(" ");
  numberedArray.forEach((num1) => {
    mainFn(num1);
  });
};
