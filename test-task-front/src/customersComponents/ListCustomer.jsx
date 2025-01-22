import React, { useState, useEffect } from "react";
import axios from "axios";

const CustomerApp = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Загрузка всех клиентов при монтировании компонента
  useEffect(() => {
    fetchAllCustomers();
  }, []);

  const fetchAllCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:9090/api/customers/list");
      console.log("API response:", response.data);

      if (Array.isArray(response.data)) {
        setCustomers(response.data);
        setFilteredCustomers(response.data); // Изначально отображаем всех клиентов
      } else {
        console.error("Ошибка: получены некорректные данные от сервера");
        setCustomers([]);
        setFilteredCustomers([]);
      }
    } catch (error) {
      console.error("Ошибка при загрузке клиентов:", error);
      setCustomers([]);
      setFilteredCustomers([]);
    }
  };

  // Обработчик изменения текста в поле поиска
  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term === "") {
      setFilteredCustomers(customers); // Если поле пустое, показываем всех клиентов
    } else {
      // Фильтруем клиентов по имени или другим полям
      const filtered = customers.filter((customer) =>
        customer.customerName.toLowerCase().includes(term)
      );
      setFilteredCustomers(filtered);
    }
  };

  return (
    <div>
      <h1>Управление клиентами</h1>

      {/* Поле поиска */}
      <input
        type="text"
        placeholder="Поиск клиентов по имени"
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: "20px", padding: "10px", width: "300px" }}
      />

      {/* Таблица клиентов */}
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Код клиента</th>
            <th>Имя клиента</th>
            <th>ИНН</th>
            <th>КПП</th>
            <th>Юридический адрес</th>
            <th>Почтовый адрес</th>
            <th>Email</th>
            <th>Основной код</th>
            <th>Организация</th>
            <th>Физическое лицо</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.length > 0 ? (
            filteredCustomers.map((customer) => (
              <tr key={customer.customerCode}>
                <td>{customer.customerCode}</td>
                <td>{customer.customerName}</td>
                <td>{customer.customerInn}</td>
                <td>{customer.customerKpp}</td>
                <td>{customer.customerLegalAddress}</td>
                <td>{customer.customerPostalAddress}</td>
                <td>{customer.customerEmail}</td>
                <td>{customer.customerCodeMain}</td>
                <td>{customer.isOrganization ? "Да" : "Нет"}</td>
                <td>{customer.isPerson ? "Да" : "Нет"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" style={{ textAlign: "center" }}>
                Клиенты не найдены
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerApp;
