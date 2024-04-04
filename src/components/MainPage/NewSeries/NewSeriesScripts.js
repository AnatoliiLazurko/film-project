export const handleSerialInfoPositioning = (event, styles) => {
  const questionMark = event.target.closest(`.${styles['question-mark']}`);
  if (!questionMark) return;

  const serialInfo = questionMark.nextElementSibling;

  if (serialInfo) {
    const serialInfoRect = serialInfo.getBoundingClientRect();


    if (serialInfoRect.right > window.innerWidth) {
      serialInfo.style.left = "auto";
        serialInfo.style.right = "100%";
    }
  } 
};