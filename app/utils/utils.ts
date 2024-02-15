import { Gender } from "Contracts/Enums"

export default class Utils{

  public static handleMobileNumber(mobile:string | number){
    try {
    let finalNum = Number(mobile)
    let stringNum = String(mobile)
    if(isNaN(finalNum)){
      throw new Error('Please provide valid mobile number')
    }
    if(stringNum.length !== 10){
      throw new Error('Mobile number should be 10 digits')
    }
    return Number(finalNum)
    } catch (error) {
      return { error: (error as Error).message }
    }
  }

  public static handleDate(date:string){
    try {
    const match = new Date(date);
    if (match) {
    const year = match.getFullYear();
    const month = match.getMonth() + 1;
    const day = match.getDate();

    if (isNaN(year) || isNaN(month) || isNaN(day)) {
      throw new Error('Invalid date format.');
    }

    if (month < 1 || month > 12) {
      throw new Error('Invalid month. Must be between 1 and 12.');
    }

    if (day < 1 || day > 31) {
      throw new Error('Invalid day. Must be between 1 and 31.');
    }

    // return String(match)
    return match
  } else {
    throw new Error( 'Invalid date format. Must match one of the supported formats.');
  }
    } catch (error) {
      return { error: (error as Error).message }
    }
  }

  public static handleGender(gender:string){
    try {
      if (gender === Gender.MALE) {
        gender = Gender.MALE
      } else if (gender === Gender.FEMALE) {
        gender = Gender.FEMALE
      } else {
        throw new Error('Please enter a valid gender')
      }

      return gender
    } catch (error) {
      return { error: (error as Error).message }
    }
  }
}
