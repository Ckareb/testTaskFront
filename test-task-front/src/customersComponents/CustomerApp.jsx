import React, { useState, useEffect } from "react";
import axios from "axios";
import AddCustomer from "./AddCustomer";
import SearchCustomer from "./SearchCustomer";
import DeleteCustomer from "./DeleteCustomer";
import UpdateCustomer from "./UpdateCustomer";
import ListCustomer from "./ListCustomer";

const CustomerApp = () => {
  const [customers, setCustomers] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [deleteCodeMain, setDeleteCodeMain] = useState("");

  // Загрузка всех клиентов при монтировании компонента
  useEffect(() => {
    fetchAllCustomers();
  }, []);

  const fetchAllCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:9090/api/customers/list");
      console.log("API response:", response.data); // Логируем ответ API

      // Проверяем, является ли ответ массивом и обновляем состояние
      if (Array.isArray(response.data)) {
        setCustomers(response.data);
      } else {
        console.error("Ошибка: получены некорректные данные от сервера");
        setCustomers([]); // Если данные не массив, устанавливаем пустой массив
      }
    } catch (error) {
      console.error("Ошибка при загрузке клиентов:", error);
      setCustomers([]); // В случае ошибки устанавливаем пустой массив
    }
  };

  // Метод для удаления клиента по customerCodeMain
  const deleteCustomer = async (codeMain) => {
    setDeleteCodeMain(codeMain);
    try {
      await axios.delete(`http://localhost:9090/api/customers/delete/${codeMain}`);
      alert("Клиент успешно удален!");

      // Локально обновляем состояние, удаляя клиента из списка
      setCustomers((prevCustomers) => 
        prevCustomers.filter((customer) => customer.customerCode !== codeMain)
      );
    } catch (error) {
      console.error("Ошибка при удалении клиента:", error);
      alert("Ошибка при удалении клиента.");
    }
  };

  // Метод для добавления нового клиента
  const addCustomer = async (newCustomer) => {
    try {
      await axios.post("http://localhost:9090/api/customers/add", newCustomer);
      alert("Клиент успешно добавлен!");

      // Локально добавляем клиента в список
      setCustomers((prevCustomers) => [...prevCustomers, newCustomer]);
    } catch (error) {
      console.error("Ошибка при добавлении клиента:", error);
      alert("Ошибка при добавлении клиента.");
    }
  };

  // Обновление данных клиента
  const updateCustomer = async () => {
    if (!customerData) {
      alert("Сначала загрузите данные клиента для обновления.");
      return;
    }

    try {
      await axios.put(`http://localhost:9090/api/customers/update/${customerCodeMain}`, customerData);
      alert("Данные клиента успешно обновлены!");
      fetchAllCustomers(); // Обновляем список клиентов
    } catch (error) {
      console.error("Ошибка при обновлении данных клиента:", error);
      alert("Ошибка при обновлении данных клиента.");
    }
  };

  return (
    <div>
      <h1>Управление клиентами</h1>

      {/* Компонент для отображения списка клиентов */}
      <ListCustomer customers={customers} />

      {/* Компонент для добавления клиента */}
      <AddCustomer addCustomer={addCustomer} />

      {/* Компонент для удаления клиента */}
      <DeleteCustomer onDelete={deleteCustomer} />

      {/* Компонент для обновления клиента */}
      <UpdateCustomer fetchAllCustomers={updateCustomer} />
    </div>
  );
};

export default CustomerApp;
