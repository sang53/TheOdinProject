export function getCustomRules() {
  const formElements = document.querySelector("form").elements;

  getCustomRules({
    player: formElements["player"].checked,
    single: formElements["single"].checked,
  });
}
