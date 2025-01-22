import React, { useState, useEffect } from "react";
import axios from "axios";

const ListLot = () => {
  const [lots, setLots] = useState([]);
  const [filteredLots, setFilteredLots] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Загрузка всех лотов при монтировании компонента
  useEffect(() => {
    fetchAllLots();
  }, []);

  const fetchAllLots = async () => {
    try {
      const response = await axios.get("http://localhost:9090/api/lots/list");
      console.log("API response:", response.data);

      if (Array.isArray(response.data)) {
        setLots(response.data);
        setFilteredLots(response.data); // Изначально отображаем все лоты
      } else {
        console.error("Ошибка: получены некорректные данные от сервера");
        setLots([]);
        setFilteredLots([]);
      }
    } catch (error) {
      console.error("Ошибка при загрузке лотов:", error);
      setLots([]);
      setFilteredLots([]);
    }
  };

  // Обработчик изменения текста в поле поиска
  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term === "") {
      setFilteredLots(lots); // Если поле пустое, показываем все лоты
    } else {
      // Фильтруем лоты по названию
      const filtered = lots.filter((lot) =>
        lot.lotName.toLowerCase().includes(term)
      );
      setFilteredLots(filtered);
    }
  };

  return (
    <div>
      <h1>Управление лотами</h1>

      {/* Поле поиска */}
      <input
        type="text"
        placeholder="Поиск лотов по названию"
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: "20px", padding: "10px", width: "300px" }}
      />

      {/* Таблица лотов */}
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Название лота</th>
            <th>Код контрагента</th>
            <th>Начальная стоимость</th>
            <th>Валюта</th>
            <th>Ставка НДС</th>
            <th>Место доставки</th>
            <th>Дата доставки</th>
          </tr>
        </thead>
        <tbody>
            {filteredLots.length > 0 ? (
                filteredLots.map((lot, index) => (
                <tr key={index}>
                    <td>{lot.lotName || "Не указано"}</td><td>{lot.customerCode || "Не указано"}</td>
                    <td>{lot.price || "Не указано"}</td><td>{lot.currencyCode || "Не указано"}</td>
                    <td>{lot.ndsRate || "Не указано"}</td><td>{lot.placeDelivery || "Не указано"}</td>
                    <td>{lot.dateDelivery ? new Date(lot.dateDelivery).toLocaleString() : "Не указана"}</td>
                </tr>
                ))
            ) : (
                <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>Лоты не найдены</td>
                </tr>
            )}
        </tbody>

      </table>
    </div>
  );
};

export default ListLot;
