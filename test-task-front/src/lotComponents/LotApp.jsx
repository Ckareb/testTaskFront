import React, { useState, useEffect } from "react";
import axios from "axios";
import AddLot from "./AddLot";
import DeleteLot from "./DeleteLot";
import UpdateLot from "./UpdateLot";
import ListLot from "./ListLot";
import './styles.css';

const LotApp = () => {
  const [lots, setLots] = useState([]); 

    
  useEffect(() => {
    fetchAllLots();
  }, []);

  
  const fetchAllLots = async () => {
    try {
      const response = await axios.get("http://localhost:9090/api/lots/list");
      setLots(response.data || []); 
      console.log("Данные лотов обновлены:", response.data);
    } catch (error) {
      console.error("Ошибка при загрузке лотов:", error);
      setLots([]);
    }
  };



  
  const deleteLot = async (lotName) => {
    try {
      await axios.delete(`http://localhost:9090/api/lots/delete/${lotName}`);
      alert("Лот успешно удалён!");
      fetchAllLots(); 
    } catch (error) {
      console.error("Ошибка при удалении лота:", error);
      alert("Ошибка при удалении лота.");
    }
  };

   
   const addLot = (newLot) => {
    axios
      .post("http://localhost:9090/api/lots/add", newLot)
      .then(() => {
        fetchAllLots(); 
        alert("Лот успешно добавлен!");
      })
      .catch((error) => {
        console.error("Ошибка при добавлении лота:", error);
        alert("Ошибка при добавлении лота.");
      });
  };

  
const updateLot = (lotName, updatedLot) => {
  axios
    .put(`http://localhost:9090/api/lots/update/${lotName}`, updatedLot)
    .then(() => {
      fetchAllLots(); 
    })
    .catch((error) => {
      console.error("Ошибка при обновлении лота:", error);
      alert("Ошибка при обновлении лота.");
    });
};


  return (
    <div>
      <h1>Управление лотами</h1>
            
      <AddLot addLot={addLot} />
      <DeleteLot onDelete={deleteLot} />
      <UpdateLot updateLot={updateLot} />
      <ListLot lots={lots} />
    </div>
  );
};

export default LotApp;
