import React, { useState } from "react";
import axios from "axios";


const UpdateLot = ({ updateLot }) => {
  const [searchValue, setSearchValue] = useState("");
  const [lotData, setLotData] = useState({
    lotName: "",
    customerCode: "",
    price: "",
    currencyCode: "",
    ndsRate: "",
    placeDelivery: "",
    dateDelivery: "",
  });
  const [errors, setErrors] = useState({}); 
  const [lotUpdated, setLotUpdated] = useState(false); 

  const validateInputs = () => {
    const newErrors = {};
    const lotNameRegex = /^[A-Za-zА-Яа-яЁё\s]+$/;
    if (!lotData.lotName.trim() || lotData.lotName.length > 255 || !lotNameRegex.test(lotData.lotName)) {
      newErrors.lotName = "Название лота должно содержать только русские и английские буквы.";
    }

    const customerCodeRegex = /^[0-9]{1,10}$/;
    if (!String(lotData.customerCode).trim() || !customerCodeRegex.test(lotData.customerCode)) {
      newErrors.customerCode = "Код клиента должен содержать только цифры и быть до 10 символов.";
    }

    const priceRegex = /^\d+(\.\d{1,2})?$/;
    if (!String(lotData.price).trim() || !priceRegex.test(String(lotData.price)) || String(lotData.price).length > 15) {
      newErrors.price = "Стоимость должна быть числом, не более 15 символов.";
    }

    if (!lotData.currencyCode || lotData.currencyCode.length > 3) {
      newErrors.currencyCode = "Код валюты обязателен и должен быть до 3 символов.";
    }

    if (!lotData.ndsRate || lotData.ndsRate.length > 20) {
      newErrors.ndsRate = "Ставка НДС обязательна и должна быть до 20 символов.";
    }

    const placeDeliveryRegex = /^[A-Za-zА-Яа-яЁё\s]+$/;
    if (!lotData.placeDelivery.trim() || lotData.placeDelivery.length > 255 || !placeDeliveryRegex.test(lotData.placeDelivery)) {
      newErrors.placeDelivery = "Место доставки должно содержать только русские и английские буквы.";
    }

    if (!lotData.dateDelivery.trim()) {
      newErrors.dateDelivery = "Дата доставки обязательна.";
    }

    return newErrors;
  };

  const fetchLotData = async () => {
    try {
      const response = await axios.get(`http://localhost:9090/api/lots/name/${searchValue}`);
      if (response.data && response.data[0]) {
        setLotData(response.data[0]);
      } else {
        alert("Лот с указанным именем не найден!");
      }
    } catch (error) {
      console.error("Ошибка загрузки данных лота:", error);
      alert("Ошибка загрузки данных.");
    }
  };

  const handleSubmit = () => {
    const validationErrors = validateInputs();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; 
    }

    
    updateLot(searchValue, lotData);

    
    setLotUpdated(true);

    
    setLotData({
      lotName: "",
      customerCode: "",
      price: "",
      currencyCode: "",
      ndsRate: "",
      placeDelivery: "",
      dateDelivery: "",
    });

    
    setTimeout(() => {
      setLotUpdated(false); 
    }, 2000);
  };

  const handleChange = (name, value) => {
    setLotData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
<div className="lot-update-form">
  <h2>Обновить данные лота</h2>

  <div className="form-group">
    <label>Введите имя лота для поиска:</label>
    <input
      type="text"
      value={searchValue}
      onChange={({ target }) => setSearchValue(target.value)}
    />
    <button onClick={fetchLotData}>Загрузить данные лота</button>
  </div>

 
  {lotUpdated ? (
    <div>
      <h3>Лот успешно обновлён!</h3>
    </div>
  ) : (
    lotData.lotName && (
      <div>
        <h3>Информация о лоте</h3>
        <div className="form-group">
          <label>Название лота:</label>
          <input
            type="text"
            value={lotData.lotName}
            onChange={({ target }) => handleChange("lotName", target.value)}
            maxLength={255}
          />
          {errors.lotName && <span className="error">{errors.lotName}</span>}
        </div>

        <div className="form-group">
          <label>Код клиента:</label>
          <input
            type="text"
            value={lotData.customerCode}
            onChange={({ target }) => handleChange("customerCode", target.value)}
            maxLength={10}
          />
          {errors.customerCode && <span className="error">{errors.customerCode}</span>}
        </div>

        <div className="form-group">
          <label>Стоимость:</label>
          <input
            type="number"
            value={lotData.price}
            onChange={({ target }) => handleChange("price", target.value)}
            min="0"
            step="0.01"
          />
          {errors.price && <span className="error">{errors.price}</span>}
        </div>

        <div className="form-group">
          <label>Валюта:</label>
          <select
            value={lotData.currencyCode}
            onChange={({ target }) => handleChange("currencyCode", target.value)}
          >
            <option value="RUB">RUB</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
          {errors.currencyCode && <span className="error">{errors.currencyCode}</span>}
        </div>

        <div className="form-group">
          <label>Ставка НДС:</label>
          <select
            value={lotData.ndsRate}
            onChange={({ target }) => handleChange("ndsRate", target.value)}
          >
            <option value="Без НДС">Без НДС</option>
            <option value="18%">18%</option>
            <option value="20%">20%</option>
          </select>
          {errors.ndsRate && <span className="error">{errors.ndsRate}</span>}
        </div>

        <div className="form-group">
          <label>Место доставки:</label>
          <input
            type="text"
            value={lotData.placeDelivery}
            onChange={({ target }) => handleChange("placeDelivery", target.value)}
            maxLength={255}
          />
          {errors.placeDelivery && <span className="error">{errors.placeDelivery}</span>}
        </div>

        <div className="form-group">
          <label>Дата доставки:</label>
          <input
            type="datetime-local"
            value={lotData.dateDelivery}
            onChange={({ target }) => handleChange("dateDelivery", target.value)}
          />
          {errors.dateDelivery && <span className="error">{errors.dateDelivery}</span>}
        </div>

        <button onClick={handleSubmit}>Обновить</button>
      </div>
    )
  )}
</div>
  );
};

export default UpdateLot;
