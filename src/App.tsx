import { Routes, Route } from "react-router-dom";
import { useState, createContext, Suspense, lazy } from "react";
import "./App.css";
import { PropagateLoader } from "react-spinners";
import { Circles } from "react-loader-spinner";

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
          <Route
            path="/"
            element={
              <Suspense
                fallback={
                  <Circles
                    height="50"
                    width="50"
                    color="black"
                    ariaLabel="circles-loading"
                    wrapperStyle={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100vh",
                    }}
                    wrapperClass="loader"
                    visible={true}
                  />
                }
              >
                <Home />
              </Suspense>
            }
          ></Route>
          <Route
            path="/olia"
            element={
              <Suspense
                fallback={
                  <Circles
                    height="50"
                    width="50"
                    color="black"
                    ariaLabel="circles-loading"
                    wrapperClass="loader"
                    visible={true}
                  />
                }
              >
                <Olia addItem={addItem} />
              </Suspense>
            }
          ></Route>
          <Route
            path="/boroshno"
            element={
              <Suspense
                fallback={
                  <Circles
                    height="50"
                    width="50"
                    color="black"
                    ariaLabel="circles-loading"
                    wrapperClass="loader"
                    visible={true}
                  />
                }
              >
                <Boroshno />
              </Suspense>
            }
          ></Route>
          <Route
            path="/dostavka-oplata"
            element={
              <Suspense
                fallback={
                  <Circles
                    height="50"
                    width="50"
                    color="black"
                    ariaLabel="circles-loading"
                    wrapperClass="loader"
                    visible={true}
                  />
                }
              >
                <Dostavka />
              </Suspense>
            }
          ></Route>
          <Route
            path="/podarynkovi-naboru"
            element={
              <Suspense
                fallback={
                  <Circles
                    height="50"
                    width="50"
                    color="black"
                    ariaLabel="circles-loading"
                    wrapperClass="loader"
                    visible={true}
                  />
                }
              >
                <Podarynkovi />
              </Suspense>
            }
          ></Route>
          <Route
            path="/zhmuh"
            element={
              <Suspense
                fallback={
                  <Circles
                    height="50"
                    width="50"
                    color="black"
                    ariaLabel="circles-loading"
                    wrapperClass="loader"
                    visible={true}
                  />
                }
              >
                <Zhmuh />
              </Suspense>
            }
          ></Route>
          <Route
            path="/kontaktu"
            element={
              <Suspense
                fallback={
                  <Circles
                    height="50"
                    width="50"
                    color="black"
                    ariaLabel="circles-loading"
                    wrapperClass="loader"
                    visible={true}
                  />
                }
              >
                <Kontaktu />
              </Suspense>
            }
          ></Route>
          <Route
            path="/basket"
            element={
              <Suspense
                fallback={
                  <Circles
                    height="50"
                    width="50"
                    color="black"
                    ariaLabel="circles-loading"
                    wrapperClass="loader"
                    visible={true}
                  />
                }
              >
                <Basket changeBasketAmount={changeBasketAmount} />
              </Suspense>
            }
          ></Route>
        </Routes>
      </div>
    </BasketData.Provider>
  );
}

// export default App;
