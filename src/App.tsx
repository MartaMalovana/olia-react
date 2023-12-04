import { Routes, Route } from "react-router-dom";
import { useState, createContext } from "react";
import "./App.css";
import Home from "./components/home/Home";
import Olia from "./components/olia/Olia";
import Boroshno from "./components/boroshno/Boroshno";
import Dostavka from "./components/dostavka-oplata/Dostavka";
import Podarynkovi from "./components/podarynkovi-naboru/Podarynkovi";
import Zhmuh from "./components/zhmuh/Zhmuh";
import Kontaktu from "./components/kontaktu/Kontaktu";
import Basket from "./components/basket/Basket";

type ProductItem = {
  id: number;
  name: string;
  size: [string, string][];
  description: string;
  icon: string;
  photo: string;
};

type Item = { product: ProductItem; size: string; amount: number };

export const BasketData = createContext<Item[]>([]);

export function App() {
  const [basket, setBasket] = useState<Item[]>([]);

  const addItem = (item: Item) => {
    setBasket((data) => [...data, item]);
  };

  const changeBasketAmount = (itemId: number, operation: string) => {
    setBasket((data) => {
      let newData = JSON.parse(JSON.stringify(data));
      switch (operation) {
        case "minus":
          newData[itemId].amount -= 1;
          break;
        case "plus":
          newData[itemId].amount += 1;
          break;
        case "delete":
          newData.splice(itemId, 1);
          break;
        default:
          break;
      }
      return newData;
    });
  };

  return (
    <BasketData.Provider value={basket}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/olia" element={<Olia addItem={addItem} />}></Route>
          <Route path="/boroshno" element={<Boroshno />}></Route>
          <Route path="/dostavka-oplata" element={<Dostavka />}></Route>
          <Route path="/podarynkovi-naboru" element={<Podarynkovi />}></Route>
          <Route path="/zhmuh" element={<Zhmuh />}></Route>
          <Route path="/kontaktu" element={<Kontaktu />}></Route>
          <Route
            path="/basket"
            element={<Basket changeBasketAmount={changeBasketAmount} />}
          ></Route>
        </Routes>
      </div>
    </BasketData.Provider>
  );
}

// export default App;
