import React, { useState } from "react";

const SearchCustomer = ({ onSearch }) => {
  const [searchName, setSearchName] = useState("");

  const handleSearch = () => {
    onSearch(searchName);
  };

  return (
    <div>
      <h2>Поиск клиентов по имени</h2>
      <input
        type="text"
        placeholder="Введите имя клиента"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
      />
      <button onClick={handleSearch}>Искать</button>
    </div>
  );
};

export default SearchCustomer;
