const CUSTOM_DIALOG = document.querySelector("#customise-dialog");

export function getCustomRules() {
  const formElements = CUSTOM_DIALOG.querySelector("form").elements;

  return {
    ships: formElements["ships"].value,
    sides: formElements["sides"].value,
    player: formElements["player"].checked,
    single: formElements["single"].checked,
  };
}

export function openCustomise() {
  CUSTOM_DIALOG.showModal();
  CUSTOM_DIALOG.querySelector("button").addEventListener(
    "click",
    closeCustomise,
  );
}

function closeCustomise(event) {
  event.preventDefault();
  CUSTOM_DIALOG.querySelector("button").removeEventListener(
    "click",
    closeCustomise,
  );
  CUSTOM_DIALOG.close();
  document.dispatchEvent(new Event("gameProgress"));
}
