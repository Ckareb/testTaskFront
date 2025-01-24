import React, { useState } from "react";

const AddLot = ({ addLot }) => {
  const [newLot, setNewLot] = useState({
    lotName: "",
    customerCode: "",
    price: "",
    currencyCode: "",
    ndsRate: "",
    placeDelivery: "",
    dateDelivery: "",
  });

  const [errors, setErrors] = useState({});

  const validateInputs = () => {
    const newErrors = {};
    const lotNameRegex = /^[A-Za-zА-Яа-яЁё\s]+$/;

    if (!newLot.lotName.trim() || newLot.lotName.length > 255 || !lotNameRegex.test(newLot.lotName)) {
      newErrors.lotName = "Название лота должно содержать только русские или английские буквы.";
    }

    const customerCodeRegex = /^[0-9]{1,10}$/;
    if (!newLot.customerCode.trim() || !customerCodeRegex.test(newLot.customerCode)) {
      newErrors.customerCode = "Код клиента должен содержать только цифры и быть до 10 символов.";
    }

    const priceRegex = /^\d+(\.\d{1,2})?$/;
    if (!newLot.price.trim() || !priceRegex.test(newLot.price) || newLot.price.length > 15) {
      newErrors.price = "Стоимость должна быть числом, не более 15 символов.";
    }

    if (!newLot.currencyCode || newLot.currencyCode.length > 3) {
      newErrors.currencyCode = "Не должен быть пустым";
    }

    if (!newLot.ndsRate || newLot.ndsRate !== "Без НДС") {
      newErrors.ndsRate = "Не должен быть пустым";
    }

    const placeDeliveryRegex = /^[A-Za-zА-Яа-яЁё\s]+$/;
    if (!newLot.placeDelivery.trim() || newLot.placeDelivery.length > 255 || !placeDeliveryRegex.test(newLot.placeDelivery)) {
      newErrors.placeDelivery = "Место доставки должно содержать только русские и английские буквы.";
    }

    if (!newLot.dateDelivery.trim()) {
      newErrors.dateDelivery = "Дата доставки обязательна.";
    }

    return newErrors;
  };

  const handleAdd = () => {
    const validationErrors = validateInputs();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    addLot(newLot); 

    setNewLot({
      lotName: "",
      customerCode: "",
      price: "",
      currencyCode: "",
      ndsRate: "",
      placeDelivery: "",
      dateDelivery: "",
    }); 
  };

  return (
    <div>
      <h2>Добавить лот</h2>

      <div>
        <label>Название лота:</label>
        <input
          type="text"
          placeholder="Название лота"
          value={newLot.lotName}
          onChange={(e) => setNewLot({ ...newLot, lotName: e.target.value })}
        />
        {errors.lotName && <span className="error">{errors.lotName}</span>}
      </div>

      <div>
        <label>Код клиента:</label>
        <input
          type="text"
          placeholder="Код клиента"
          value={newLot.customerCode}
          onChange={(e) => setNewLot({ ...newLot, customerCode: e.target.value })}
        />
        {errors.customerCode && <span className="error">{errors.customerCode}</span>}
      </div>

      <div>
        <label>Стоимость:</label>
        <input
          type="text"
          placeholder="Стоимость"
          value={newLot.price}
          onChange={(e) => setNewLot({ ...newLot, price: e.target.value })}
        />
        {errors.price && <span className="error">{errors.price}</span>}
      </div>

      <div>
        <label>Валюта:</label>
        <select
          value={newLot.currencyCode}
          onChange={(e) => setNewLot({ ...newLot, currencyCode: e.target.value })}
        >
          <option value="Выберите Валюту">Выберите Валюту</option>
          <option value="RUB">RUB</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
        {errors.currencyCode && <span className="error">{errors.currencyCode}</span>}
      </div>

      <div>
        <label>Ставка НДС:</label>
        <select
          value={newLot.ndsRate}
          onChange={(e) => setNewLot({ ...newLot, ndsRate: e.target.value })}
        >
          <option value="Выберите Ставку НДС">Выберите Ставку НДС</option>
          <option value="Без НДС">Без НДС</option>
          <option value="18%">18%</option>
          <option value="20%">20%</option>
        </select>
        {errors.ndsRate && <span className="error">{errors.ndsRate}</span>}
      </div>

      <div>
        <label>Место доставки:</label>
        <input
          type="text"
          placeholder="Место доставки"
          value={newLot.placeDelivery}
          onChange={(e) => setNewLot({ ...newLot, placeDelivery: e.target.value })}
        />
        {errors.placeDelivery && <span className="error">{errors.placeDelivery}</span>}
      </div>

      <div>
        <label>Дата доставки:</label>
        <input
          type="datetime-local"
          value={newLot.dateDelivery}
          onChange={(e) => setNewLot({ ...newLot, dateDelivery: e.target.value })}
        />
        {errors.dateDelivery && <span className="error">{errors.dateDelivery}</span>}
      </div>

      <button onClick={handleAdd}>Добавить лот</button>
    </div>
  );
};

export default AddLot;
