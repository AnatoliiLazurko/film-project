export const handleAnimeInfoPositioning = (event, styles) => {
  const questionMark = event.target.closest(`.${styles['question-mark']}`);
  if (!questionMark) return;

  const animeInfo = questionMark.nextElementSibling;

  if (animeInfo) {
    const animeInfoRect = animeInfo.getBoundingClientRect();


    if (animeInfoRect.right > window.innerWidth) {
      animeInfo.style.left = "auto";
        animeInfo.style.right = "100%";
    }
  } 
};