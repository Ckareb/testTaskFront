import React, { useState } from "react";

const DeleteLot = ({ onDelete }) => {
  const [lotName, setlotName] = useState("");

  const handleDelete = () => {
    onDelete(lotName);
  };

  return (
    <div>
      <h2>Удаление лота</h2>
      <input
        type="text"
        placeholder="Введите имя лота"
        value={lotName}
        onChange={(e) => setlotName(e.target.value)}
      />
      <button onClick={handleDelete}>Удалить</button>
    </div>
  );
};

export default DeleteLot;
