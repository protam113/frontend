import React, { useState, useEffect } from 'react';
import { FaCog } from 'react-icons/fa';
import { virtualMachinesData } from '../../../Data/SystemData.js'; // Import dữ liệu máy ảo
import { provinces } from '../../../Data/DataLocat.js'; // Import danh sách tỉnh/thành phố

const ITEMS_PER_PAGE = 20; // Số lượng máy ảo mỗi trang

const AdSystem = () => {
  const [selectedProvince, setSelectedProvince] = useState(''); // State cho tỉnh/thành phố được chọn
  const [selectedDistrict, setSelectedDistrict] = useState(''); // State cho quận/huyện được chọn
  const [machines, setMachines] = useState(virtualMachinesData); // State cho dữ liệu máy ảo
  const [currentPage, setCurrentPage] = useState(1); // State cho trang hiện tại

  // Function để xử lý khi người dùng thay đổi tỉnh/thành phố được chọn
  const handleProvinceChange = (e) => {
    setSelectedProvince(e.target.value);
    setSelectedDistrict(''); // Reset quận/huyện khi chọn lại tỉnh/thành phố
    setCurrentPage(1); // Reset về trang đầu tiên khi thay đổi tỉnh/thành phố
  };

  // Lọc và lấy danh sách quận/huyện dựa trên tỉnh/thành phố được chọn
  const getDistrictsByProvince = () => {
    if (selectedProvince === '') {
      return [];
    }
    const province = provinces.find((p) => p.name === selectedProvince);
    return province ? province.districts : [];
  };

  // Function để xử lý khi người dùng thay đổi quận/huyện được chọn
  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    setCurrentPage(1); // Reset về trang đầu tiên khi thay đổi quận/huyện
  };

  // Function để lọc dữ liệu máy ảo theo tỉnh/thành phố và quận/huyện được chọn
  const filteredMachines = machines.filter((machine) => {
    if (selectedProvince !== '' && machine.location.province !== selectedProvince) {
      return false;
    }
    if (selectedDistrict !== '' && machine.location.district !== selectedDistrict) {
      return false;
    }
    return true;
  });

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredMachines.length / ITEMS_PER_PAGE);

  // Get the items for the current page
  const currentMachines = filteredMachines.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Function để cập nhật ngẫu nhiên nhiệt độ và công suất của các máy ảo
  const updateMachineData = () => {
    setMachines((prevMachines) => {
      return prevMachines.map((machine) => {
        const randomTemperature = Math.floor(Math.random() * 50) + 50; // Nhiệt độ từ 50 đến 100
        const randomPower = Math.floor(Math.random() * 1000) + 500; // Công suất từ 500 đến 1500
        return {
          ...machine,
          temperature: randomTemperature,
          power: randomPower,
        };
      });
    });
  };

  // Effect để làm mới dữ liệu mỗi giây
  useEffect(() => {
    const interval = setInterval(() => {
      updateMachineData(); // Cập nhật dữ liệu máy ảo ngẫu nhiên mỗi giây
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval khi component unmount
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 pt-6">
      {/* Phần tìm kiếm */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold mb-4">Tìm kiếm máy ảo</h2>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 md:mr-2">
            <label htmlFor="province" className="block text-lg font-semibold mb-1">Chọn tỉnh/thành phố:</label>
            <select
              id="province"
              value={selectedProvince}
              onChange={handleProvinceChange}
              className="bg-white border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 w-full"
            >
              {/* Option sẽ được đưa vào từ danh sách provinces */}
              <option value="">Tất cả</option>
              {provinces.map((province, index) => (
                <option key={index} value={province.name}>{province.name}</option>
              ))}
            </select>
          </div>
          
          <div className="md:w-1/2 md:ml-2 mt-4 md:mt-0">
            <label htmlFor="district" className="block text-lg font-semibold mb-1">Chọn quận/huyện:</label>
            <select
              id="district"
              value={selectedDistrict}
              onChange={handleDistrictChange}
              className="bg-white border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 w-full"
            >
              {/* Option sẽ được cập nhật dựa vào tỉnh/thành phố người dùng chọn */}
              <option value="">Tất cả</option>
              {getDistrictsByProvince().map((district, index) => (
                <option key={index} value={district}>{district}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Hiển thị thông tin cho từng máy ảo */}
      {currentMachines.length > 0 ? (
        currentMachines.map((machine) => (
          <div key={machine.id} className="bg-gray-100 p-4 rounded-lg shadow-md mb-6 flex flex-col md:flex-row items-center">
            <div className="flex-1 mb-4 md:mb-0">
              <h2 className="text-xl font-bold mb-2">{`Máy ảo ${machine.id}`}</h2>
              <p className="text-lg mb-2">{`Người sở hữu: ${machine.owner}`}</p>
              <p className="text-lg mb-2">{`Địa chỉ: ${machine.location.province}, ${machine.location.district}`}</p>
            </div>
            
            {/* Ô nhiệt độ tổng thể */}
            <div className={`bg-white p-4 rounded-lg shadow-md flex-1 mb-4 md:mb-0 md:mr-4 ${
              machine.temperature > 95 ? 'bg-red-300' : (machine.temperature > 90 && machine.temperature <= 95) ? 'bg-yellow-300' : 'bg-green-300'
            }`}>
              <h3 className="text-lg font-semibold mb-2 text-center">Nhiệt độ tổng thể</h3>
              <p className="text-xl text-center">{`${machine.temperature}°C`}</p>
            </div>
            
            {/* Ô công suất tổng thể */}
            <div className={`bg-white p-4 rounded-lg shadow-md flex-1 ${
              machine.power > 1200 ? 'bg-red-300' : (machine.power > 700 && machine.power <= 1200) ? 'bg-yellow-300' : 'bg-green-300'
            }`}>
              <h3 className="text-lg font-semibold mb-2 text-center">Công suất tổng thể</h3>
              <p className="text-xl text-center">{`${machine.power} kW`}</p>
            </div>
            
            {/* Nút xem chi tiết */}
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors mt-4 md:mt-0">
              Xem chi tiết
            </button>
          </div>
        ))
      ) : (
        <p className="text-lg text-center">Không có máy ảo nào phù hợp với yêu cầu tìm kiếm.</p>
      )}

      {/* Phần điều hướng trang */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 mr-2 rounded-lg ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        >
          Trang trước
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 ml-2 rounded-lg ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        >
          Trang sau
        </button>
      </div>
    </div>
  );
};

export default AdSystem;
