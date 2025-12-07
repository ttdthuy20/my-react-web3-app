// Register.jsx
import React, { useState } from 'react';

function Register() {
  // Trạng thái để lưu trữ dữ liệu form
  const [formData, setFormData] = useState({
    hoTen: '',
    diaChi: '',
    dienThoai: '',
    email: '',
    taiKhoan: '',
    matKhau: '',
  });

  // Trạng thái để kiểm tra xem ví MetaMask đã được kết nối chưa
  const [walletConnected, setWalletConnected] = useState(false);

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Xử lý đăng ký
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!walletConnected) {
      alert('Vui lòng kết nối ví MetaMask trước khi đăng ký.');
      return;
    }
    // Logic gửi dữ liệu đăng ký (API call, lưu vào database, v.v.)
    console.log('Thông tin đăng ký:', formData);
    console.log('Ví đã kết nối:', 'Địa chỉ ví...'); // Thực tế sẽ là địa chỉ ví
    alert('Đăng ký thành công (Mô phỏng)!');
  };

  // Hàm mô phỏng kết nối ví MetaMask
  const handleConnectWallet = async () => {
    // THỰC TẾ: Bạn sẽ dùng thư viện như Web3.js hoặc Ethers.js
    // để tương tác với window.ethereum
    try {
      console.log('Đang kết nối ví...');
      // const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      // console.log('Địa chỉ ví đã kết nối:', accounts[0]);
      setWalletConnected(true);
      alert('Kết nối ví MetaMask thành công!');
    } catch (error) {
      console.error('Lỗi kết nối ví:', error);
      alert('Lỗi kết nối ví MetaMask.');
    }
  };

  return (
    // Sử dụng lớp bg-gray-900 cho nền tối (Dark Mode) phổ biến trong Web3
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Thẻ đăng ký chính, max-w-md và mx-auto để căn giữa và giới hạn chiều rộng */}
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-10 rounded-xl shadow-2xl">
        
        {/* Tiêu đề */}
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Đăng ký thành viên Web3
          </h2>
        </div>

        {/* Nút Kết nối ví MetaMask */}
        <button
          onClick={handleConnectWallet}
          // Sử dụng `bg-orange-500` và `hover:bg-orange-600` đặc trưng của MetaMask
          className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors duration-200 
            ${walletConnected ? 'bg-green-600 hover:bg-green-700' : 'bg-orange-500 hover:bg-orange-600'}`}
        >
          {walletConnected ? '✅ Đã kết nối ví MetaMask' : 'Kết nối ví MetaMask'}
        </button>

        {/* Biểu mẫu đăng ký */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          
          {/* Lưới 2 cột cho Họ tên và Điện thoại */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              name="hoTen" 
              type="text" 
              value={formData.hoTen} 
              onChange={handleChange} 
              required 
              placeholder="Họ tên"
              // Các lớp tạo kiểu input: nền tối, chữ trắng, focus viền xanh
              className="appearance-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white rounded-md bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <input 
              name="dienThoai" 
              type="tel" 
              value={formData.dienThoai} 
              onChange={handleChange} 
              required 
              placeholder="Điện thoại"
              className="appearance-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white rounded-md bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Địa chỉ và Email */}
          <input 
            name="diaChi" 
            type="text" 
            value={formData.diaChi} 
            onChange={handleChange} 
            required 
            placeholder="Địa chỉ"
            className="appearance-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white rounded-md bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <input 
            name="email" 
            type="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
            placeholder="Email"
            className="appearance-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white rounded-md bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />

          {/* Tài khoản và Mật khẩu */}
          <input 
            name="taiKhoan" 
            type="text" 
            value={formData.taiKhoan} 
            onChange={handleChange} 
            required 
            placeholder="Tên tài khoản"
            className="appearance-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white rounded-md bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <input 
            name="matKhau" 
            type="password" 
            value={formData.matKhau} 
            onChange={handleChange} 
            required 
            placeholder="Mật khẩu"
            className="appearance-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white rounded-md bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />

          {/* Nút Đăng ký */}
          <div>
            <button
              type="submit"
              // Lớp nền và hover màu xanh tím, phù hợp với màu focus
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              Đăng ký
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;