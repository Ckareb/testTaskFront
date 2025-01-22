import React, { useState } from "react";
import axios from "axios";

const AddCustomer = ({ fetchAllCustomers }) => {
  const [newCustomer, setNewCustomer] = useState({
    customerCode: "",
    customerName: "",
    customerInn: "",
    customerKpp: "",
    customerLegalAddress: "",
    customerPostalAddress: "",
    customerEmail: "",
    customerCodeMain: "",
    isOrganization: false,
    isPerson: false,
  });

  const [errors, setErrors] = useState({}); // Для хранения ошибок

  // Проверки на стороне клиента
  const validateInputs = () => {
    const newErrors = {};

    if (!newCustomer.customerCode.trim()) {
      newErrors.customerCode = "Код клиента обязателен.";
    }

    if (!newCustomer.customerName.trim()) {
      newErrors.customerName = "Имя клиента обязательно.";
    }

    if (newCustomer.customerInn && !/^\d{12}$/.test(newCustomer.customerInn)) {
      newErrors.customerInn = "ИНН должен содержать ровно 12 цифр.";
    }

    if (newCustomer.customerKpp && !/^\d{9}$/.test(newCustomer.customerKpp)) {
      newErrors.customerKpp = "КПП должен содержать ровно 9 цифр.";
    }

    if (newCustomer.customerEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newCustomer.customerEmail)) {
      newErrors.customerEmail = "Введите валидный email.";
    }

    return newErrors;
  };

  // Метод для добавления нового клиента
  const addCustomer = async () => {
    const validationErrors = validateInputs();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // Если есть ошибки, останавливаем отправку
    }

    try {
      await axios.post("http://localhost:9090/api/customers/add", newCustomer);
      alert("Клиент успешно добавлен!");
      fetchAllCustomers(); // Обновление списка клиентов после добавления
      setNewCustomer({
        customerCode: "",
        customerName: "",
        customerInn: "",
        customerKpp: "",
        customerLegalAddress: "",
        customerPostalAddress: "",
        customerEmail: "",
        customerCodeMain: "",
        isOrganization: false,
        isPerson: false,
      });
      setErrors({});
    } catch (error) {
      console.error("Ошибка при добавлении клиента:", error);
      alert("Ошибка при добавлении клиента.");
    }
  };

  // Обработчик для чекбоксов
  const handleCheckboxChange = (field) => {
    setNewCustomer((prev) => ({
      ...prev,
      isOrganization: field === "isOrganization",
      isPerson: field === "isPerson",
    }));
  };

  return (
    <div>
      <h2>Добавить клиента</h2>
      <div>
        <label>Код клиента:</label>
        <input
          type="text"
          placeholder="Код клиента (обязательно)"
          value={newCustomer.customerCode}
          onChange={(e) => setNewCustomer({ ...newCustomer, customerCode: e.target.value })}
        />
        {errors.customerCode && <p style={{ color: "red" }}>{errors.customerCode}</p>}
      </div>

      <div>
        <label>Имя клиента:</label>
        <input
          type="text"
          placeholder="Имя клиента (обязательно)"
          value={newCustomer.customerName}
          onChange={(e) => setNewCustomer({ ...newCustomer, customerName: e.target.value })}
        />
        {errors.customerName && <p style={{ color: "red" }}>{errors.customerName}</p>}
      </div>

      <div>
        <label>ИНН:</label>
        <input
          type="text"
          placeholder="ИНН (ровно 12 цифр)"
          value={newCustomer.customerInn}
          onChange={(e) => setNewCustomer({ ...newCustomer, customerInn: e.target.value })}
        />
        {errors.customerInn && <p style={{ color: "red" }}>{errors.customerInn}</p>}
      </div>

      <div>
        <label>КПП:</label>
        <input
          type="text"
          placeholder="КПП (ровно 9 цифр)"
          value={newCustomer.customerKpp}
          onChange={(e) => setNewCustomer({ ...newCustomer, customerKpp: e.target.value })}
        />
        {errors.customerKpp && <p style={{ color: "red" }}>{errors.customerKpp}</p>}
      </div>

      <div>
        <label>Юридический адрес:</label>
        <input
          type="text"
          placeholder="Юридический адрес"
          value={newCustomer.customerLegalAddress}
          onChange={(e) => setNewCustomer({ ...newCustomer, customerLegalAddress: e.target.value })}
        />
      </div>

      <div>
        <label>Почтовый адрес:</label>
        <input
          type="text"
          placeholder="Почтовый адрес"
          value={newCustomer.customerPostalAddress}
          onChange={(e) => setNewCustomer({ ...newCustomer, customerPostalAddress: e.target.value })}
        />
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          placeholder="Email"
          value={newCustomer.customerEmail}
          onChange={(e) => setNewCustomer({ ...newCustomer, customerEmail: e.target.value })}
        />
        {errors.customerEmail && <p style={{ color: "red" }}>{errors.customerEmail}</p>}
      </div>

      <div>
        <label>Основной код клиента:</label>
        <input
          type="text"
          placeholder="Основной код клиента"
          value={newCustomer.customerCodeMain}
          onChange={(e) => setNewCustomer({ ...newCustomer, customerCodeMain: e.target.value })}
        />
      </div>

      <div>
        <label>Организация:</label>
        <input
          type="checkbox"
          checked={newCustomer.isOrganization}
          onChange={() => handleCheckboxChange("isOrganization")}
        />
      </div>

      <div>
        <label>Физическое лицо:</label>
        <input
          type="checkbox"
          checked={newCustomer.isPerson}
          onChange={() => handleCheckboxChange("isPerson")}
        />
      </div>

      <button onClick={addCustomer}>Добавить клиента</button>
    </div>
  );
};

export default AddCustomer;
