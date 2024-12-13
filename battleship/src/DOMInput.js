export function getCustomRules() {
  const formElements = document.querySelector("form").elements;

  return {
    player: formElements["player"].checked,
    single: formElements["single"].checked,
  };
}
