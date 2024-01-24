export default function apiNovaPoshta(
  searchData: string,
  city: string,
  input: string
) {
  if (!city) return;
  console.log(city);
  const promise = new Promise(async (resolve, reject) => {
    try {
      const result: any = await fetch("https://api.novaposhta.ua/v2.0/json/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apiKey: "affe149554c3740db8a1d02e535dd100",
          modelName: "Address",
          calledMethod: searchData === "cities" ? "getCities" : "getWarehouses",
          methodProperties:
            searchData === "cities"
              ? {
                  FindByString: city,
                  Limit: "20",
                }
              : {
                  CityRef: city,
                  FindByString: `№${input}`,
                  Limit: "20",
                },
        }),
      });
      if (result) return resolve(await result.json());
      reject("fail");
    } catch (error) {
      console.log(error);
    }
  });
  return promise;
}
