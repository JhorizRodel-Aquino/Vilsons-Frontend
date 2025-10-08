import dayjs from 'dayjs';

export default function formatDate(isoString: string, displayOnly?: 'date' | 'time'): string {
  if (displayOnly === 'date') return dayjs(isoString).format('MMM D, YYYY');
  else if (displayOnly === 'time') return dayjs(isoString).format('h:mm A');
  return dayjs(isoString).format('MMM D, YYYY h:mm A');
}