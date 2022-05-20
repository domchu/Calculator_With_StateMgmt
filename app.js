//useing state management

const state = {
  result: 0,
  history: [],
  currentOperation: {
    "1stOperands": "",
    "2ndOperands": "",
    operator: "",
  },
};

const renderResult = () => {
  document.querySelector(".screen-result").innerHTML = state.result;
};

// clear the state.result and operations
document.querySelector(".ac").addEventListener("click", () => {
  state.result = 0;
  renderResult();

  state.currentOperation = {
    "1stOperands": "",
    "2ndOperands": "",
    operator: "",
  };
  render1stCurrentOperationOperand();
  render2ndCurrentOperationOperand();
  renderCurrentOperationOperator();
}); //end of the clearing the state

const renderHistory = () => {
  document.querySelector(".screen-history").innerHTML = state.history
    .map((historyItem) => `<div class="screen-operation">${historyItem}</div>`)
    .join("");
};
const render1stCurrentOperationOperand = () => {
  document.querySelector(".screen-current-operation-operands-1st").innerHTML =
    state.currentOperation["1stOperands"];
};
const render2ndCurrentOperationOperand = () => {
  document.querySelector(".screen-current-operation-operands-2nd").innerHTML =
    state.currentOperation["2ndOperands"];
};
const renderCurrentOperationOperator = () => {
  document.querySelector(
    ".screen-current-operation-operands-operator"
  ).innerHTML = state.currentOperation.operator;
};
renderResult();

document.querySelectorAll(".operand").forEach((operand_button) => {
  operand_button.addEventListener("click", () => {
    if (state.currentOperation.operator !== "") {
      state.currentOperation["2ndOperands"] += operand_button.textContent;
      render2ndCurrentOperationOperand();
    } else {
      state.currentOperation["1stOperands"] += operand_button.textContent;
      render1stCurrentOperationOperand();
    }
  });
});

document.querySelectorAll(".operator").forEach((operator_button) => {
  operator_button.addEventListener("click", () => {
    console.log("operator is working");
    state.currentOperation.operator = operator_button.textContent;
    renderCurrentOperationOperator();
  });
});
document.querySelector(".equals").addEventListener("click", () => {
  if (state.currentOperation.operator == "+") {
    state.result =
      Number(state.currentOperation["1stOperands"]) +
      Number(state.currentOperation["2ndOperands"]);
  } else if (state.currentOperation.operator == "-") {
    state.result =
      Number(state.currentOperation["1stOperands"]) -
      Number(state.currentOperation["2ndOperands"]);
  } else if (state.currentOperation.operator == "*") {
    state.result =
      Number(state.currentOperation["1stOperands"]) *
      Number(state.currentOperation["2ndOperands"]);
  } else if (state.currentOperation.operator == "/") {
    state.result =
      Number(state.currentOperation["1stOperands"]) /
      Number(state.currentOperation["2ndOperands"]);
  }
  const operation = `${state.currentOperation["1stOperands"]} ${state.currentOperation.operator}${state.currentOperation["2ndOperands"]} = ${state.result}`;
  state.history.push(operation);
  renderResult();
  renderHistory();
});


