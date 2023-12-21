const number = document.querySelector('.number')
const form = document.querySelector('#form-1')
const listItem = document.querySelector('.list-item')
const numberPlays = document.querySelector('.number-play')
const numberRepeat = document.querySelector('.number-of-repeat')
const numberRepeatNow = document.querySelector('.number-of-repeat-now')
const numberSame = document.querySelector('.number-same')
const numberNotSame = document.querySelector('.number-not-same')
const dataAnalysis = document.querySelector('.data-analysis')
const dataAnalysis20 = document.querySelector('.data-analysis20')
const dataAnalysis30 = document.querySelector('.data-analysis30')


let numbers = []
let numbersNeedPlay = []
let probalityNumber = []
let probalityOfANummbers = []
let allNumbers = []
let temp1 = 0
let temp2 = 0

for (let i = 0; i< 100; i++){
    numbers[i] = new Array()
    probalityNumber[i] = 0
}

let preventNumber = -1
let presentNumber = -1
let totalNumber = 0
let largeOfNumberRepeat = 0
let numberOfRepeat = 0
let same = 0
let notsame = 0
let totalSame = 0
let totalNotSame = 0

var allNumber = document.createElement('span');
var twentyNumberLast = document.createElement('span')
var thirdtyNumberLast = document.createElement('span')

const isSameNumber = (num1, num2) => {
    if (num1 <= 49 && num2 <= 49)
        return true
    else if(num1 > 49 && num2 > 49){
        return true
    }else return false
}

form.onsubmit = (e) => {
    e.preventDefault()

    if (typeof number.value != 'undefined' && number.value.length > 0){
        dataAnalysis.textContent = ''
        dataAnalysis20.textContent = ''
        dataAnalysis30.textContent = ''
        // Tong so da nhap
        totalNumber++
        probalityNumber[number.value]++
        allNumbers.push(number.value)
        if (allNumbers.length > 12){
            if (!isSameNumber(allNumbers[allNumbers.length -1], allNumbers[allNumbers.length - 11])){
                numberOfRepeat++
                numberRepeatNow.textContent = numberOfRepeat
            }else{
                numberOfRepeat = 0
                numberRepeatNow.textContent = numberOfRepeat
            }
    
            if (numberOfRepeat > largeOfNumberRepeat){
                largeOfNumberRepeat = numberOfRepeat
                numberRepeat.textContent = largeOfNumberRepeat
            }
        }

        allNumber.textContent = allNumbers.slice(-10).join('|')
        twentyNumberLast.textContent = allNumbers.slice(-20, -10).join('|')
        thirdtyNumberLast.textContent = allNumbers.slice(-30, -20).join('|')

        if (preventNumber === -1){
            preventNumber = number.value
        }else {
            listItem.textContent = ''
            numberPlays.textContent = ''
            numbersNeedPlay = []

            numbers[preventNumber].push(number.value)
            if (numbers[preventNumber][numbers[preventNumber].length > 1]){
                if (isSameNumber(numbers[preventNumber][numbers[preventNumber].length - 1], numbers[preventNumber][numbers[preventNumber].length - 2])){
                    same++
                    if(same > totalSame){
                        totalSame = same
                        same = 0
                    }
                    numberSame.textContent = totalSame
                }
                else{
                    notsame++
                    if (notsame > totalNotSame){
                        totalNotSame = notsame
                        notsame = 0
                    }
                    numberNotSame.textContent = totalNotSame
                }
            }

            presentNumber = preventNumber
            preventNumber = number.value
    
            for (let i = 0; i < numbers.length; i++){
                var item = document.createElement('li');
                item.classList.add('item');
                
                if (i == preventNumber)
                    item.classList.add('isPresentNumber');
                
                if (i == presentNumber)
                    item.classList.add('isLastNumber');
                
                let temp = 0
                if(numbers[i].length > 0){
                    temp = numbers[i].length - 1
                }

                if (preventNumber === numbers[i][temp] && i != presentNumber)
                {
                    numbersNeedPlay.push(i)
                    item.classList.add('isNumberPlay')
                }

                numberPlays.textContent = numbersNeedPlay.join('|')

                probalityOfANummbers[i] = (probalityNumber[i]/totalNumber*100).toFixed(2)
                let listNumber = numbers[i].join(' ')
                item.innerHTML = `${i < 10 ? '0' : ''}${i}: ${probalityNumber[i]}| ${listNumber}`
                listItem.appendChild(item)
            }

            dataAnalysis.appendChild(allNumber)
            dataAnalysis20.appendChild(twentyNumberLast)
            dataAnalysis30.appendChild(thirdtyNumberLast)
            
        }
    
        number.value = null
    }

    
}



