import React, { useState } from "react";

const AddCustomer = ({ addCustomer }) => {
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

  const [errors, setErrors] = useState({});

  
  const validateInputs = () => {
    const newErrors = {};

    
    if (!newCustomer.customerName.trim() || !/^[A-Za-zА-Яа-яЁё\s]+$/.test(newCustomer.customerName)) {
      newErrors.customerName = "Имя клиента должно содержать только буквы.";
    }

    
    if (!/^[0-9]{10}$/.test(newCustomer.customerCode)) {
      newErrors.customerCode = "Код клиента должен содержать 10 цифр.";
    }

    
    if (!/^[0-9]{12}$/.test(newCustomer.customerInn)) {
      newErrors.customerInn = "ИНН должен содержать 12 цифр.";
    }

    
    if (!/^[0-9]{9}$/.test(newCustomer.customerKpp)) {
      newErrors.customerKpp = "КПП должен содержать 9 цифр.";
    }

    
    if (!newCustomer.customerEmail.trim() || !/\S+@\S+\.\S+/.test(newCustomer.customerEmail)) {
      newErrors.customerEmail = "Укажите корректный email.";
    }

    
    if (!/^[0-9]{10}$/.test(newCustomer.customerCodeMain)) {
      newErrors.customerCodeMain = "Основной код клиента должен содержать 10 цифр.";
    }

    return newErrors;
  };

  
  const handleAdd = () => {
    const validationErrors = validateInputs();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    addCustomer(newCustomer); 

    
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
  };

 
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
          placeholder="Код клиента"
          value={newCustomer.customerCode}
          onChange={(e) => setNewCustomer({ ...newCustomer, customerCode: e.target.value })}
        />
        {errors.customerCode && <span className="error">{errors.customerCode}</span>}
      </div>

      <div>
        <label>Имя клиента:</label>
        <input
          type="text"
          placeholder="Имя клиента"
          value={newCustomer.customerName}
          onChange={(e) => setNewCustomer({ ...newCustomer, customerName: e.target.value })}
        />
        {errors.customerName && <span className="error">{errors.customerName}</span>}
      </div>

      <div>
        <label>ИНН:</label>
        <input
          type="text"
          placeholder="ИНН (12 цифр)"
          value={newCustomer.customerInn}
          onChange={(e) => setNewCustomer({ ...newCustomer, customerInn: e.target.value })}
        />
        {errors.customerInn && <span className="error">{errors.customerInn}</span>}
      </div>

      <div>
        <label>КПП:</label>
        <input
          type="text"
          placeholder="КПП (9 цифр)"
          value={newCustomer.customerKpp}
          onChange={(e) => setNewCustomer({ ...newCustomer, customerKpp: e.target.value })}
        />
        {errors.customerKpp && <span className="error">{errors.customerKpp}</span>}
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
        {errors.customerEmail && <span className="error">{errors.customerEmail}</span>}
      </div>

      <div>
        <label>Основной код клиента:</label>
        <input
          type="text"
          placeholder="Основной код клиента"
          value={newCustomer.customerCodeMain}
          onChange={(e) => setNewCustomer({ ...newCustomer, customerCodeMain: e.target.value })}
        />
        {errors.customerCodeMain && <span className="error">{errors.customerCodeMain}</span>}
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

      <button onClick={handleAdd}>Добавить клиента</button>
    </div>
  );
};

export default AddCustomer;
