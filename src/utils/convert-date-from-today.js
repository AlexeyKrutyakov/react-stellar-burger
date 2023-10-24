export default function convertDateFromToday(stringOfDate) {
  let stringOfDeltaDays = '';
  let stringOfDays = '';
  const date = new Date(stringOfDate);
  const today = new Date();
  const delta = today.getDate() - date.getDate();
  const finalDigit = `${delta}`[`${delta}`.length - 1];
  const hours = date.getHours();
  const stringOfHours = hours < 10 ? `0${hours}` : `${hours}`;
  const minutes = date.getMinutes();
  const stringOfMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

  if (finalDigit === '1') {
    stringOfDays = 'день';
  }

  if (['2', '3', '4'].includes(finalDigit)) {
    stringOfDays = 'дня';
  }

  if (
    ['5', '6', '7', '8', '9', '0'].includes(finalDigit) ||
    (finalDigit >= 12 && finalDigit <= 14)
  ) {
    stringOfDays = 'дней';
  }

  switch (delta) {
    case 0:
      stringOfDeltaDays = 'Сегодня';
      break;
    case 1:
      stringOfDeltaDays = 'Вчера';
      break;
    default:
      stringOfDeltaDays = `${delta} ${stringOfDays} назад`;
      break;
  }

  return `${stringOfDeltaDays}, ${stringOfHours}:${stringOfMinutes} i-GMT+3`;
}
