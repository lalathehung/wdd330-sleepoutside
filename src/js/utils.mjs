export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

export function getLocalStorage(key) {
  const data = JSON.parse(localStorage.getItem(key)) || [];
  console.log(`Retrieved from ${key}:`, data);
  return data;
}

export function setLocalStorage(key, data) {
  if (!Array.isArray(data)) {
    console.error(`Error: setLocalStorage expects an array for ${key}`);
    return;
  }
  localStorage.setItem(key, JSON.stringify(data));
  console.log(`Saved to ${key}:`, data);
}

export function setClick(selector, callback) {
  const element = qs(selector);
  if (element) {
    element.addEventListener("touchend", (event) => {
      event.preventDefault();
      callback();
    });
    element.addEventListener("click", callback);
  }
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const value = urlParams.get(param);
  console.log(`URL Param ${param}:`, value);
  return value;
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  if (!parentElement || !Array.isArray(list) || typeof templateFn !== "function") {
    console.error("Error: Invalid arguments for renderListWithTemplate");
    return;
  }
  const htmlStrings = list.map(templateFn).filter(str => typeof str === "string");
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}