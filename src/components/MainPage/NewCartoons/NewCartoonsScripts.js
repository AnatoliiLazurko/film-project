export const handleCartoonInfoPositioning = (event, styles) => {
  const questionMark = event.target.closest(`.${styles['question-mark']}`);
  if (!questionMark) return;

  const cartoonInfo = questionMark.nextElementSibling;

  if (cartoonInfo) {
    const cartoonInfoRect = cartoonInfo.getBoundingClientRect();


    if (cartoonInfoRect.right > window.innerWidth) {
      cartoonInfo.style.left = "auto";
        cartoonInfo.style.right = "100%";
    }
  } 
};