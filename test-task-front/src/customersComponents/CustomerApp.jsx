import React, { useState, useEffect } from "react";
import axios from "axios";
import AddCustomer from "./AddCustomer";
import DeleteCustomer from "./DeleteCustomer";
import UpdateCustomer from "./UpdateCustomer";
import ListCustomer from "./ListCustomer";


const CustomerApp = () => {
  const [customers, setCustomers] = useState([]); 
 
  useEffect(() => {
    fetchAllCustomers();
  }, []);

  
  const fetchAllCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:9090/api/customers/list");
      setCustomers(response.data || []); 
      console.log("Данные клиентов обновлены:", response.data);
    } catch (error) {
      console.error("Ошибка при загрузке клиентов:", error);
      setCustomers([]); 
    }
  };

  
  const deleteCustomer = async (customerCode) => {
    try {
      await axios.delete(`http://localhost:9090/api/customers/delete/${customerCode}`);
      alert("Клиент успешно удалён!");
      fetchAllCustomers(); 
    } catch (error) {
      console.error("Ошибка при удалении клиента:", error);
      alert("Ошибка при удалении клиента.");
    }
  };

  
  const addCustomer = (newCustomer) => {
    axios
      .post("http://localhost:9090/api/customers/add", newCustomer)
      .then(() => {
        fetchAllCustomers(); 
        alert("Клиент успешно добавлен!");
      })
      .catch((error) => {
        console.error("Ошибка при добавлении клиента:", error);
        alert("Ошибка при добавлении клиента.");
      });
  };

  
  const updateCustomer = (customerCode, updatedCustomer) => {
    axios
      .put(`http://localhost:9090/api/customers/update/${customerCode}`, updatedCustomer)
      .then(() => {
        fetchAllCustomers(); 
      })
      .catch((error) => {
        console.error("Ошибка при обновлении данных клиента:", error);
        alert("Ошибка при обновлении данных клиента.");
      });
  };

  return (
    <div>
      <h1>Управление клиентами</h1>

      <AddCustomer addCustomer={addCustomer} />
      <DeleteCustomer onDelete={deleteCustomer} />
      <UpdateCustomer updateCustomer={updateCustomer} />

       <ListCustomer customers={customers} />
    </div>
  );
};

export default CustomerApp;
