// App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CustomerApp from "./customersComponents/CustomerApp.jsx"; // Обновили путь, чтобы указывать на .js файл
import LotApp from "./lotComponents/LotApp.jsx"; // Если файл LotApp будет создан позже
import { Button } from '@consta/uikit/Button';
import { Grid, GridItem } from '@consta/uikit/Grid';




function App() {
  return (
    <Router>
      <div className="App">
      <Grid cols="1" gap="xl" align="center" justify="center">
        <GridItem>
          <h1>Test Application</h1>
        </GridItem>
        <GridItem>
          <Button label="Кнопка" />
        </GridItem>
        <GridItem>
          <nav>
            <Link to="/customers">Customers</Link>
            <br />
            <Link to="/lots">Lots</Link>
          </nav>
        </GridItem>

          <Routes>
            <Route path="/" element={<h1></h1>} />
            <Route path="/customers" element={<CustomerApp />} />
            <Route path="/lots" element={<LotApp />} /> 
          </Routes>
        </Grid>
      </div>
    </Router>
  );
}

export default App;
