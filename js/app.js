import uploaderAvatar, { uploaderMedia, deleteMedia } from "./media.js";
import { formatNumberSum, formatNumberUs } from "./numbers.js";
import { $svgLiked, $svgLike } from "./icons.js";
import {
  schemeDim,
  schemeDark,
  schemeDefault,
  isVerified,
  noVerified,
  isMap,
  noMap,
  processText,
  captureDom,
} from "./options.js";

const $modal = document.querySelector(".options");

const disposeModal = () => {
    $modal.style.display = "none";
  },
  showModal = () => ($modal.style.display = "grid");

const scrollSmooth = ($element) => {
  let positionRelative = $element.getBoundingClientRect().top;
  console.log(positionRelative);
  window.scrollBy({
    left: 0,
    top: positionRelative,
    behavior: "smooth",
  });
};

const retweet = (e) => {
  // console.log("RRTT", e.target);
  const $buttonRT = document.querySelector(".tweet__button.rt"),
    $numRT = document.querySelector(".tweet__rt-n");
  $buttonRT.classList.toggle("active");
  formatNumberSum($numRT, 1);
};

const like = (e) => {
  const $buttonLike = document.querySelector(".tweet__button.likes"),
    $numLikes = document.querySelector(".tweet__likes-n");

  if ($buttonLike.classList.contains("active")) {
    $buttonLike.classList.remove("active");
    $buttonLike.innerHTML = $svgLike;
  } else {
    $buttonLike.classList.add("active");
    $buttonLike.innerHTML = $svgLiked;
    formatNumberSum($numLikes, 1);
  }
};

const quotes = (e) => {
  const $button = document.querySelector(".tweet__button.quotes"),
    $elementQuotes = document.querySelector(".tweet__quotes"),
    $count = $elementQuotes.firstElementChild,
    range = document.createRange();

  if ($elementQuotes.matches(".hide")) {
    $elementQuotes.classList.remove("hide");
    $button.classList.add("active");

    //Asignar Focus a ContentEditable
    range.setStart($count, 0);
    range.setEnd($count, 1);
    getSelection().removeAllRanges();
    getSelection().addRange(range);
  } else {
    $elementQuotes.classList.add("hide");
    $button.classList.remove("active");
  }
};

const blurFormatCounts = (e) => {
  e.stopPropagation();
  e.target.innerText = formatNumberUs(e.target.textContent);
};

document.addEventListener("DOMContentLoaded", (e) => {
  const $inputFile = document.getElementById("filePhoto");
  document.addEventListener("click", (e) => {
    // console.log("DOCUMENT ", e);
    if (e.target.matches(".tweet__avatar")) {
      $inputFile.click();
    }

    if (e.target.matches(".done")) {
      disposeModal();
    }

    if (e.target.matches(".tweet__button.rt *, .tweet__button.rt")) retweet(e);

    if (e.target.matches(".tweet__button.likes *, .tweet__button.likes"))
      like(e);
    if (e.target.matches(".tweet__button.quotes *, .tweet__button.quotes"))
      quotes(e);

    if (e.target.matches("#schemeDefault")) schemeDefault();
    if (e.target.matches("#schemeDim")) schemeDim();
    if (e.target.matches("#schemeDark")) schemeDark();
    if (e.target.matches("#isVerified")) {
      isVerified();
      disposeModal();
      scrollSmooth(document.getElementById("verified"));
    }
    if (e.target.matches("#noVerified")) {
      noVerified();
      disposeModal();
      scrollSmooth(document.body);
    }
    if (e.target.matches("#isMap")) {
      isMap(e);
      disposeModal();

      scrollSmooth(document.querySelector(".tweet__map"));
    }
    if (e.target.matches("#noMap")) {
      noMap();
      disposeModal();
      scrollSmooth(document.querySelector(".tweet__dispositive"));
    }
    if (e.target.matches(".option__media-reset")) {
      fileMedia.value = "";
      deleteMedia();
      disposeModal();
    }
    if (e.target.matches(".options")) {
      disposeModal();
    }
    if (e.target.matches(".tweet__more, .tweet__more *")) {
      showModal();
    }

    if (e.target.matches("#capture, #capture *")) {
      captureDom();
    }
  });

  document.addEventListener(
    "blur",
    (e) => {
      if (e.target.matches(".tweet__likes-n,.tweet__quotes-n,.tweet__rt-n")) {
        blurFormatCounts(e);
      }

      if (e.target.matches(".tweet__note")) processText(e);
    },
    true
  );

  document.addEventListener("focusin", (e) => {
    // getSelection().removeAllRanges();
    if (e.target.matches("[contentEditable]:not(p.tweet__note)")) {
      let ranges = document.createRange(),
        selected = window.getSelection();
      ranges.setStart(e.target, 0);
      ranges.setEnd(e.target, 1);
      selected.removeAllRanges();
      selected.addRange(ranges);
    }
  });

  document.addEventListener("change", (e) => {
    if (e.target.matches("#filePhoto")) {
      e.preventDefault();
      uploaderAvatar(e.target.files[0]);
    }

    if (e.target.matches("#fileMedia")) {
      e.preventDefault();
      uploaderMedia(e.target.files[0]);
      disposeModal();
    }
  });
});
