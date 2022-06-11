export const formatDate = (date: Date | null) => {
  if (!date) return;

  let d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  let year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

export const getOneYearDateRange = () => {
  const today = new Date();
  const oneMonthFromToday = new Date();
  oneMonthFromToday.setFullYear(oneMonthFromToday.getFullYear() + 1);
  return [today, oneMonthFromToday];
};
