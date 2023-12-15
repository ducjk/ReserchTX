const number = document.querySelector('.number')
const form = document.querySelector('#form-1')
const listItem = document.querySelector('.list-item')
const numberPlays = document.querySelector('.number-play')
const dataAnalysis = document.querySelector('.data-analysis')
const dataAnalysis20 = document.querySelector('.data-analysis20')
const dataAnalysis30 = document.querySelector('.data-analysis30')
const numberRepeat = document.querySelector('.number-of-repeat')
const numberRepeatNow = document.querySelector('.number-of-repeat-now')


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

var allNumber = document.createElement('span');
var twentyNumberLast = document.createElement('span')
var thirdtyNumberLast = document.createElement('span')


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

            if (allNumbers[allNumbers.length -1] > 49){
                temp1 = 1
            }else{
                temp1 = 0
            }
            if (allNumbers[allNumbers.length - 11] > 49){
                temp2 = 1
            }else{
                temp2 = 0
            }

            if (temp1 != temp2){
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
            if (numbers[preventNumber].length == 3){
                const numberDelete = numbers[preventNumber].shift()
            }
            numbers[preventNumber].push(number.value)
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
                if (numbers[i].length == 3){
                    temp = 2
                }else if (numbers[i].length == 2){
                    temp = 1
                }

                if (preventNumber === numbers[i][temp] && i != presentNumber)
                {
                    numbersNeedPlay.push(i)
                    item.classList.add('isNumberPlay')
                }

                numberPlays.textContent = numbersNeedPlay.join('|')

                probalityOfANummbers[i] = (probalityNumber[i]/totalNumber*100).toFixed(2)
    
                item.innerHTML = `${i < 10 ? '0' : ''}${i}: ${probalityNumber[i]}| ${numbers[i][0] != undefined ? numbers[i][0] : ''} ${numbers[i][1] != undefined ? numbers[i][1] : ''} ${numbers[i][2] != undefined ? numbers[i][2] : ''}`
                listItem.appendChild(item)
            }
            
            dataAnalysis.appendChild(allNumber)
            dataAnalysis20.appendChild(twentyNumberLast)
            dataAnalysis30.appendChild(thirdtyNumberLast)
        }
    
        number.value = null
    }

    
}



