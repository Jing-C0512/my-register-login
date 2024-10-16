function isInputHasContext(domList = []) {
  if (
    !(
      domList &&
      Array.isArray(domList) &&
      domList.length > 0
    )
  ) {
    return -1; // error code 1
  }
  let status = 0; // success code 0
  domList.forEach((dom) => {
    if (dom.value === "") {
      status = 1; // false code 1
    }
  });
  return status;
}

function clearDomValue(domList = []) {
  if (
    domList &&
    Array.isArray(domList) &&
    domList.length > 0
  ) {
    domList.forEach((dom) => {
      dom.value = "";
    });
  }
}

export { isInputHasContext, clearDomValue };
