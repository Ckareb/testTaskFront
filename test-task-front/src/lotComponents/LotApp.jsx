import React, { useState, useEffect } from "react";
import axios from "axios";
import AddLot from "./AddLot";
import SearchLot from "./SearchLot";
import DeleteLot from "./DeleteLot";
import UpdateLot from "./UpdateLot";
import ListLot from "./ListLot";

const LotApp = () => {
  const [lots, setLots] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [deleteLotName, setDeleteLotName] = useState("");

  // Загрузка всех лотов при монтировании компонента
  useEffect(() => {
    fetchAllLots();
  }, []);

  // Метод для получения всех лотов
  const fetchAllLots = async () => {
    try {
      const response = await axios.get("http://localhost:9090/api/lots/list");
      console.log("API response:", response.data);

      // Проверяем, является ли ответ массивом и обновляем состояние
      if (Array.isArray(response.data)) {
        setLots(response.data);
      } else {
        console.error("Ошибка: получены некорректные данные от сервера");
        setLots([]); // Если данные не массив, устанавливаем пустой массив
      }
    } catch (error) {
      console.error("Ошибка при загрузке лотов:", error);
      setLots([]); // В случае ошибки устанавливаем пустой массив
    }
  };

  // Метод для удаления лота по имени
  const deleteLot = async (lotName) => {
    setDeleteLotName(lotName);
    try {
      await axios.delete(`http://localhost:9090/api/lots/delete/${lotName}`);
      alert("Лот успешно удален!");

      // Локально обновляем состояние, удаляя лот из списка
      setLots((prevLots) => prevLots.filter((lot) => lot.name !== lotName));
    } catch (error) {
      console.error("Ошибка при удалении лота:", error);
      alert("Ошибка при удалении лота.");
    }
  };

  // Метод для добавления нового лота
  const addLot = async (newLot) => {
    try {
      await axios.post("http://localhost:9090/api/lots/add", newLot);
      alert("Лот успешно добавлен!");

      // Локально добавляем лот в список
      setLots((prevLots) => [...prevLots, newLot]);
    } catch (error) {
      console.error("Ошибка при добавлении лота:", error);
      alert("Ошибка при добавлении лота.");
    }
  };

  // Метод для обновления данных лота
  const updateLot = async (lotName, updatedLot) => {
    try {
      await axios.put(`http://localhost:9090/api/lots/update/${lotName}`, updatedLot);
      alert("Данные лота успешно обновлены!");
      fetchAllLots(); // Обновляем список лотов
    } catch (error) {
      console.error("Ошибка при обновлении данных лота:", error);
      alert("Ошибка при обновлении данных лота.");
    }
  };

  return (
    <div>
      <h1>Управление лотами</h1>

      {/* Компонент для отображения списка лотов */}
      <ListLot lots={lots} />

      {/* Компонент для добавления лота */}
      <AddLot addLot={addLot} />

      {/* Компонент для удаления лота */}
      <DeleteLot onDelete={deleteLot} />

      {/* Компонент для обновления лота */}
      <UpdateLot updateLot={updateLot} />
    </div>
  );
};

export default LotApp;
