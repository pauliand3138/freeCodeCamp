const calcData = [
{ id: "clear", value: "AC" },
{ id: "divide", value: "/" },
{ id: "multiply", value: "x" },
{ id: "seven", value: 7 },
{ id: "eight", value: 8 },
{ id: "nine", value: 9 },
{ id: "subtract", value: "-" },
{ id: "four", value: 4 },
{ id: "five", value: 5 },
{ id: "six", value: 6 },
{ id: "add", value: "+" },
{ id: "one", value: 1 },
{ id: "two", value: 2 },
{ id: "three", value: 3 },
{ id: "equals", value: "=" },
{ id: "zero", value: 0 },
{ id: "decimal", value: "." }];


const operators = ["AC", "/", "x", "+", "-", "="];

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const Display = ({ input, output }) => {
  return /*#__PURE__*/(
    React.createElement("div", { className: "output" }, /*#__PURE__*/
    React.createElement("span", { className: "result" }, output), /*#__PURE__*/
    React.createElement("span", { id: "display", className: "input" }, input)));


};

const Key = ({ keyData: { id, value }, handleInput }) => {
  return /*#__PURE__*/(
    React.createElement("button", { id: id, onClick: () => handleInput(value) }, value));

};

const Keyboard = ({ handleInput }) => {
  return /*#__PURE__*/(
    React.createElement("div", { className: "keys" },
    calcData.map((key) => /*#__PURE__*/
    React.createElement(Key, { key: key.id, keyData: key, handleInput: handleInput }))));


};

const App = () => {
  const [input, setInput] = React.useState("0");
  const [output, setOutput] = React.useState("");
  const [calculatorData, setCalculatorData] = React.useState("");

  const handleSubmit = () => {
    const total = eval(calculatorData);
    setInput(`${total}`);
    setOutput(`${total}`);
    setCalculatorData(`${total}`);
  };

  const handleClear = () => {
    setInput("0");
    setCalculatorData("");
  };

  const handleNumbers = value => {
    if (!calculatorData.length) {
      setInput(`${value}`);
      setCalculatorData(`${value}`);
    } else {
      if (value === 0 && (calculatorData === "0" || input === "0")) {
        setCalculatorData(`${calculatorData}`);
      } else {
        const lastChar = calculatorData.charAt(calculatorData.length - 1);
        const isLastCharOperator =
        lastChar === "*" || operators.includes(lastChar);

        setInput(isLastCharOperator ? `${value}` : `${input}${value}`);
        setCalculatorData(`${calculatorData}${value}`);
      }
    }
  };

  const dotOperator = () => {
    const lastChar = calculatorData.charAt(calculatorData.length - 1);
    if (!calculatorData.length) {
      setInput("0.");
      setCalculatorData("0.");
    } else {
      if (lastChar === "*" || operators.includes(lastChar)) {
        setInput("0.");
        setCalculatorData(`${calculatorData}`);
      } else {
        setInput(
        lastChar === "." || input.includes(".") ? `${input}` : `${input}.`);
        const formattedValue = lastChar === "." || input.includes(".") ?
        `${calculatorData}` : `${calculatorData}.`;
        setCalculatorData(formattedValue);
      }
    }
  };

  const handleOperators = value => {
    if (calculatorData.length) {
      setInput(`${value}`);
      const beforeLastChar = calculatorData.charAt(calculatorData.length - 2);
      const beforeLastCharIsOperator =
      operators.includes(beforeLastChar) || beforeLastChar === "*";

      const lastChar = calculatorData.charAt(calculatorData.length - 1);
      const lastCharIsOperator = operators.includes(lastChar) || lastChar === "*";

      const validOutput = value === "x" ? "*" : value;

      if (
      lastCharIsOperator && value !== "-" ||
      beforeLastCharIsOperator && lastCharIsOperator)
      {
        if (beforeLastCharIsOperator) {
          const updatedValue = `${calculatorData.substring(0, calculatorData.length - 2)}${value}`;
          setCalculatorData(updatedValue);
        } else {
          setCalculatorData(`${calculatorData.substring(0, calculatorData.length - 1)}${validOutput}`);
        }
      } else {
        setCalculatorData(`${calculatorData}${validOutput}`);
      }
    }
  };


  const handleInput = value => {
    const number = numbers.find(num => num === value);
    const operator = operators.find(op => op === value);

    switch (value) {
      case "=":
        handleSubmit();
        break;
      case "AC":
        handleClear();
        break;
      case number:
        handleNumbers(value);
        break;
      case ".":
        dotOperator(value);
        break;
      case operator:
        handleOperators(value);
        break;
      default:
        break;}

  };

  const handleOutput = () => {
    setOutput(calculatorData);
  };

  React.useEffect(() => {
    handleOutput();
  }, [calculatorData]);

  return /*#__PURE__*/(
    React.createElement("div", { className: "container" }, /*#__PURE__*/
    React.createElement("div", { className: "calculator" }, /*#__PURE__*/
    React.createElement(Display, { input: input, output: output }), /*#__PURE__*/
    React.createElement(Keyboard, { handleInput: handleInput }))));



};

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("app"));