import React, { useState } from "react";

const DeleteCustomer = ({ onDelete }) => {
  const [deleteCodeMain, setDeleteCodeMain] = useState("");

  const handleDelete = () => {
    onDelete(deleteCodeMain);
  };

  return (
    <div>
      <h2>Удаление клиента</h2>
      <input
        type="text"
        placeholder="Введите customerCodeMain"
        value={deleteCodeMain}
        onChange={(e) => setDeleteCodeMain(e.target.value)}
      />
      <button onClick={handleDelete}>Удалить</button>
    </div>
  );
};

export default DeleteCustomer;
