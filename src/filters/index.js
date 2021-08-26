// import parseTime, formatTime and set to filter
// export { parseTime, formatTime } from '@/utils';
import moment from "moment";
import i18n from "@/lang";

// export default function getPageTitle(key) {
//   const hasKey = i18n.te(`route.${key}`)
//   if (hasKey) {
//     const pageName = i18n.t(`route.${key}`)
//     return `${pageName} - ${title}`
//   }
//   return `${title}`
// }

/**
 * Show plural label if time is plural number
 * @param {number} time
 * @param {string} label
 * @return {string}
 */
function pluralize(time, label) {
  const after = i18n.locale == "en" ? "s" : "";
  if (time === 1) {
    return time + label;
  }
  return time + label + after;
}

/**
 * @param {number} time
 */
export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time);
  if (between < 3600) {
    return pluralize(~~(between / 60), ` ${i18n.t("time.minute")}`);
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ` ${i18n.t("time.hour")}`);
  }
  return pluralize(~~(between / 86400), ` ${i18n.t("time.day")}`);
}

/**
 * @param {number} time
 */
export function betweenTime(time1, time2) {
  const between = Math.abs(parseInt(time1) - parseInt(time2));
  if (between < 3600) {
    return pluralize(~~(between / 60), ` ${i18n.t("time.minute")}`);
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ` ${i18n.t("time.hour")}`);
  }
  return pluralize(~~(between / 86400), ` ${i18n.t("time.day")}`);
}

/**
 * @param {number} time or {string} 'expired'
 */
export function expiryDate(time) {
  const between = parseInt(time) - Date.now() / 1000;
  if (between < 3600 && between > 0) {
    return pluralize(~~(between / 60), ` ${i18n.t("time.minute")}`);
  } else if (between < 86400 && between >= 3600) {
    return pluralize(~~(between / 3600), ` ${i18n.t("time.hour")}`);
  } else if (between >= 86400) {
    return pluralize(~~(between / 86400), ` ${i18n.t("time.day")}`);
  }
  return i18n.t("time.expired");
}

/**
 * @param {number} time or {string} 'expired'
 */
export function isExpiried(time) {
  const between = parseInt(time) - Date.now() / 1000;
  if (between < 0) {
    return true;
  }
  return false;
}

/**
 * Number formatting
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 */
export function numberFormatter(num, digits) {
  const si = [
    { value: 1e18, symbol: "E" },
    { value: 1e15, symbol: "P" },
    { value: 1e12, symbol: "T" },
    { value: 1e9, symbol: "G" },
    { value: 1e6, symbol: "M" },
    { value: 1e3, symbol: "k" }
  ];
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (
        (num / si[i].value)
          .toFixed(digits)
          .replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[i].symbol
      );
    }
  }
  return num.toString();
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num) {
  return (+num || 0)
    .toString()
    .replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ","));
}

/**
 * Upper case first char
 * @param {String} string
 */
export function uppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * unixtime to date
 * @param {String} string, {Int} string
 * @param {String} string
 */
export function timestampToDate(timestamp, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(parseInt(timestamp) * 1000, "x").format(pattern);
}

export function datetimeFormatter(timestamp, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(timestamp).format(pattern);
}

export function timestampFormatter(timestamp) {
  const datetime = moment(timestamp);
  const today = new Date();

  if (datetime.isSame(today, "day")) {
    return datetime.format("hh:mm A");
  }

  if (datetime.isSame(today, "week")) {
    return datetime.format("ddd");
  }

  if (!datetime.isSame(today, "year")) {
    return datetime.format("YYYY-MM-DD");
  }

  return datetime.format("DD MMM");
}

export function naturalPartOfNumber(number) {
  return Math.floor(number);
}

export function fractionPartOfNumber(number) {
  const num = parseFloat(number);
  return Number(String(num).split(".")[1] || 0);
}

export function sliceChar(value, length = 3) {
  return window._.chain(`${value}`)
    .slice(0, length)
    .join("")
    .value();
}

export function diffCurrentTime(timestamp) {
  if (!timestamp) {
    return null;
  }
  const localTime = moment.utc(timestamp).local();
  const currentTime = moment();

  const formatters = [
    { milestoneTime: 60, unit: "minute", duration: "minutes" },
    { milestoneTime: 24, unit: "hour", duration: "hours" },
    { milestoneTime: 7, unit: "day", duration: "days" },
    { milestoneTime: 30, unit: "week", duration: "weeks" },
    { milestoneTime: 12, unit: "month", duration: "months" },
    { milestoneTime: 10000000, unit: "year", duration: "years" }
  ];

  for (let item of formatters) {
    const diff = parseInt(currentTime.diff(localTime, item.duration));
    if (!diff) {
      return "Vừa gửi";
    }
    if (diff <= item.milestoneTime) {
      const unit =
        diff > 1 ? i18n.t(`time.${item.unit}s`) : i18n.t(`time.${item.unit}`);
      return `${diff}${unit} ${i18n.t("time.behind")}`;
    }
  }
  return null;
}

export function trimBreakline(string) {
  return string.replace(/(\r\n|\n|\r)/gm, " ");
}

export function getLastName(string) {
  const split = string.trim().split(" ");
  return split[split.length - 1];
}
