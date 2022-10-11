import { format } from 'date-fns'

const getTime = (date) => {
  return date.toString().split("T")[1].split(".")[0].slice(0, 5);
};


export const parseBookingStartTime = (date) => {
  let newDate = date
  try {
    newDate = format(new Date(date), "do MMM yy hh.mm a")
  } catch {
    newDate = date
  }
  return newDate
}
export const parseBookingEndTime = (date) => {
  let newDate = date
  try {
    newDate = format(new Date(date), "hh.mm a")
  } catch {
    newDate = date
  }
  return newDate
}

export default getTime;
