import dayjs from 'dayjs';

export default function formatDate(isoString: string): string {
  return dayjs(isoString).format('MMM D, YYYY h:mm A');
}