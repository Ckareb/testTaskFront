import React, { useState } from "react";

const SearchLot = ({ onSearch }) => {
  const [searchLotName, setSearchLotName] = useState("");

  const handleSearch = () => {
    onSearch(searchLotName);
  };

  return (
    <div>
      <h2>Поиск лотов по наименованию</h2>
      <input
        type="text"
        placeholder="Введите наименование лота"
        value={searchLotName}
        onChange={(e) => setSearchLotName(e.target.value)}
      />
      <button onClick={handleSearch}>Искать</button>
    </div>
  );
};

export default SearchLot;
