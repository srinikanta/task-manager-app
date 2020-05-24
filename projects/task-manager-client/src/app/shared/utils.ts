export class Utils {
  public static getCurrentDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();

    const todayString = yyyy + '-' + mm + '-' + dd;
    return todayString;
  }

  public static getDueDate(date, DELIMITER: string) {
    return date
      ? date.year + DELIMITER + date.month + DELIMITER + date.day
      : '';
  }
}
