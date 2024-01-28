export default function apiMeest(city: string) {
  const promise = new Promise(async (resolve, reject) => {
    try {
      const result: any = await fetch(
        `https://publicapi.meest.com/locator/${city}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (result) return resolve(await result.json());
      reject("fail");
    } catch (error) {
      console.log(error);
    }
  });

  return promise;
}
