const tipPercents = document.querySelectorAll('.percent:not(:last-child)')
const customPercent = document.querySelector('.custom-tip')
const totalPersonEl = document.getElementById('tip-person')
const totalCostEl = document.getElementById('total-cost')
const valid = document.getElementById('valid')
const resetBtn = document.getElementById('reset')

const getInputValue = () => {
    const billValue = Number(document.getElementById('bill-input').value) || 0
    const peopleInput = document.getElementById('people-input')

    const peopleValue = Number(peopleInput.value)
    if (!peopleValue || peopleValue < 0 || billValue < 0) {
        
        valid.classList.remove('hide')
        peopleInput.classList.add('valid')

        return null
    }

    resetBtn.classList.add('reset-focus')
    valid.classList.add('hide')
    peopleInput.classList.remove('valid')

    return { billValue, peopleValue}
}

const displayResult = (tipValue) => {

    totalPersonEl.textContent = `$${tipValue.tipPerPerson.toFixed(2)}`
    totalCostEl.textContent = `$${tipValue.totalCost.toFixed(2)}`
}

const calculate = (percent) => {
    const billAndPeople = getInputValue()

    if (!billAndPeople) return null
    const tipPercent = billAndPeople.billValue * percent / 100
    const tipPerPerson = tipPercent / billAndPeople.peopleValue
    const totalCost = billAndPeople.billValue / billAndPeople.peopleValue + tipPerPerson

    return { tipPerPerson, totalCost }
}

const handleClick = (e) => {
    console.log(e.target)
    const percent = Number(e.target.value)
    console.log(percent);
    
    const result = calculate(percent)
    if (result) displayResult(result)
}

tipPercents.forEach(tipPercent => {
    tipPercent.addEventListener('click', handleClick)
})

customPercent.addEventListener('input', handleClick)

resetBtn.addEventListener('click', () => {
    displayResult({ tipPerPerson: 0.00, totalCost: 0.00})
    resetBtn.classList.remove('reset-focus')
})