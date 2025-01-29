// App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CustomerApp from "./customersComponents/CustomerApp.jsx"; // Обновили путь, чтобы указывать на .js файл
import LotApp from "./lotComponents/LotApp.jsx"; // Если файл LotApp будет создан позже
import { Grid, GridItem } from "@consta/uikit/Grid";
import { Card } from "@consta/uikit/Card";
import { Button } from "@consta/uikit/Button";
import { Text } from "@consta/uikit/Text";




function App() {
  return (
    <Router>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh", 
          width: "100vw",
          backgroundColor: "#f4f4f4", 
        }}
      >
        <Card
          shadow
          border
          style={{
            width: "100%",
            maxWidth: "600px",
            padding: "20px",
            backgroundColor: "#fff",
          }}
        >
          <Grid cols="1" gap="xl" align="left" justify="center">
            <GridItem>
              <Text size="2xl" weight="bold" align="center">
                Test Application
              </Text>
            </GridItem>

            <GridItem>
              <Button label="Кнопка" />
            </GridItem>

            <GridItem>
              <nav style={{ textAlign: "center" }}>
                <Link to="/customers" style={{ marginRight: "10px" }}>
                  Клиенты
                </Link>
                <Link to="/lots">Лоты</Link>
              </nav>
            </GridItem>

            <GridItem>
              <Routes>
                <Route path="/" element={<Text></Text>} />
                <Route path="/customers" element={<CustomerApp />} />
                <Route path="/lots" element={<LotApp />} />
              </Routes>
            </GridItem>
          </Grid>
        </Card>
      </div>
    </Router>
  );
}

export default App;
