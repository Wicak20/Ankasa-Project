export default function formatDate(data) {
  const isoCountries = require("i18n-iso-countries");
  isoCountries.registerLocale(require("i18n-iso-countries/langs/en.json"));
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  const formattedData = data.map((item) => {
    console.log(item);
    const date1 = new Date(item.takeoff);
    const date2 = new Date(item.landing);
    const formattedDate1 = date1.toLocaleDateString("id-ID", options);
    const formattedDate2 = date2.toLocaleDateString("id-ID", options);
    const formattedTime1 = date1.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", hour12: false });
    const formattedTime2 = date2.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", hour12: false });

    const arrival_code = item.from.code
    const departure_code = item.to.code
    return {
      ...item,
      departure_date: formattedDate1,
      arrival_date: formattedDate2,
      departure_time: formattedTime1,
      arrival_time: formattedTime2,
      diffs: item.interval_time,
      arrival_code: arrival_code,
      departure_code: departure_code,
    };
  });
  console.log("formatted : ", formattedData);
  return formattedData;
}