export default function dataConvertNovaposhta(data: any, operation: string) {
  const newData = data.reduce((acc: any, el: any) => {
    if (operation === "novaposhta") {
      acc.push({
        value: el.Ref,
        label: `${el.SettlementTypeDescription} ${el.Description}, ${el.AreaDescription} область`,
      });
    }

    if (operation === "meest") {
      acc.push({
        value: `${el.city.ua}, ${el.street.ua}, ${el.street_number}, ${el.district.ua} район, ${el.region.ua} область, ${el.location_description}`,
        label: `${el.city.ua}, ${el.street.ua}, ${el.street_number}, ${el.district.ua} район, ${el.region.ua} область, ${el.location_description}`,
      });
    }

    if (operation === "novaposhtaWarehouses") {
      acc.push({ value: el.Description, label: el.Description });
    }
    return acc;
  }, []);

  return newData;
}
