import React, { useState } from "react";


const ListLot = ({ lots }) => {
  const [searchTerm, setSearchTerm] = useState(""); 

  
  const filteredLots = searchTerm
    ? lots.filter((lot) =>
        lot.lotName?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : lots;

  return (
    <div>
      <input
        type="text"
        placeholder="Поиск лотов по названию"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "20px", padding: "10px", width: "300px" }}
      />
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
                <td>{lot.lotName || "Не указано"}</td>
                <td>{lot.customerCode || "Не указано"}</td>
                <td>{lot.price || "Не указано"}</td>
                <td>{lot.currencyCode || "Не указано"}</td>
                <td>{lot.ndsRate || "Не указано"}</td>
                <td>{lot.placeDelivery || "Не указано"}</td>
                <td>
                  {lot.dateDelivery
                    ? new Date(lot.dateDelivery).toLocaleString()
                    : "Не указана"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                Лоты не найдены
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListLot;
