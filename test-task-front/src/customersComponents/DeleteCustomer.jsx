import React, { useState } from "react";

const DeleteCustomer = ({ onDelete }) => {
  const [customerCode, setCustomerCode] = useState("");

  const handleDelete = () => {
    onDelete(customerCode);
  };

  return (
    <div>
      <h2>Удаление клиента</h2>
      <input
        type="text"
        placeholder="Введите код клиента"
        value={customerCode}
        onChange={(e) => setCustomerCode(e.target.value)}
      />
      <button onClick={handleDelete}>Удалить</button>
    </div>
  );
};

export default DeleteCustomer;
