import { useEffect, useState } from "react";
import { ethers } from "ethers";
import getContractInstance from "../helpers/getContractInstance";

const useContractViewFunc = (item) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    const fetch = async () => {
      if (window.ethereum && item.selectedFunc.contract) {
        try {
          const contractInstance = getContractInstance(
            item.selectedFunc.contract.address,
            JSON.stringify(item.selectedFunc.contract.abi),
            item.selectedFunc.stateMutability === "view" ? false : true
          );

          const paramsArr = [];

          const res = await contractInstance[item.selectedFunc.name](
            ...paramsArr
          );

          if (typeof res === "string") {
            setResponseMessage(res);
          }

          if (res?._isBigNumber) {
            setResponseMessage(res.toNumber());
          }
        } catch (err) {
          console.log("err:", err);
        }
      }
    };

    fetch();
  }, [item.config.configSwitch]);

  return [loading, error, responseMessage];
};

export default useContractViewFunc;
