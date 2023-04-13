const getDateInFormat = (date) => {
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();

    var formattedDate = `${yyyy}-${mm}-${dd}`;
    return formattedDate;
}
const getMonday = (d) => {
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
    return new Date(d.setDate(diff));
}
const getNextSunday = (d) => {
    let monday = getMonday(d);
    return new Date(monday.setDate(monday.getDate()+6))
}

export {getDateInFormat, getMonday, getNextSunday};