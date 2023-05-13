import { ethers } from "ethers";

const getContractInstance = (contractAddress, contractAbi, requiresSigner) => {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress,
      contractAbi,
      requiresSigner ? signer : provider
    );
    return contractInstance;
  }
};

export default getContractInstance;
