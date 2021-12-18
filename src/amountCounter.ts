const totalNumber = document.querySelector(
  ".product__amountValue"
) as HTMLParagraphElement;
export function amountCounter() {
  let currentAmountSelected: number;

  const decrementBtn = document.querySelector(
    ".product__decrementBtn"
  ) as HTMLButtonElement;

  const incrementBtn = document.querySelector(
    ".product__incrementBtn"
  ) as HTMLButtonElement;

  decrementBtn.addEventListener("click", () =>
    handleChangeAmountValue("decrement", parseInt(totalNumber.innerText))
  );
  incrementBtn.addEventListener("click", () =>
    handleChangeAmountValue("increment", parseInt(totalNumber.innerText))
  );

  function handleChangeAmountValue(
    type: "decrement" | "increment",
    currentValue: number
  ): void {
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
