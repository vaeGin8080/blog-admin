/* 日期转化 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }
  const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
  let date;
  if (typeof time === "object") {
    date = time;
  } else {
    if (("" + time).length === 10) time = parseInt(time) * 1000;
    // 因项目需要当时间错误或者空的时候显示 0000-00-00 00:00
    if (time === 0 || !time) {
      return "0000-00-00 00:00";
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === "a") {
      return ["日", "一", "二", "三", "四", "五", "六"][value];
    }
    if (result.length > 0 && value < 10) {
      value = "0" + value;
    }
    return value || 0;
  });
  return time_str;
}
/*
 * fn [function] 需要防抖的函数
 * delay [number] 毫秒，防抖期限值
 */

export function debounce(func, wait) {
  let timeout;
  return function() {
    let context = this;
    let args = arguments;
    console.log("xx");
    if (timeout) clearTimeout(timeout);
    console.log(timeout);
    let callNow = !timeout;
    timeout = setTimeout(() => {
      console.log("in");
      func.apply(context, args);
      timeout = null;
    }, wait);

    if (callNow) {
    }
  };
}
/*
 * fn [function] 需要节流的函数
 * delay [number] 毫秒，节流期限值
 */
/* export function throttle(fn,delay){
    let valid = true
    return function() {
		console.log(2);
       if(!valid){
           //休息时间 暂不接客
           return false 
       }
       // 工作时间，执行函数并且在间隔期内把状态位设为无效
        valid = false
        setTimeout(() => {
            fn()
            valid = true;
        }, delay)
    }
}
 */
export function throttle(fn, wait) {
  var timer = null;
  return function() {
    var context = this;
    var args = arguments;
    console.log(1);
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(context, args);
        timer = null;
      }, wait);
    }
  };
}

export function deepClone(source) {
  const targetObj = source.constructor === Array ? [] : {}; // 判断复制的目标是数组还是对象
  for (let keys in source) {
    // 遍历目标
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === "object") {
        // 如果值是对象，就递归一下
        targetObj[keys] = source[keys].constructor === Array ? [] : {};
        targetObj[keys] = deepClone(source[keys]);
      } else {
        // 如果不是，就直接赋值
        targetObj[keys] = source[keys];
      }
    }
  }
  return targetObj;
}
