const $tweet = document.getElementById("tweet"),
  $verified = document.getElementById("verified"),
  $map = document.querySelector(".tweet__map");

export const schemeDefault = () => {
  $tweet.removeAttribute("class");
  $tweet.setAttribute("class", "tweet");
  document
    .querySelector(".options__theme-palett-default")
    .classList.add("active");
  document
    .querySelector(".options__theme-palett-dim")
    .classList.remove("active");

  document
    .querySelector(".options__theme-palett-dark")
    .classList.remove("active");
};

export const schemeDim = () => {
  $tweet.removeAttribute("class");
  $tweet.setAttribute("class", "tweet");
  $tweet.classList.add("dim");
  document.querySelector(".options__theme-palett-dim").classList.add("active");
  document
    .querySelector(".options__theme-palett-default")
    .classList.remove("active");
  document
    .querySelector(".options__theme-palett-dark")
    .classList.remove("active");
};

export const schemeDark = () => {
  $tweet.removeAttribute("class");
  $tweet.setAttribute("class", "tweet");
  $tweet.classList.add("dark");
  document.querySelector(".options__theme-palett-dark").classList.add("active");
  document
    .querySelector(".options__theme-palett-dim")
    .classList.remove("active");
  document
    .querySelector(".options__theme-palett-default")
    .classList.remove("active");
};

export const isVerified = () => {
  $verified.classList.remove("hide");
};

export const noVerified = () => {
  $verified.classList.add("hide");
};

export const isMap = (e) => {
  let range = document.createRange(),
    select = window.getSelection();
  $map.removeAttribute("style");
  range.setStart($map, 0);
  range.setEnd($map, 1);
  select.removeAllRanges();
  select.addRange(range);
};

export const noMap = () => {
  $map.style.setProperty("display", "none");
};

export const processText = (e) => {
  let text = e.target.textContent,
    $text = document.createElement("p");
  let expressionHashtag = /(^|\s)#(\w*[a-zA-Z_]+\w*)/gim;
  let expressionUsername =
    /(?<=^|(?<=[^a-zA-Z0-9-_]))@([A-Za-z]+[A-Za-z0-9-_]+)/gim;

  let debugText = text.replace(expressionHashtag, "<b>$&</b>");
  debugText = debugText.replace(expressionUsername, "<b>$&</b>");
  e.target.innerHTML = debugText;
};

export const captureDom = () => {
  const $dom = document.getElementById("tweet");

  $dom.style.setProperty("border-radius", "0");
  domtoimage
    .toPng($dom)
    .then((dataUrl) => {
      // const $pictureResult = new Image();
      // $pictureResult.src = dataUrl;
      // document.body.append($pictureResult);

      var link = document.createElement("a");
      link.download = "tweet.png";
      link.href = dataUrl;
      link.click();
      new Audio("./js/click.mp3").play();
    })
    .catch((err) => {
      console.log("Error de algo", err);
    })
    .finally(() => {
      $dom.style.setProperty("border-radius", "10px");
    });
};
