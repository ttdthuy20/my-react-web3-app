import { useState } from "react";
import { ethers } from "ethers";

export default function Login() {
  const [account, setAccount] = useState(null);

  async function connectWallet() {
    if (!window.ethereum) return alert("Cài MetaMask trước!");

    try {
      const [acc] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(acc);
    } catch (err) {
      console.error(err);
      alert("Không thể kết nối ví!");
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Đăng nhập thành viên</h1>
      {!account ? (
        <button onClick={connectWallet}>Kết nối MetaMask</button>
      ) : (
        <p>Đã đăng nhập: {account}</p>
      )}
    </div>
  );
}
