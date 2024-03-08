interface StringExtensions extends StringConstructor {
    Empty: string;
}

const emptyString: StringExtensions = { Empty: "" } as StringExtensions;

export const String = emptyString;


export function isNullOrUndefined(value: any) {
  return value === null || value === undefined;
}

export function isNullOrEmptyString(value: any) {
  return value === null || value === undefined || value === '';
}

export function isBoolean(value: any) {
  return typeof value === 'boolean';
}

export function isArray(value: any) {
  return Array.isArray(value);
}

export function isDate(value: any) {
  return value instanceof Date;
}

export function isObject(value: any) {
  return value !== null && typeof value === 'object';
}

export function isNumber(value: any) {
  return typeof value === 'number';
}

export function validateByLength(values: Array<any>) {
 
  var result: boolean = false;
   
  values.forEach((value: string | Array<any>) => {     
      if (isNullOrUndefined(value) || value.length === 0) { result = false; }      
      else if(result != false && !isNullOrUndefined(value) && value.length > 0) { result = true }
    });
  
    return result;
}

export function hardObjectClone<T>(objectToClone: T) : T {
  
  let result: T = {} as T;
  
  if(isObject(objectToClone) === true) 
    result = JSON.parse(JSON.stringify(objectToClone)); 
  
    return result;
}

export function convertDateToStringHHmmss(date: Date) {
  
  const dt = new Date(date);
  const [hours, minutes, seconds] = [dt.getHours(), dt.getMinutes(), dt.getSeconds()]
  const formattedHours = hours < 10 ? '0' + hours.toString() : hours.toString();
  const formattedMinutes = minutes < 10 ? '0' + minutes.toString() : minutes.toString();
  const formattedSeconds = seconds < 10 ? '0' + seconds.toString() : seconds.toString();
  const time = formattedHours + ':' + formattedMinutes + ':' + formattedSeconds;
  return time;
}

export function convertTimeStringToHHmm(time: string) {
  
  const [hours, minutes] = time.split(':');
  const formattedHours = parseInt(hours) < 10 && !hours.includes("0") ? '0' + hours.toString() : hours.toString();
  const formattedMinutes = parseInt(minutes) < 10  && !minutes.includes("0") ? '0' + minutes.toString() : minutes.toString();
  const formattedTime = formattedHours + ':' + formattedMinutes;
  return formattedTime;
}

export function convertDateToString(date: Date) {
  
  let d = date, month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
 
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
 
  return [year, month, day].join('-');
}

export function convertStringToDate(date: string) {
 
  const [year, month, day] = date.split('-');
  return new Date(parseInt(year), parseInt(month)-1, parseInt(day));
}

export function debounce<T>(callback: Function, params: T, delay: number): void {

  let timer: NodeJS.Timeout = setTimeout(() => null, 0);

  ((timer: NodeJS.Timeout, params: T) => {

      clearTimeout(timer);
      timer = setTimeout(() => callback(params), delay);

  })(timer, params);
}


