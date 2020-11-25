import parse from "html-react-parser";

export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

export const formatVNDToNumber = (n) => {
  // format number 1.234.567 to 1000000
  return n.replace(/,/g, "");
};
export const formatNumberToVND = (n) => {
  // format number 1000000 to 1.234.567
  return `${n}`.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatNumberToReadable = (n) => {
  return `${n}`.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const getQuery = (search) => {
  return search.trim().length > 0
    ? JSON.parse(
        '{"' +
          decodeURI(search.substring(1))
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"') +
          '"}'
      )
    : {};
};

export const objectToQueryString = (obj) => {
  let str = [];
  for (let p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
};

export const titleCase = (str, isLowerCase = false) => {
  var splitStr = isLowerCase ? str.toLowerCase().split(" ") : str.split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(" ");
};

export const notifyError = (notify, messages) => {
  const messageType = typeof messages;
  if (messageType === "string") {
    notify(parse(messages), {
      key: messages,
      variant: "error",
      preventDuplicate: true,
      autoHideDuration: 10000,
    });
  } else if (messageType === "object") {
    const listMessage = Object.values(messages);
    listMessage.forEach((message) => {
      notifyError(notify, message);
    });
  }
};
