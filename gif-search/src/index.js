import "./style.css";

const BUTTON = document.querySelector("button");
const SEARCHBAR = document.querySelector("input");

BUTTON.addEventListener("click", () => {
  if (BUTTON.disabled) return;
  BUTTON.disabled = true;
  GIFHANDLER.search(SEARCHBAR.value).finally(() => (BUTTON.disabled = false));
});

const GIFHANDLER = (function () {
  const IMG = document.querySelector("img");

  function search(searchterm = "nba") {
    return fetch(
      `https://api.giphy.com/v1/gifs/translate?api_key=jRsC1wVvU18GW0p9CwzxWjdRszkBURCP&s=${searchterm}`,
      { mode: "cors" },
    )
      .then(validateResponse)
      .then(updateSRC)
      .catch((error) => alert(error));
  }

  function validateResponse(response) {
    if (!response.ok) throw new Error(response.status);
    else return response.json();
  }

  function updateSRC(responseJSON) {
    if (!responseJSON.data.length) throw new Error("No GIFs Found");
    else IMG.src = responseJSON.data.images.original.url;
  }

  return { search };
})();

GIFHANDLER.search();
