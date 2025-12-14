import { useState } from "react";
import illustrationEmptyImage from "./illustration-empty.svg";
import iconCalculator from "./icon-calculator.svg";

function Index() {
  const [mortgageInfo, setMortgageInfo] = useState({
    amount: null,
    years: null,
    interest: null,
  });
  const [isInterestOnly, setIsInterestOnly] = useState(false);
  const [calculateRepayments, setCalculateRepayments] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMortgageInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault;
    if (
      mortgageInfo.amount > 0 &&
      mortgageInfo.interest > 0 &&
      mortgageInfo.years > 0
    ) {
      setCalculateRepayments(true);
    }
  };
  const monthlyRepayments = () => {
    let p = mortgageInfo.amount;
    let i = mortgageInfo.interest / 12;
    let y = mortgageInfo.years * 12;

    let up = Math.pow(1 + i, y) * i;
    let down = Math.pow(1 + i, y) - 1;

    let final = (p * up) / down;
    return final.toFixed(2).toLocaleString();
  };
  const termRepayments = () => {
    let p = mortgageInfo.amount;
    let i = mortgageInfo.interest / 12;
    let y = mortgageInfo.years * 12;

    let up = Math.pow(1 + i, y) * i;
    let down = Math.pow(1 + i, y) - 1;

    let final = (p * up) / down;

    let term = final * 12 * mortgageInfo.years;

    return term.toFixed(2).toLocaleString();
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* mortgage form section */}
      <div className="m-1 md:mx-4 p-10 md:flex-1 ">
        <div className="flex flex-col md:flex-row md:justify-between mb-4">
          <p className="font-PlusJakartaSans-Bold text-xl text-Slate900">
            Mortgage Calculator
          </p>
          <p
            className="font-PlusJakartaSans-VariableFont_wght text-Slate500 underline hover:cursor-pointer"
            onClick={() => window.location.reload()}
          >
            Clear All
          </p>
        </div>

        <form action={handleSubmit} className="flex flex-col gap-4">
          <label
            htmlFor="amount"
            className="text-Slate700 font-PlusJakartaSans-Medium"
          >
            Mortgage Amount
          </label>
          <div className="flex justify-between border border-Slate300 font-PlusJakartaSans-Medium">
            <div
              className={` p-2 text-center text-Slate500 font-PlusJakartaSans-Bold ${
                mortgageInfo.amount < 10 ? "bg-Red text-white" : "bg-slate-100"
              }`}
            >
              $
            </div>
            <input
              type="number"
              name="amount"
              id="amount"
              min={10}
              value={mortgageInfo.amount}
              onChange={handleChange}
              className={`w-full border ${
                mortgageInfo.amount < 10 ? "border-Red" : "border-slate-500"
              }`}
              required
            />
          </div>

          {/* mortgage term and interest selection area */}
          <div className="flex flex-col md:flex-row md:gap-5">
            <div className="md:w-[50%]">
              <label
                htmlFor="years"
                className="text-Slate700 font-PlusJakartaSans-Medium"
              >
                Mortgage Term
              </label>
              <div className="flex justify-between border border-Slate300 font-PlusJakartaSans-Medium">
                <input
                  type="number"
                  name="years"
                  id="years"
                  value={mortgageInfo.years}
                  onChange={handleChange}
                  className={`w-full border ${
                    mortgageInfo.years < 5 || mortgageInfo.years > 40
                      ? "border-Red"
                      : "border-slate-500"
                  }`}
                  min={5}
                  max={40}
                  required
                />
                <div
                  className={` p-2 text-center text-Slate500 font-PlusJakartaSans-Bold ${
                    mortgageInfo.years < 5 || mortgageInfo.years > 40
                      ? "bg-Red text-white"
                      : "bg-slate-100"
                  }`}
                >
                  years
                </div>
              </div>
            </div>
            <div className="md:w-[50%]">
              <label
                htmlFor="interest"
                className="text-Slate700 font-PlusJakartaSans-Medium"
              >
                Interest Rate
              </label>
              <div className="flex justify-between border border-Slate300 font-PlusJakartaSans-Medium">
                <input
                  type="number"
                  name="interest"
                  id="interest"
                  value={mortgageInfo.interest}
                  onChange={handleChange}
                  className={`w-full border ${
                    mortgageInfo.interest < 5 || mortgageInfo.interest > 100
                      ? "border-Red"
                      : "border-slate-500"
                  }`}
                  min={5}
                  max={100}
                  required
                />
                <div
                  className={` p-2 text-center text-Slate500 font-PlusJakartaSans-Bold ${
                    mortgageInfo.interest < 5 || mortgageInfo.interest > 100
                      ? "bg-Red text-white"
                      : "bg-slate-100"
                  }`}
                >
                  %
                </div>
              </div>
            </div>
          </div>

          {/* mortgage type selection area */}
          <div className="flex flex-col gap-4">
            <label
              htmlFor="Mortgage-Type"
              className="text-Slate700 font-PlusJakartaSans-Medium"
            >
              Mortgage Type
            </label>
            {/* container for repayment radio option */}
            <div
              className={`flex gap-1 border p-4 font-PlusJakartaSans-Medium ${
                isInterestOnly
                  ? "bg-Lime/10 border-Lime"
                  : "bg-none border-Slate500"
              }`}
            >
              <input
                type="radio"
                name="Mortgage-type"
                id="Mortgage-type"
                className="accent-Lime border-Lime"
                checked={isInterestOnly}
                onChange={() => setIsInterestOnly(true)}
              />
              <p className="font-PlusJakartaSans-Bold text-Slate900">
                Repayment
              </p>
            </div>
            {/* container for repayment radio option */}

            {/* container for interest only radio option */}
            <div
              className={`flex gap-1 border p-4 font-PlusJakartaSans-Medium ${
                isInterestOnly
                  ? "bg-none border-Slate500"
                  : "bg-Lime/10 border-Lime"
              }`}
            >
              <input
                type="radio"
                name="Mortgage-type"
                id="Mortgage-type"
                className="accent-Lime"
                checked={!isInterestOnly}
                onChange={() => setIsInterestOnly(false)}
              />
              <p className="font-PlusJakartaSans-Bold text-Slate900">
                Interest Only
              </p>
            </div>
            {/* container for interest only radio option */}
          </div>

          {/* Calculate Repayments button */}
          <button className="bg-Lime rounded-full p-4 hover:cursor-pointer hover:bg-Lime/50 font-PlusJakartaSans-Medium">
            <div className="flex gap-4 justify-center">
              <img src={iconCalculator} alt="calculator-icon" />
              <p>Calculate Repayments</p>
            </div>
          </button>
          {/* Calculate Repayments button */}
        </form>
      </div>

      {/* results section */}
      <div className="bg-Slate900 flex flex-col p-10 md:flex-1 md:rounded-bl-[4rem] md:rounded-r-2xl">
        {/* this shows when form is empty */}
        {!calculateRepayments && (
          <div className="flex flex-col self-center">
            <img src={illustrationEmptyImage} alt="" className="h-50" />
            <div className="text-center font-PlusJakartaSans-Medium text-white">
              <h3 className="text-xl mb-4">Results shown here</h3>
              <p className="text-Slate300">
                Complete the form and click “calculate repayments” to see what
                your monthly repayments would be.
              </p>
            </div>
          </div>
        )}{" "}
        {/* this shows when form is empty */}
        {/* this shows wen form is submitted */}
        {calculateRepayments && (
          <div className="flex flex-col gap-2 justify-center">
            <h1 className="text-2xl font-PlusJakartaSans-Medium text-Slate100">
              Your results
            </h1>
            <p className="text-Slate300 font-PlusJakartaSans-VariableFont_wght">
              Your results are shown below based on the information you
              provided. To adjust the results, edit the form and click
              “calculate repayments” again.
            </p>
            <div className="bg-black/20 mt-5 flex flex-col gap-4 p-10 rounded-2xl border-t-4 border-Lime">
              <h1 className="font-PlusJakartaSans-VariableFont_wght text-Slate300">
                Your monthly repayments
              </h1>
              <p className="font-PlusJakartaSans-Bold text-3xl text-Lime border-b pb-4">
                ${monthlyRepayments()}
              </p>
              <h1 className="font-PlusJakartaSans-VariableFont_wght text-Slate300">
                Total you will pay over the term
              </h1>
              <p className="font-PlusJakartaSans-Medium text-2xl text-white">
                ${termRepayments()}
              </p>
            </div>
          </div>
        )}{" "}
        {/* this shows wen form is submitted */}
      </div>
    </div>
  );
}
export default Index;
