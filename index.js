import { ethers } from "./ethers.js";
import { abi, contractAddress } from "./constants.js";

const connectButton = document.getElementById("connectButton");
const createButton = document.getElementById("createButton");
connectButton.onclick = connect;
createButton.onclick = create;

async function connect() {
  if (typeof window.ethereum !== "undefined") {
    try {
      await ethereum.request({ method: "eth_requestAccounts" });
    } catch (error) {
      console.log(error);
    }
    connectButton.innerHTML = "Connected";
    const accounts = await ethereum.request({ method: "eth_accounts" });
    console.log(accounts);
  } else {
    connectButton.innerHTML = "Please install MetaMask";
  }
}

async function create() {
  const address = document.getElementById("address").value;
  try {
    const id = generateID(address);
    const proof = "ehter";
    console.log(`Sending ID and Proof to blockchain...`);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const transactionResponse = await contract.createDIDDocument(
      id,
      address,
      proof
    );
    await listenForTransactionMine(transactionResponse, provider);
    console.log("done");
  } catch (error) {
    console.log(error);
  }
}

function listenForTransactionMine(transactionResponse, provider) {
  console.log(`Mining ${transactionResponse.hash}`);
  return new Promise((resolve, reject) => {
    try {
      provider.once(transactionResponse.hash, (transactionReceipt) => {
        console.log(
          `Completed with ${transactionReceipt.confirmations} confirmations. `
        );
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}

async function isValidAddress(address) {
  const balance = await web3.eth.getBalance(address, (err, balance) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Balance: ${web3.utils.fro.mWei(balance, "ether")} ETH`);
    }
  });
  return balance > 0;
}

function generateID(address) {
  if (isValidAddress(address)) {
    const uniqueId =
      "id-" + window.performance.now().toString().replace(".", "");
    return uniqueId;
  } else {
    console.log("错误地址！");
  }
}
