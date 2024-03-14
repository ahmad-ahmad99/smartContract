import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import smartContractAPI from './smartContractAPI.json';

const useSmartContract = () => {
  const contractAddress = '0xcD6a42782d230D7c13A74ddec5dD140e55499Df9';

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [defaultAccount, setDefaultAccount] = useState<string | null>(null);
  const [connectButtonText, setConnectButtonText] = useState<string | null>('Connect Wallet');
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [contractVal, setContractVal] = useState<string | null>(null);

  const connectToWallet = () => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_requestAccounts' }).then((result: Array<string>) => {
        accountChangeHandler(result[0]);
        setConnectButtonText('Wallet Connected');
      });
    } else {
      setErrorMessage('Need To Install MetaMask');
    }
  };

  const accountChangeHandler = (newAccount: string) => {
    setDefaultAccount(newAccount);
    updateEthers();
  };

  const updateEthers = async () => {
    let tempProvider = new ethers.BrowserProvider(window.ethereum);
    setProvider(tempProvider);

    let tempSigner = await tempProvider.getSigner();
    setSigner(tempSigner);

    let tempContract = new ethers.Contract(contractAddress, smartContractAPI, tempSigner);
    setContract(tempContract);
  };

  const getMessage = async () => {
    try {
      if (contract) {
        let message: string = await contract.getMessage();
        console.log('getMessage', getMessage());

        setContractVal(message);
      }
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    }
  };

  const handlerForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (contract) {
      contract.setMessage(event.currentTarget.message.value);
    }
  };

  return {
    errorMessage,
    defaultAccount,
    connectButtonText,
    provider,
    signer,
    contract,
    contractVal,
    connectToWallet,
    handlerForm,
    getMessage,
  };
};

export default useSmartContract;
