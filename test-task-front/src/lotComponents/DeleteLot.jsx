import React, { useState } from "react";

const DeleteLot = ({ onDelete }) => {
  const [customerCode, setCustomerCode] = useState("");

  const handleDelete = () => {
    onDelete(customerCode);
  };

  return (
    <div>
      <h2>Удаление лота</h2>
      <input
        type="text"
        placeholder="Введите customerCode"
        value={customerCode}
        onChange={(e) => setCustomerCode(e.target.value)}
      />
      <button onClick={handleDelete}>Удалить</button>
    </div>
  );
};

export default DeleteLot;
