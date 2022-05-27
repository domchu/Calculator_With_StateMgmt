const state = {
  result: 0,
  history: [],
  currentOperation: {
    firstOperands: "",
    secondOperands: "",
    operator: "",
    editModeId: "",
  },
};

const renderResult = () => {
  document.querySelector(".screen-result").innerHTML = state.result;
};
const renderHistory = () => {
  document.querySelector(".screen-history").innerHTML = state.history
    .map((historyItem) => `<div class="screen-operation">${historyItem}</div>`)
    .join("");
};
const render1stCurrentOperationOperand = () => {
  document.querySelector(".screen-current-operation-operands-1st").innerHTML =
    state.currentOperation["firstOperands"]; // get from state
};
const render2ndCurrentOperationOperand = () => {
  document.querySelector(".screen-current-operation-operands-2nd").innerHTML =
    state.currentOperation["secondOperands"];
};
const renderCurrentOperationOperator = () => {
  document.querySelector(".screen-current-operation-operator").innerHTML =
    state.currentOperation.operator; // get from state
};
const toggleEditModeClassName = () => {
  document
    .querySelectorAll(".screen-current-operation-operands")
    .forEach((currentOperationOperand_element) =>
      currentOperationOperand_element.classList.remove("edit-mode")
    );

  document
    .querySelector(
      state.currentOperation.editModeId
        ? `#${state.currentOperation.editModeId}`
        : "null"
    )
    ?.classList.add("edit-mode");
};

document
  .querySelectorAll(".screen-current-operation-operands")
  .forEach((currentOperationOperand_element) => {
    currentOperationOperand_element.addEventListener("click", () => {
      state.currentOperation.editModeId =
        state.currentOperation.editModeId === currentOperationOperand_element.id
          ? ""
          : currentOperationOperand_element.id;
      toggleEditModeClassName();
    });
  });

renderResult();

document.querySelectorAll(".operand").forEach((operand_button) => {
  operand_button.addEventListener("click", () => {
    const handle1stCurrentOperationOperand = () => {
      state.currentOperation["firstOperands"] += operand_button.textContent; // set to state
      render1stCurrentOperationOperand();
    };
    const handle2ndCurrentOperationOperand = () => {
      state.currentOperation["secondOperands"] += operand_button.textContent; // set to state
      render2ndCurrentOperationOperand();
    };

    if (state.currentOperation.editModeId) {
      if (state.currentOperation.editModeId === "firstOperands") {
        handle1stCurrentOperationOperand();
      } else {
        handle2ndCurrentOperationOperand();
      }
    } else {
      if (state.currentOperation.operator !== "") {
        handle2ndCurrentOperationOperand();
      } else {
        handle1stCurrentOperationOperand();
      }
    }

    console.log(state.currentOperation.operator);
  });
});

/**
 * This function checks for an operator and does the calculation
 * Then it set any calculation result to the state.result
 */
const performOperationCalculation = () => {
  if (state.currentOperation.operator == "+") {
    state.result =
      Number(state.currentOperation["firstOperands"]) +
      Number(state.currentOperation["secondOperands"]); // set state result for the "+" operation
  } else if (state.currentOperation.operator == "-") {
    state.result =
      Number(state.currentOperation["firstOperands"]) -
      Number(state.currentOperation["secondOperands"]); // set state result for the "-" operation
  } else if (state.currentOperation.operator == "*") {
    state.result =
      Number(state.currentOperation["firstOperands"]) *
      Number(state.currentOperation["secondOperands"]); // set state result for the "*" operation
  } else if (state.currentOperation.operator == "/") {
    state.result =
      Number(state.currentOperation["firstOperands"]) /
      Number(state.currentOperation["secondOperands"]); // set state result for the "/" operation
  }
};

document.querySelectorAll(".operator").forEach((operator_button) => {
  operator_button.addEventListener("click", () => {
    /**
     * Issue #3: Have all operator buttons working correctly, (Calculate the complete current operation when another operator button is clicked)
     *
     * hints
     * - Render result
     * - Also render the result as the "currentOperation.firstOperands"
     * - DON'T render history
     */

    //(Calculate the complete current operation when another operator button is clicked)
    if (
      state.currentOperation.operator &&
      state.currentOperation["secondOperands"]
    ) {
      performOperationCalculation(); // calculate the current operation and set the result to the state.result

      state.currentOperation["firstOperands"] = state.result; // set the result to the state.currentOperation.firstOperands
      state.currentOperation["secondOperands"] = ""; // set the state.currentOperation.secondOperands to empty

      // render all updates to the screen
      render1stCurrentOperationOperand();
      render2ndCurrentOperationOperand();
      renderResult();
    }

    state.currentOperation.operator = operator_button.textContent;
    renderCurrentOperationOperator();
  });
});

// Register the Event for the Equals btn
document.querySelector(".equals").addEventListener("click", () => {
  /**
   * Issue #2: Have all operator buttons working. (For now we only the plus operator is working)
   *
   * hints
   * - Add else if for -, x, and / operator functionalities
   */

  performOperationCalculation(); // calculate the current operation and set the result to the state.result

  const operation = `${state.currentOperation["firstOperands"]} ${state.currentOperation.operator} ${state.currentOperation["secondOperands"]} = ${state.result}`;
  state.history.push(operation); // set state history for the operation

  renderResult(); // render the state result tot the DOM
  renderHistory(); // render the state history tot the DOM
});

// Register the Event for the AC btn
document.querySelector(".ac").addEventListener("click", () => {
  /**
    - #1. Clear the state.result 
    - #2. Render result
    - #3. Clear all state.operation fields
    - #4. Render all operations (firstOperands, secondOperands and Operator)
     */

  state.result = 0; // #1
  renderResult(); // #2

  state.currentOperation = {
    // #3
    firstOperands: "",
    secondOperands: "",
    operator: "",
  };

  render1stCurrentOperationOperand(); // #4
  render2ndCurrentOperationOperand();
  renderCurrentOperationOperator();
});
