import { format, utcToZonedTime } from "date-fns-tz";

const formatInTimeZone = (
  date,
  timeZone = "UTC",
  dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"
) => {
  return format(utcToZonedTime(date, timeZone), dateFormat, { timeZone });
};

export default formatInTimeZone;
