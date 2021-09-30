const $avatar = document.querySelector(".tweet__avatar");

export default function uploader($file) {
  const fileReader = new FileReader(),
    $progress = document.createElement("progress");
  $progress.setAttribute("id", "progressUpload");
  fileReader.readAsDataURL($file);

  document.body.append($progress);

  fileReader.onprogress = (e) => {
    let valueProgress = parseInt((e.loaded * 100) / e.total);
    $progress.value = valueProgress;
  };

  fileReader.onloadend = (e) => {
    $avatar.src = e.target.result;
    setTimeout(() => {
      document.body.removeChild($progress);
    }, 3000);
  };
}
