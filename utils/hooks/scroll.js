import { useEffect } from "react";

/// 'useSaveScrollPosition': use this hook to save scroll position in sessionStorage against route

export const useSaveScrollPosition = () => {
  useEffect(() => {
    // event listener to listen for window scroll events & keep track of current (scrollX, scrollY) position.
    addEventListener(
      "scroll",
      () => {
        if (scrollY > 0) {
          sessionStorage.setItem(window.location.pathname, scrollY);
        }
      },
      true
    );
  }, []); // -> [] renders only on first render, while no dependency array runs on every render
};

/// 'useScroll': use this hook to scroll the page at the lastly scrolled previous location in screen if any

export const useScroll = () => {
  useEffect(() => {
    const posY = sessionStorage.getItem(window.location.pathname) ?? 0;
    scroll(0, posY);
  }); // -> no dependency array - runs on every render.
};

/// 'useScrollBottomHandler': use this hook to execute some method when the user scrolls nearly at the bottom of a page

export const useScrollBottomHandler = (execute) => {
  let onSleep = true;
  setTimeout(() => (onSleep = false), 500); // give him some time!

  useEffect(() => {
    addEventListener("scroll", scrollHandler);
    return () => {
      removeEventListener("scroll", scrollHandler);
    };
  });

  const scrollHandler = () => {
    if (
      window.innerHeight + window.scrollY + 50 >=
      document.body.offsetHeight
    ) {
      if (!onSleep) {
        execute();
        onSleep = true;
        setTimeout(() => (onSleep = false), 2000);
      }
    }
  }; // -> scroll handler not working with [] empty dependency array!
};
