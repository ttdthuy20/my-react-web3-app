import { useEffect, useState } from "react";
import { ethers } from "ethers";
import GreeterABI from "../contract/GreeterABI.json";
import contractData from "../contract/contractAddress.json";
import WalletConnector from "../components/WalletConnector";

export default function GreeterDemo() {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [greeting, setGreeting] = useState("");
  const [input, setInput] = useState("");

  function handleConnect(acc) {
    setAccount(acc);
    initContract(acc);
  }

  async function initContract(acc) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const greeter = new ethers.Contract(contractData.address, GreeterABI, signer);
    setContract(greeter);

    const g = await greeter.greet();
    setGreeting(g);
  }

  async function updateGreeting() {
    if (!contract) return;
    const tx = await contract.setGreeting(input);
    await tx.wait();
    setGreeting(await contract.greet());
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Greeter Web3 Demo</h1>
      <WalletConnector onConnect={handleConnect} />
      {account && (
        <>
          <p>Greeting hiện tại: {greeting}</p>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nhập lời chào mới"
          />
          <button onClick={updateGreeting}>Cập nhật</button>
        </>
      )}
    </div>
  );
}
