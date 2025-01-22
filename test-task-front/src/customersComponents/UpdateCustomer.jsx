import React, { useState } from "react";
import axios from "axios";

const UpdateCustomer = ({ fetchAllCustomers }) => {
  const [customerCodeMain, setCustomerCodeMain] = useState(""); // Код клиента для поиска
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

  // Метод для загрузки данных клиента по customerCodeMain
  const fetchCustomerData = async () => {
    try {
      const response = await axios.get(`http://localhost:9090/api/customers/codeMain/${customerCodeMain}`);
      if (response.data) {
        setCustomerData(response.data); // Заполняем данные клиента в state
      } else {
        alert("Клиент с указанным кодом не найден!");
      }
    } catch (error) {
      console.error("Ошибка при загрузке данных клиента:", error);
      alert("Ошибка при загрузке данных клиента.");
    }
  };

  // Метод для обновления данных клиента
  const updateCustomer = async () => {
    try {
      await axios.put(`http://localhost:9090/api/customers/update/${customerCodeMain}`, customerData);
      alert("Данные клиента успешно обновлены!");
    } catch (error) {
      console.error("Ошибка при обновлении данных клиента:", error);
      alert("Ошибка при обновлении данных клиента.");
    }
  };

  // Обработчик изменения input с ограничениями
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let newValue = value;

    // Ограничение длины для определенных полей
    if (name === "customerCode" && value.length > 10) {
      newValue = value.slice(0, 10);
    } else if (name === "customerInn" && value.length > 12) {
      newValue = value.slice(0, 12);
    } else if (name === "customerKpp" && value.length > 9) {
      newValue = value.slice(0, 9);
    }

    setCustomerData({
      ...customerData,
      [name]: type === "checkbox" ? checked : newValue, // Обработка чекбоксов и текстовых полей
    });
  };

  return (
    <div>
      <h2>Обновить данные клиента</h2>
      <input
        type="text"
        placeholder="Введите customerCodeMain для поиска"
        value={customerCodeMain}
        onChange={(e) => setCustomerCodeMain(e.target.value)}
        maxLength={10} // Ограничение длины
      />
      <button onClick={fetchCustomerData}>Загрузить данные клиента</button>

      {customerData.customerCode && (
        <div> 
          <h3>Информация о клиенте:</h3>
          <input
            type="text"
            placeholder="Код клиента"
            name="customerCode"
            value={customerData.customerCode}
            onChange={handleChange}
            maxLength={10} // Ограничение длины
          />
          <input
            type="text"
            placeholder="Имя клиента"
            name="customerName"
            value={customerData.customerName}
            onChange={handleChange}
            maxLength={50} // Ограничение длины
          />
          <input
            type="text"
            placeholder="ИНН"
            name="customerInn"
            value={customerData.customerInn}
            onChange={handleChange}
            maxLength={12} // Ограничение длины
          />
          <input
            type="text"
            placeholder="КПП"
            name="customerKpp"
            value={customerData.customerKpp}
            onChange={handleChange}
            maxLength={9} // Ограничение длины
          />
          <input
            type="text"
            placeholder="Юридический адрес"
            name="customerLegalAddress"
            value={customerData.customerLegalAddress}
            onChange={handleChange}
            maxLength={100} // Ограничение длины
          />
          <input
            type="text"
            placeholder="Почтовый адрес"
            name="customerPostalAddress"
            value={customerData.customerPostalAddress}
            onChange={handleChange}
            maxLength={100} // Ограничение длины
          />
          <input
            type="email"
            placeholder="Email"
            name="customerEmail"
            value={customerData.customerEmail}
            onChange={handleChange}
          />
          <label>
            Организация:
            <input
              type="checkbox"
              name="isOrganization"
              checked={customerData.isOrganization}
              onChange={handleChange}
            />
          </label>
          <label>
            Физическое лицо:
            <input
              type="checkbox"
              name="isPerson"
              checked={customerData.isPerson}
              onChange={handleChange}
            />
          </label>
          <button onClick={updateCustomer}>Обновить клиента</button>
        </div>
      )}
    </div>
  );
};

export default UpdateCustomer;
