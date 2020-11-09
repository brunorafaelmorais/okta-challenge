import { format, parseISO } from 'date-fns';

export default function formatGridDate(date: string): string {
  const parsedDate = parseISO(date);

  return format(parsedDate, 'MM/dd/yy');
}
