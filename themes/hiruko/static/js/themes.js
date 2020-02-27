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
