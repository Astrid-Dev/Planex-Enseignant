export class DateHelper {

  public static getADayName(dayNumber: number)
  {
    let result = "";

    if(dayNumber === 0)
    {
      result = "DAYS.SUNDAY";
    }
    else if(dayNumber === 1)
    {
      result = "DAYS.MONDAY";
    }
    else if(dayNumber === 2)
    {
      result = "DAYS.TUESDAY";
    }
    else if(dayNumber === 3)
    {
      result = "DAYS.WEDNESDAY";
    }
    else if(dayNumber === 4)
    {
      result = "DAYS.THURSDAY";
    }
    else if(dayNumber === 5)
    {
      result = "DAYS.FRIDAY";
    }
    else if(dayNumber === 6)
    {
      result = "DAYS.SATURDAY";
    }

    return result;
  }

}
