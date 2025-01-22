// App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CustomerApp from "./customersComponents/CustomerApp.jsx"; // Обновили путь, чтобы указывать на .js файл
import LotApp from "./lotComponents/LotApp.jsx"; // Если файл LotApp будет создан позже

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Test Application</h1>
        <nav>
          <Link to="/customers">Customers</Link><br></br>
          <Link to="/lots">Lots</Link> 
        </nav>
        <Routes>
          <Route path="/" element={<h1></h1>} />
          <Route path="/customers" element={<CustomerApp />} />
          <Route path="/lots" element={<LotApp />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
