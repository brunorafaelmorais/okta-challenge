import { format, parseISO } from 'date-fns';

export default function formatDate(date: string): string {
  const parsedDate = parseISO(date);

  const formattedDate = format(parsedDate, "MMM'.' dd',' yyyy");

  return formattedDate;
}
