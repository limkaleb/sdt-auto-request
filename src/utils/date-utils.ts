import dayjs from 'dayjs';

export function getMonth(date: string) {
  return dayjs(date).get('month');
}

export function getDay(date: string) {
  return dayjs(date).get('date');
}
