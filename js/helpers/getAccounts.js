import { ethers } from "ethers";

const getAccounts = async () => {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.listAccounts();
    return accounts;
  }
};

export default getAccounts;
