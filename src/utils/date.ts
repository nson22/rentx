import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export const getDiffDateNowFromUTC = (date?: Date) => {
  return date
    ? dayjs(date).utc().local().format()
    : dayjs().utc().local().format();
};
