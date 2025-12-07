// connect.js
const { ethers } = require('ethers');

// 1. Dữ liệu Hợp đồng (Thực tế nên lưu ABI vào file riêng)
// Thay thế đoạn ABI mẫu dưới đây bằng ABI bạn đã copy từ Remix
const contractABI = [
    // Đây là một ví dụ đơn giản của ABI cho hai hàm: store(uint256) và retrieve() returns (uint256)
    "function store(uint256 num)",
    "function retrieve() view returns (uint256)"
]; 
const contractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138"; // Thay thế bằng địa chỉ đã copy từ Remix

// 2. Cấu hình Provider và Signer
// Provider: Cho phép đọc dữ liệu từ Blockchain (chỉ xem)
// Signer: Cho phép gửi giao dịch (thay đổi trạng thái, cần private key hoặc MetaMask/HD Wallet)

// Thay thế bằng RPC URL của mạng bạn triển khai (Infura, Alchemy, hoặc local node)
//const rpcUrl = "https://goerli.infura.io/v3/YOUR_INFURA_PROJECT_ID"; 
const rpcUrl = "http://localhost:5173/";
const provider = new ethers.JsonRpcProvider(rpcUrl);

// Ví dụ về Signer (cần khi gọi hàm thay đổi trạng thái như 'store')
// Cần private key của ví đã triển khai hoặc ví có ETH để gửi giao dịch
const privateKey = "0xd9145CCE52D386f254917e481eB44e9943F391382416524cfa91154e21f1f3a039492eb76d3aa4817155cf85e029dadf93fb9af0"; // KHÔNG BAO GIỜ LƯU PRIVATE KEY TRỰC TIẾP TRONG MÃ NỀN (PRODUCTION)
const wallet = new ethers.Wallet(privateKey, provider);

// 3. Khởi tạo Contract Instance
const readContract = new ethers.Contract(contractAddress, contractABI, provider); // Dùng cho hàm chỉ đọc (view/pure)
const writeContract = new ethers.Contract(contractAddress, contractABI, wallet); // Dùng cho hàm ghi (giao dịch)

async function interactWithContract() {
    console.log("--- Bắt đầu tương tác với Smart Contract ---");

    try {
        // A. GỌI HÀM ĐỌC DỮ LIỆU (READ) - Không tốn phí Gas
        // Ví dụ: gọi hàm retrieve()
        const currentValue = await readContract.retrieve();
        console.log(`Giá trị hiện tại của biến: ${currentValue.toString()}`);

        // B. GỌI HÀM GHI DỮ LIỆU (WRITE) - Tốn phí Gas và cần Signer
        console.log("Đang gửi giao dịch để thay đổi giá trị...");
        const newValue = 42;
        
        // Gửi giao dịch
        const tx = await writeContract.store(newValue);
        console.log(`Giao dịch đã được gửi. Hash: ${tx.hash}`);

        // Chờ giao dịch được xác nhận trên Blockchain
        await tx.wait(); 
        console.log(`✅ Giao dịch thành công!`);

        // C. Kiểm tra lại giá trị sau khi ghi
        const updatedValue = await readContract.retrieve();
        console.log(`Giá trị MỚI: ${updatedValue.toString()}`);

    } catch (error) {
        console.error("❌ Lỗi tương tác hợp đồng:", error.message);
    }
}

interactWithContract();