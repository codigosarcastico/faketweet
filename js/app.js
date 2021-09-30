import uploader from "./preview.avatar.js";

document.addEventListener("DOMContentLoaded", (e) => {
  const $inputFile = document.getElementById("filePhoto");

  $inputFile.onchange = (e) => {
    e.preventDefault();
    e.stopPropagation;
    uploader(e.target.files[0]);
  };

  document.addEventListener("click", (e) => {
    if (e.target.matches(".tweet__avatar")) {
      $inputFile.click();
    }
  });
});
