import React, { useState } from "react";
import axios from "axios";

const UpdateCustomer = ({ updateCustomer}) => {
  const [customerCodeMain, setCustomerCodeMain] = useState(""); 
  const [customerData, setCustomerData] = useState({
    customerCode: "",
    customerName: "",
    customerInn: "",
    customerKpp: "",
    customerLegalAddress: "",
    customerPostalAddress: "",
    customerEmail: "",
    isOrganization: false,
    isPerson: false,
  });
  const [errors, setErrors] = useState({});
  const [customerUpdated, setCustomerUpdatedState] = useState(false); 
  const [loading, setLoading] = useState(false); 

  
const validateInputs = () => {
  const newErrors = {};

  
  const nameRegex = /^[A-Za-zА-Яа-яЁё\s]+$/;
  if (!customerData.customerName.trim() || !nameRegex.test(customerData.customerName)) {
    newErrors.customerName = "Имя клиента должно содержать только буквы.";
  }

  
  if (!/^[0-9]{10}$/.test(customerData.customerCode)) {
    newErrors.customerCode = "Код клиента должен содержать 10 цифр.";
  }

  
  if (!/^[0-9]{12}$/.test(customerData.customerInn)) {
    newErrors.customerInn = "ИНН должен содержать 12 цифр.";
  }

  
  if (!/^[0-9]{9}$/.test(customerData.customerKpp)) {
    newErrors.customerKpp = "КПП должен содержать 9 цифр.";
  }

  
  if (!customerData.customerEmail.trim() || !/\S+@\S+\.\S+/.test(customerData.customerEmail)) {
    newErrors.customerEmail = "Укажите корректный email.";
  }

  
  if (!/^[0-9]{10}$/.test(customerData.customerCodeMain)) {
    newErrors.customerCodeMain = "Основной код клиента должен содержать 10 цифр.";
  }

  return newErrors;
};


  
  const fetchCustomerData = async () => {
    setLoading(true); 
    try {
      const response = await axios.get(`http://localhost:9090/api/customers/codeMain/${customerCodeMain}`);
      if (response.data) {
        setCustomerData(response.data);
        setCustomerUpdatedState(false); 
      } else {
        alert("Клиент с указанным кодом не найден!");
      }
    } catch (error) {
      console.error("Ошибка при загрузке данных клиента:", error);
      alert("Ошибка при загрузке данных клиента.");
    } finally {
      setLoading(false); 
    }
  };

  
  const updateCustomerData = () => {
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    
    updateCustomer(customerCodeMain, customerData);
    setCustomerUpdatedState(true); 

    
    setTimeout(() => {
      setCustomerUpdatedState(false); 
      setCustomerData({
        customerCode: "",
        customerName: "",
        customerInn: "",
        customerKpp: "",
        customerLegalAddress: "",
        customerPostalAddress: "",
        customerEmail: "",
        isOrganization: false,
        isPerson: false,
      }); 
    }, 2000); 
  };

  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "isOrganization" && checked) {
      setCustomerData({ ...customerData, isOrganization: true, isPerson: false });
    } else if (name === "isPerson" && checked) {
      setCustomerData({ ...customerData, isOrganization: false, isPerson: true });
    } else {
      setCustomerData({
        ...customerData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  return (
    <div>
      <h2>Обновить данные клиента</h2>

      
      <div>
        <input
          type="text"
          placeholder="Введите customerCodeMain для поиска"
          value={customerCodeMain}
          onChange={(e) => setCustomerCodeMain(e.target.value)}
        />
        <button onClick={fetchCustomerData} disabled={loading}>
          {loading ? "Загрузка..." : "Загрузить данные клиента"}
        </button>
      </div>

      
      {customerData.customerCode && !customerUpdated && (
        <div>
          <h3>Информация о клиенте</h3>

          <div>
            <label>Код клиента:</label>
            <input
              type="text"
              name="customerCode"
              value={customerData.customerCode}
              onChange={handleChange}
            />
          </div>

         
          <div>
            <label>Имя клиента:</label>
            <input
              type="text"
              name="customerName"
              value={customerData.customerName}
              onChange={handleChange}
            />
            {errors.customerName && <p className="error">{errors.customerName}</p>}
          </div>

          
          <div>
            <label>ИНН:</label>
            <input
              type="text"
              name="customerInn"
              value={customerData.customerInn}
              onChange={handleChange}
            />
            {errors.customerInn && <p className="error">{errors.customerInn}</p>}
          </div>

          
          <div>
            <label>КПП:</label>
            <input
              type="text"
              name="customerKpp"
              value={customerData.customerKpp}
              onChange={handleChange}
            />
          </div>

          
          <div>
            <label>Юридический адрес:</label>
            <input
              type="text"
              name="customerLegalAddress"
              value={customerData.customerLegalAddress}
              onChange={handleChange}
            />
          </div>

          
          <div>
            <label>Почтовый адрес:</label>
            <input
              type="text"
              name="customerPostalAddress"
              value={customerData.customerPostalAddress}
              onChange={handleChange}
            />
          </div>

          
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="customerEmail"
              value={customerData.customerEmail}
              onChange={handleChange}
            />
          </div>

          
          <div>
            <label>
              Организация:
              <input
                type="checkbox"
                name="isOrganization"
                checked={customerData.isOrganization}
                onChange={handleChange}
              />
            </label>
          </div>

         
          <div>
            <label>
              Физическое лицо:
              <input
                type="checkbox"
                name="isPerson"
                checked={customerData.isPerson}
                onChange={handleChange}
              />
            </label>
          </div>

          
          <button onClick={updateCustomerData}>Обновить клиента</button>
        </div>
      )}

      
      {customerUpdated && <p>Данные клиента обновлены успешно!</p>}
    </div>
  );
};

export default UpdateCustomer;
