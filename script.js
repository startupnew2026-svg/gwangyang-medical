(() => {
  "use strict";

  const header = document.querySelector(".site-header");
  const menuToggle = header?.querySelector(".menu-toggle");
  const navigation = document.getElementById("site-navigation");
  const wideScreen = window.matchMedia("(min-width: 1360px)");

  if (header && menuToggle && navigation) {
    const setMenuOpen = (isOpen) => {
      header.classList.toggle("is-open", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "메뉴 닫기" : "메뉴 열기");
    };

    header.classList.add("is-enhanced");
    setMenuOpen(false);

    menuToggle.addEventListener("click", () => {
      setMenuOpen(!header.classList.contains("is-open"));
    });

    navigation.addEventListener("click", (event) => {
      if (event.target instanceof Element &&
          event.target.closest("a") &&
          !wideScreen.matches) {
        setMenuOpen(false);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" &&
          header.classList.contains("is-open") &&
          !wideScreen.matches) {
        setMenuOpen(false);
        menuToggle.focus();
      }
    });

    const resetMenu = () => setMenuOpen(false);
    if (typeof wideScreen.addEventListener === "function") {
      wideScreen.addEventListener("change", resetMenu);
    } else {
      wideScreen.addListener(resetMenu);
    }
  }

  const consultNotice = document.querySelector(".consult-notice");
  const consultButtons = document.querySelectorAll(".consult-button");

  if (consultNotice) {
    consultNotice.hidden = true;
    consultButtons.forEach((button) => {
      button.setAttribute("aria-controls", consultNotice.id);
      button.setAttribute("aria-expanded", "false");
      button.addEventListener("click", () => {
        const shouldShow = consultNotice.hidden;
        consultNotice.hidden = !shouldShow;
        consultButtons.forEach((consultButton) => {
          consultButton.setAttribute("aria-expanded", String(shouldShow));
        });
      });
    });
  }
})();
