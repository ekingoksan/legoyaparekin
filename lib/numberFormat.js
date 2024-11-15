export const numberFormat = (number, decimals = 2, decPoint = ".", thousandsSep = ",") => {
    if (number === null || number === undefined) {
        return null;
    }
    number = parseFloat(number);
    if (isNaN(number)) {
        return null;
    }
    let string = number.toFixed(decimals);
    let parts = string.split(".");
    let fnum = parts[0];
    let decimal = parts[1] ? (decPoint + parts[1]) : "";
    let rgx = /(\d+)(\d{3})/;
    while (rgx.test(fnum)) {
        fnum = fnum.replace(rgx, "$1" + thousandsSep + "$2");
    }
    return fnum + decimal;
}