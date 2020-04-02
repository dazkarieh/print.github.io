// 切换主题阅读背景；
// https://github.com/darshanbaral/aafu
var lightTheme = {
  mainBackground: "bg-white",
  logobar: "logo-normal",
  mainText: "text-dark",
  background: "body_OBG",
  toggleIcon: "fa-toggle-off"
};

var darkTheme = {
  mainBackground: "bg-black",
  logobar: "logo-inverted",
  mainText: "text-white",
  background: "body_NBG",
  toggleIcon: "fa-toggle-on"
};

var isDark = false;

var themeColor = document.querySelector("meta[name=theme-color]");


let toggleTheme = function() {
  if (isDark) {
    for (let key in darkTheme) {
      let elems = document.querySelectorAll(`.${darkTheme[key]}`);
      elems.forEach(elem => elem.classList.add(lightTheme[key]));
      elems.forEach(elem => elem.classList.remove(darkTheme[key]));
      themeColor.content = "#fff"
    }
    isDark = !isDark;
  } else {
    for (let key in darkTheme) {
      let elems = document.querySelectorAll(`.${lightTheme[key]}`);
      elems.forEach(elem => elem.classList.add(darkTheme[key]));
      elems.forEach(elem => elem.classList.remove(lightTheme[key]));
      themeColor.content = "#000000"
    }
    isDark = !isDark;
  }
};
