import { parseISO, format } from "date-fns";

export default function DateFnsComponent({ dateString }) {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, "LLLL d, yyyy")}</time>;
}
