import React, { useState } from "react";
import axios from "axios";

const AddLot = ({ fetchAllLots }) => {
  const [newLot, setNewLot] = useState({
    lotName: "",
    customerCode: "",
    price: "",
    currencyCode: "",
    ndsRate: "",
    placeDelivery: "",
    dateDelivery: "",
  });

  const [errors, setErrors] = useState({}); // Для хранения ошибок

  // Проверки на стороне клиента
  const validateInputs = () => {
    const newErrors = {};

    if (!newLot.lotName.trim()) {
      newErrors.lotName = "Название лота обязательно.";
    }

    if (!newLot.customerCode.trim()) {
      newErrors.customerCode = "Код клиента обязателен.";
    }

    if (!newLot.price.trim() || isNaN(newLot.price) || Number(newLot.price) <= 0) {
      newErrors.price = "Стоимость должна быть числом больше нуля.";
    }

    if (!newLot.currencyCode) {
      newErrors.currencyCode = "Валюта обязательна.";
    }

    if (!newLot.ndsRate) {
      newErrors.ndsRate = "Ставка НДС обязательна.";
    }

    if (!newLot.placeDelivery.trim()) {
      newErrors.placeDelivery = "Место доставки обязательно.";
    }

    if (!newLot.dateDelivery.trim()) {
      newErrors.dateDelivery = "Дата доставки обязательна.";
    }

    return newErrors;
  };

  // Метод для добавления нового лота
  const addLot = async () => {
    const validationErrors = validateInputs();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // Если есть ошибки, останавливаем отправку
    }

    try {
      await axios.post("http://localhost:9090/api/lots/add", newLot);
      alert("Лот успешно добавлен!");
      setNewLot({
        lotName: "",
        customerCode: "",
        price: "",
        currencyCode: "",
        ndsRate: "",
        placeDelivery: "",
        dateDelivery: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Ошибка при добавлении лота:", error);
      alert("Ошибка при добавлении лота.");
    }
  };

  return (
    <div>
      <h2>Добавить лот</h2>

      <div>
        <label>Название лота:</label>
        <input
          type="text"
          placeholder="Название лота (обязательно)"
          value={newLot.lotName}
          onChange={(e) => setNewLot({ ...newLot, lotName: e.target.value })}
        />
        {errors.lotName && <p style={{ color: "red" }}>{errors.lotName}</p>}
      </div>

      <div>
        <label>Код клиента:</label>
        <input
          type="text"
          placeholder="Код клиента (обязательно)"
          value={newLot.customerCode}
          onChange={(e) => setNewLot({ ...newLot, customerCode: e.target.value })}
        />
        {errors.customerCode && <p style={{ color: "red" }}>{errors.customerCode}</p>}
      </div>

      <div>
        <label>Стоимость:</label>
        <input
          type="text"
          placeholder="Стоимость (обязательно)"
          value={newLot.price}
          onChange={(e) => setNewLot({ ...newLot, price: e.target.value })}
        />
        {errors.price && <p style={{ color: "red" }}>{errors.price}</p>}
      </div>

      <div>
        <label>Валюта:</label>
        <select
          value={newLot.currencyCode}
          onChange={(e) => setNewLot({ ...newLot, currencyCode: e.target.value })}
        >
          <option value="">Выберите валюту</option>
          <option value="RUB">RUB</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
        {errors.currencyCode && <p style={{ color: "red" }}>{errors.currencyCode}</p>}
      </div>

      <div>
        <label>Ставка НДС:</label>
        <select
          value={newLot.ndsRate}
          onChange={(e) => setNewLot({ ...newLot, ndsRate: e.target.value })}
        >
          <option value="">Выберите ставку НДС</option>
          <option value="Без НДС">Без НДС</option>
          <option value="18%">18%</option>
          <option value="20%">20%</option>
        </select>
        {errors.ndsRate && <p style={{ color: "red" }}>{errors.ndsRate}</p>}
      </div>

      <div>
        <label>Место доставки:</label>
        <input
          type="text"
          placeholder="Место доставки (обязательно)"
          value={newLot.placeDelivery}
          onChange={(e) => setNewLot({ ...newLot, placeDelivery: e.target.value })}
        />
        {errors.placeDelivery && <p style={{ color: "red" }}>{errors.placeDelivery}</p>}
      </div>

      <div>
        <label>Дата доставки:</label>
        <input
          type="datetime-local"
          value={newLot.dateDelivery}
          onChange={(e) => setNewLot({ ...newLot, dateDelivery: e.target.value })}
        />
        {errors.dateDelivery && <p style={{ color: "red" }}>{errors.dateDelivery}</p>}
      </div>

      <button onClick={addLot}>Добавить лот</button>
    </div>
  );
};

export default AddLot;
