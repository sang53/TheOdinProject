import { setCustomRules } from ".";

export function getCustomRules() {
  const formElements = document.querySelector("form").elements;

  setCustomRules({
    player: formElements["player"].checked,
    single: formElements["single"].checked,
  });
}
