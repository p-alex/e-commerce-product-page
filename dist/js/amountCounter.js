const totalNumber = document.querySelector(".product__amountValue");
export function amountCounter() {
    let currentAmountSelected;
    const decrementBtn = document.querySelector(".product__decrementBtn");
    const incrementBtn = document.querySelector(".product__incrementBtn");
    decrementBtn.addEventListener("click", () => handleChangeAmountValue("decrement", parseInt(totalNumber.innerText)));
    incrementBtn.addEventListener("click", () => handleChangeAmountValue("increment", parseInt(totalNumber.innerText)));
    function handleChangeAmountValue(type, currentValue) {
        if (type === "decrement") {
            if (currentValue > 1) {
                totalNumber.innerText = `${currentValue - 1}`;
                currentAmountSelected = parseInt(totalNumber.innerText);
            }
        }
        if (type === "increment") {
            totalNumber.innerText = `${currentValue + 1}`;
            currentAmountSelected = parseInt(totalNumber.innerText);
        }
    }
}
export function currentAmount() {
    return parseInt(totalNumber.innerText);
}
export function resetCounter() {
    totalNumber.innerText = "1";
}
