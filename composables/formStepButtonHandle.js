/**
 * formStepButtonHandle
 *
 * Handles form step navigation, scrolling to the next or previous section if the form is valid.
 *
 * @param {boolean} valid - Whether the current form step is valid
 * @param {number} direction - Scroll direction (1 for next, -1 for previous)
 * @param {Ref<boolean>} buttonClick - Reactive reference to track button click state
 *
 * @example
 * formStepButtonHandle(isValid, 1, buttonClicked);
 *
 * @note
 * Assumes the existence of a form element in the DOM.
 */

export default function formStepButtonHandle(valid, direction, buttonClick) {
  buttonClick.value = true;
  if (valid) {
    //scroll to next section

    const $form = document.querySelector("form");

    const targetScrollPosition =
      window.innerHeight * direction + $form.scrollTop;

    $form.scroll({
      top: targetScrollPosition,
      left: 0,
    });
  }
}
