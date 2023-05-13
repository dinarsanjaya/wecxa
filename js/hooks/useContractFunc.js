import { useState } from "react";
import { ethers } from "ethers";
import getContractInstance from "../helpers/getContractInstance";
import getAccounts from "../helpers/getAccounts";
import { useDispatch } from "react-redux";

const useContractFunc = (
  contractAddress,
  contractAbi,
  item,
  func,
  interfaceFunctions,
  dispatchFuncMainParams
) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [error, setError] = useState(null);

  const getParamsArr = () => {
    const paramsArr = [];

    func.inputs.forEach((input) => {
      if (input.type.includes("uint") & isNaN(parseInt(input.value))) {
        throw {
          message: `${
            input.placeholder.charAt(0).toUpperCase() +
            input.placeholder.slice(1)
          } has to be a number`,
        };
      }
      if (input.type.includes("string") & (typeof input.value !== "string")) {
        throw {
          message: `${
            input.placeholder.charAt(0).toUpperCase() +
            input.placeholder.slice(1)
          } hast to be a string (text)`,
        };
      }
      if (
        input.type.includes("address") & !ethers.utils.isAddress(input.value)
      ) {
        throw {
          message: `${
            input.placeholder.charAt(0).toUpperCase() +
            input.placeholder.slice(1)
          } hast to be an address`,
        };
      }

      if (
        input.type.includes("uint") &
        (input.value % 1 !== 0) &
        item.selectedFunc.price.isInputDependant.value
      ) {
        console.log("original input:", input.value);
        paramsArr.push(ethers.utils.parseEther(input.value));
      } else {
        paramsArr.push(input.value);
      }
    });
    return paramsArr;
  };

  const afterTransactionExecution = (funcType) => {
    console.log("funcType:", funcType);
    // if (funcType !== "view") {
    //   console.log("gets here");
    dispatch(interfaceFunctions.updateDynamicContractDataItems());
    // }

    dispatch(
      interfaceFunctions.clearItemSelectedFuncInputValues({
        ...dispatchFuncMainParams,
      })
    );
  };

  const getFuncPrice = () => {
    let price = func.price.priceValue;
    func.inputs.forEach((input) => {
      if (
        item.selectedFunc.price.isInputDependant.value &&
        item.selectedFunc.price.isInputDependant.input.id === input.id
      ) {
        switch (item.selectedFunc.price.isInputDependant.type) {
          case "inputValue":
            price = input.value;
            break;
          case "multipleOfInputValue":
            if (parseInt(input.value) === 0) {
              // throw {
              //   message: `${
              //     input.placeholder.charAt(0).toUpperCase() +
              //     input.placeholder.slice(1)
              //   } has to be greater than 0`,
              // };
            }
            price = (func.price.priceValue * input.value).toString();

            break;
        }
      }
    });

    return price;
  };

  const callContractFunc = async () => {
    setLoading(true);
    setError(null);
    setResponseMessage("");

    try {
      const accounts = await getAccounts();

      if ((accounts.length === 0) & (func.stateMutability !== "view")) {
        throw { message: "No Metamask connected!" };
      }

      if (item.selectedFunc.name === "Select Function") {
        throw { message: "Button isn't connected to a function" };
      }

      const paramsArr = getParamsArr();

      const contractInstance = getContractInstance(
        contractAddress,
        contractAbi,
        func.stateMutability === "view" ? false : true
      );

      let res;
      let receipt;

      switch (func.stateMutability) {
        case "view":
          res = await contractInstance[func.name](...paramsArr);

          if (typeof res === "string") {
            setResponseMessage(res);
          }

          if (res?._isBigNumber) {
            console.log("bigNumber?:", res.toNumber());
            setResponseMessage(res.toNumber());
          }
          afterTransactionExecution("view");
          setLoading(false);
          break;

        case "nonpayable":
          res = await contractInstance[func.name](...paramsArr);

          receipt = await res.wait();

          setResponseMessage(item.successMessage);
          afterTransactionExecution("nonpayable");
          setLoading(false);

          break;
        case "payable":
          let price = getFuncPrice();
          res = await contractInstance[func.name](...paramsArr, {
            value: ethers.utils.parseEther(price),
          });
          receipt = await res.wait();

          setResponseMessage(item.successMessage);
          afterTransactionExecution("payable");
          setLoading(false);

          break;
      }
    } catch (err) {
      if (err.error?.message) {
        setError(err.error.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError(
          "There was a problem running the function this button is connected to"
        );
      }
      console.log("err:", err.message);
      setLoading(false);
    }
  };

  return [callContractFunc, loading, error, responseMessage];
};

export default useContractFunc;
