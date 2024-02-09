import { Routes, Route } from "react-router-dom";
import { useState, createContext, lazy, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import "./styles/App.css";
import SuspenseComponent from "./components/suspense/Suspense";
import useMediaQuery from "@mui/material/useMediaQuery";
import Menu from "./components/menu/Menu";
import { Item } from "./shared.types";

// LAZY IMPORTS
const Header = lazy(() => import("./components/header/Header"));
const Footer = lazy(() => import("./components/footer/Footer"));
const Home = lazy(() => import("./components/home/Home"));
const Olia = lazy(() => import("./components/olia/Olia"));
const Boroshno = lazy(() => import("./components/boroshno/Boroshno"));
const Dostavka = lazy(() => import("./components/dostavka-oplata/Dostavka"));
const Podarynkovi = lazy(
  () => import("./components/podarynkovi-naboru/Podarynkovi")
);
const Zhmuh = lazy(() => import("./components/zhmuh/Zhmuh"));
const Kontaktu = lazy(() => import("./components/kontaktu/Kontaktu"));
const Basket = lazy(() => import("./components/basket/Basket"));
const DogovirOfertu = lazy(
  () => import("./components/dogovirOfertu/DogovirOfertu")
);

// CONTEXT
export const BasketData = createContext<Item[]>([]);

// APP COMPONENT
export function App() {
  const [basket, setBasket] = useState<Item[]>(
    JSON.parse(localStorage.getItem("basket") || "[]")
  );
  const { ref, inView } = useInView();

  useEffect(() => {
    console.log("basket", basket);
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket]);

  const handleScroll = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

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
        <Header ref={ref} />
        <div className="main_container">
          {useMediaQuery("(min-width:1000px)") && (
            <Menu close={() => console.log("menu")} />
          )}
          <div className="main_page">
            <Routes>
              <Route
                path="/"
                element={
                  <SuspenseComponent>
                    <Home />
                  </SuspenseComponent>
                }
              ></Route>
              <Route
                path="/olia"
                element={
                  <SuspenseComponent>
                    <Olia addItem={addItem} />
                  </SuspenseComponent>
                }
              ></Route>
              <Route
                path="/boroshno"
                element={
                  <SuspenseComponent>
                    <Boroshno addItem={addItem} />
                  </SuspenseComponent>
                }
              ></Route>
              <Route
                path="/dostavka-oplata"
                element={
                  <SuspenseComponent>
                    <Dostavka />
                  </SuspenseComponent>
                }
              ></Route>
              <Route
                path="/podarynkovi-naboru"
                element={
                  <SuspenseComponent>
                    <Podarynkovi />
                  </SuspenseComponent>
                }
              ></Route>
              <Route
                path="/zhmuh"
                element={
                  <SuspenseComponent>
                    <Zhmuh />
                  </SuspenseComponent>
                }
              ></Route>
              <Route
                path="/kontaktu"
                element={
                  <SuspenseComponent>
                    <Kontaktu />
                  </SuspenseComponent>
                }
              ></Route>
              <Route
                path="/basket"
                element={
                  <SuspenseComponent>
                    <Basket
                      changeBasketAmount={changeBasketAmount}
                      clearBasket={() => setBasket([])}
                    />
                  </SuspenseComponent>
                }
              ></Route>
              <Route
                path="/dogovir-ofertu"
                element={
                  <SuspenseComponent>
                    <DogovirOfertu />
                  </SuspenseComponent>
                }
              ></Route>
            </Routes>
          </div>
        </div>
        <Footer />
        {!inView && (
          <button className="button_up" onClick={handleScroll}></button>
        )}
      </div>
    </BasketData.Provider>
  );
}
