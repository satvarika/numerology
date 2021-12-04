let numbersOrigin = [] // изначальные числа даты рождения
let numberDestiny = 0
let number01 = 0
let number02 = 0
let number03 = 0
let number04 = 0
let number05 = 0

let matrix

$(document).ready(function() {
    $('#birthday-input').mask('00/00/0000', {placeholder: "ДД/ММ/ГГГГ"})

    $('#culculate-btn').click(function () {
       $('#matrix-table').addClass('display-none')
       $('#destiny-number').html('')
       let d = $('#birthday-input').val()
        // ВАЛИДАЦИЯ
        d = d.replaceAll('/', '')
        // проверка длинны числа
        if (d.length < 8) {
            $('#birthday-input-error').html('введите верный формат даты')
            return
        }
        // проверка корректности даты
        let day = +d.substring(0,2)
        if (day > 31 || day < 1) {
            $('#birthday-input-error').html('день какой то странный у вас. Уточните свой день рождения в паспортном столе')
            return
        }
        console.log('day', day)
        // проверка корректности месяца
        let month = +d.substring(2,4)
        console.log('month', month)
        if (month > 12 || month<1) {
            $('#birthday-input-error').html('такой месяц только в календаре Майя')
            return
        }
        $('#birthday-input-error').html('')

        //разбираем строку на отдельные числа и складываем их в массив numbersOrigin
        numbersOrigin = d.split('')
        console.log('numbersOrigin:', numbersOrigin)

        // БЛОК ВЫЧИСЛЕНИЯ ЧИСЕЛ
        // =======================
        number01 = 0
        number02 = 0
        number03 = numbersOrigin[0] * 2

        numberDestiny = calculateDestinyNumber(d)
        number04 = number01 - number03
        number05 = sumNumbers(number04)
        // =======================

        $('#destiny-number').html('Число судьбы: ' + numberDestiny)

        console.log('numberDestiny:', numberDestiny, '[', number01, number02, number03, number04, number05, ']')

        // БЛОК ВЫЧИСЛЕНИЯ МАТРИЦЫ
        // =======================
        matrix = ['', '', '', '', '', '', '', '', '']
        numbersOrigin = numbersOrigin.concat(...splitNumbers(number01), splitNumbers(number02), splitNumbers(number04), splitNumbers(number05))
        console.log('numbersOrigin:', numbersOrigin)
        for (let i = 0; i < numbersOrigin.length; i++) {
            const num = numbersOrigin[i]
            if (num !== '0') matrix[+num-1] = matrix[+num-1] + num
        }
        showMatrix()
        console.log('matrix', matrix)
    })
})

// функция расчета числа судьбы
const calculateDestinyNumber = function (numbers) {
    numberDestiny = sumNumbers(numbers)
    // считаем numberOne
    if (number01 === 0) {
        number01 = numberDestiny
        number02 = sumNumbers(number01)
    }
    // но если это не конец, то мы снова вызываем эту функцию
    if (numberDestiny > 9 && numberDestiny !== 11) {
        return calculateDestinyNumber(numberDestiny)
    }
    return numberDestiny
}

// функция сумма цифр числа
const sumNumbers = function(number) {
    // превращаем строку в массив 345 -> [3,4,5]
    const numbersArr = ('' + number).split('')
    let result = 0
    for (let i = 0; i < numbersArr.length ; i++) {
        result = result + (+numbersArr[i])
    }
    return result
}

const splitNumbers = function (number) {
    return ('' + number).split('')
}

const showMatrix = function() {
  $('#matrix-table').removeClass('display-none')
    for (let i = 0; i < matrix.length; i++) {
        $(`#number-${i}`).html(matrix[i])
    }

}