import React, { useState, useEffect } from "react";

const ListCustomers = ({ customers }) => {
  const [searchTerm, setSearchTerm] = useState("");

  
  const filteredCustomers = searchTerm
    ? customers.filter((customer) =>
        customer.customerName?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : customers;

  return (
    <div>
      <input
        type="text"
        placeholder="Поиск клиентов по имени"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "20px", padding: "10px", width: "300px" }}
      />
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
            filteredCustomers.map((customer, index) => (
              <tr key={index}>
                <td>{customer.customerCode || "Не указано"}</td>
                <td>{customer.customerName || "Не указано"}</td>
                <td>{customer.customerInn || "Не указано"}</td>
                <td>{customer.customerKpp || "Не указано"}</td>
                <td>{customer.customerLegalAddress || "Не указано"}</td>
                <td>{customer.customerPostalAddress || "Не указано"}</td>
                <td>{customer.customerEmail || "Не указано"}</td>
                <td>{customer.customerCodeMain || "Не указано"}</td>
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

export default ListCustomers;
