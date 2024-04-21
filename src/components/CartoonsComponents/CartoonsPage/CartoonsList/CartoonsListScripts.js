export const handleCartoonInfoPositioning = (event, styles) => {
  const questionMark = event.target.closest(`.${styles['question-mark']}`);
  if (!questionMark) return;

  const filmInfo = questionMark.nextElementSibling;

  if (filmInfo) {
    const filmInfoRect = filmInfo.getBoundingClientRect();


    if (filmInfoRect.right > window.innerWidth) {
      filmInfo.style.left = "auto";
        filmInfo.style.right = "100%";
    }
  } 
};