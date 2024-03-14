export default function apiNewOrder(data: any) {
  const promise = new Promise(async (resolve, reject) => {
    try {
      const result: any = await fetch(
        `https://matolli.netlify.app/api/orders/`,
        // "http://localhost:3001/api/orders/",
        {
          method: "POST",
          // headers: {
          //   "Content-Type": "application/json",
          // },
          body: JSON.stringify(data),
        }
      );
      if (result) return resolve(await result.json());
      reject("fail");
    } catch (error) {
      return reject(error);
    }
  });

  return promise;
}
