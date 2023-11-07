const billInput = document.getElementById('bill-price');
const finalPrice = document.getElementById('total-amount');
const tipCalculation = document.getElementById('tip-amount');
const peopleInput = document.getElementById('people');
const tipSelectors = document.querySelectorAll("#tip-selector");
const customTip = document.getElementById('custom-tip');
const resetBtn = document.getElementById('reset');

let billTemp = 0;
let peopleTemp = 0;
let tipTemp = 0.15;

resetBtn.addEventListener('click', reset)

billInput.addEventListener('blur', (e) => {
    if (billInput.value.includes('.') && billInput.value.split('.')[1].length > 2) {
        e.target.value = billInput.value.slice(0, billInput.value.indexOf('.') + 3);
    }

    setValues(billInput.value, tipTemp, peopleInput.value)
    return;
})

peopleInput.addEventListener('blur', (e) => {
    setValues(billInput.value, tipTemp, peopleInput.value);
    return;
})

tipSelectors.forEach(selector => {
    selector.addEventListener('click', (e) => {
        tipSelectors.forEach(el => {
            el.classList.remove('active');
        });
        customTip.classList.remove('input-active');

        selector.classList.add('active');
        tipTemp = parseFloat(selector.dataset.tip / 100);
        setValues(billInput.value, tipTemp, peopleInput.value);
    })
})

customTip.addEventListener('click', () => {
    tipSelectors.forEach(selector => {
        selector.classList.remove('active');
    })

    customTip.classList.add('input-active');
})

customTip.addEventListener('blur', (e) => {
    let value = parseInt(customTip.value)
    if (value > 100) {
        value = 100;
    } else if (value <= 0) {
        value = 1;
        customTip.value = value;
    }

    tipTemp = value / 100;
    setValues(billTemp, tipTemp, peopleTemp);
})


function setValues(bill, tip, people) {
    billTemp = parseFloat(bill);
    tipTemp = parseFloat(tip);
    peopleTemp = parseInt(people);

    if (billTemp > 0 && tip > 0 && people > 0) {
        calculateFinal(billTemp, peopleTemp, tipTemp);
    }

    return;
}

function calculateFinal(bill, people, tip) {
    let final = 0;

    tip = bill * tip
    bill += tip
    final = bill / people
    tip = tip / people

    render(final, tip);
    return;
}

function render(price, tip) {
    tipCalculation.textContent = `$${parseFloat(tip).toFixed(2)}`;
    finalPrice.textContent = `$${parseFloat(price).toFixed(2)}`;
    return;
}

function reset() {
    billTemp = 0;
    tipTemp = 0;
    tipTemp = 0;
    tipCalculation.textContent = "$0.00";
    finalPrice.textContent = `$0.00`;
    customTip.value = "";
    peopleInput.value = "";
    billInput.value = "";

    customTip.classList.remove('input-active');

    tipSelectors.forEach(selector => {
        selector.classList.remove('active');
    })
}

