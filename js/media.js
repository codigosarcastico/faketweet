const $avatar = document.querySelector(".tweet__avatar"),
  $picture = document.querySelector(".tweet__media");

export default function uploaderAvatar($file) {
  if ($file == undefined) return;

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
    document.body.removeChild($progress);
  };
}

export function uploaderMedia($file) {
  if ($file == undefined) return;
  const $progress = document.createElement("progress");
  $progress.setAttribute("id", "progressUpload");

  const fileReader = new FileReader();
  fileReader.readAsDataURL($file);
  document.body.append($progress);

  $picture.innerHTML = "";

  fileReader.onprogress = (e) => {
    let valueProgress = parseInt((e.loaded * 100) / e.total);
    $progress.value = valueProgress;
  };

  fileReader.onloadend = (e) => {
    const $pictureMedia = new Image();
    $pictureMedia.src = e.target.result;
    $pictureMedia.setAttribute("class", "tweet__media-photo");
    $picture.append($pictureMedia);
    document.body.removeChild($progress);
  };
}

export function deleteMedia() {
  $picture.innerHTML = "";
}
