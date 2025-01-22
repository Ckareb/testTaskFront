import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateLot = ({ fetchAllLots }) => {
  const [searchValue, setSearchValue] = useState("");
  const [lotData, setLotData] = useState({
    lotName: "",           // Название лота
    customerCode: "",      // Код клиента
    price: "",             // Стоимость
    currencyCode: "",      // Код валюты
    ndsRate: "",           // Ставка НДС
    placeDelivery: "",     // Место доставки
    dateDelivery: "",      // Дата доставки
  });

  // Загрузка данных лота
  const fetchLotData = async () => {
    try {
      const response = await axios.get(`http://localhost:9090/api/lots/name/${searchValue}`);
      
      // Логируем полученные данные, чтобы понять структуру
      console.log("Ответ от API:", response.data);

      if (response.data && response.data[0]) {
        // Просто передаем данные напрямую в setLotData
        setLotData(response.data[0]);
      } else {
        alert("Лот с указанным именем не найден!");
      }
    } catch (error) {
      console.error("Ошибка загрузки данных лота:", error);
      alert("Ошибка загрузки данных.");
    }
  };

  // Обновление данных лота
  const updateLot = async () => {
    try {
      await axios.put(`http://localhost:9090/api/lots/update/${searchValue}`, lotData);
      alert("Данные лота успешно обновлены!");
      fetchAllLots(); // После успешного обновления лотов можно обновить список лотов
    } catch (error) {
      console.error("Ошибка обновления лота:", error);
      alert("Ошибка обновления данных.");
    }
  };

  // useEffect для логирования изменений lotData
  useEffect(() => {
    console.log("lotData изменено:", lotData); // Логируем весь объект lotData
    if (lotData && lotData.lotName) {
      console.log("lotData после обновления:", lotData.lotName);
    }
  }, [lotData]); // Срабатывает, когда lotData изменяется

  // Изменение значений input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLotData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Обновить данные лота</h2>

      <input
        type="text"
        placeholder="Введите имя лота для поиска"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        maxLength={100}
      />
      <button onClick={fetchLotData}>Загрузить данные лота</button>

      {lotData.lotName && (
        <div>
          <h3>Информация о лоте</h3>
          <input
            type="text"
            placeholder="Название лота"
            name="lotName"
            value={lotData.lotName || ""}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Код клиента"
            name="customerCode"
            value={lotData.customerCode || ""}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Стоимость"
            name="price"
            value={lotData.price || ""}
            onChange={handleChange}
          />
          <select
            name="currencyCode"
            value={lotData.currencyCode || ""}
            onChange={handleChange}
          >
            <option value="">Выберите валюту</option>
            <option value="RUB">RUB</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
          <select
            name="ndsRate"
            value={lotData.ndsRate || ""}
            onChange={handleChange}
          >
            <option value="">Выберите ставку НДС</option>
            <option value="Без НДС">Без НДС</option>
            <option value="18%">18%</option>
            <option value="20%">20%</option>
          </select>
          <input
            type="text"
            placeholder="Место доставки"
            name="placeDelivery"
            value={lotData.placeDelivery || ""}
            onChange={handleChange}
          />
          <input
            type="datetime-local"
            name="dateDelivery"
            value={lotData.dateDelivery || ""}
            onChange={handleChange}
          />
          <button onClick={updateLot}>Обновить</button>
        </div>
      )}
    </div>
  );
};

export default UpdateLot;
