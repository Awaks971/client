function get_browser() {
  var ua = navigator.userAgent,
    tem,
    M =
      ua.match(
        /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
      ) || [];
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
    return { name: "IE", version: tem[1] || "" };
  }
  if (M[1] === "Chrome") {
    tem = ua.match(/\bOPR|Edge\/(\d+)/);
    if (tem != null) {
      return { name: "Opera", version: tem[1] };
    }
  }
  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"];
  if ((tem = ua.match(/version\/(\d+)/i)) != null) {
    M.splice(1, 1, tem[1]);
  }
  return {
    name: M[0],
    version: M[1]
  };
}

function can_launch() {
  const browser = get_browser();
  const chrome = browser.name === "Chrome" && browser.version >= 70;
  const IE = browser.name === "Internet Explorer" && browser.version >= 11;
  const safari = browser.name === "Safari" && browser.version >= 10;
  const firefox = browser.name === "Firefox" && browser.version >= 69;

  console.log(browser.name, browser.version);
  if (chrome || IE || safari || firefox) {
    return true;
  } else {
    return false;
  }
}

export default can_launch;
