const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");
const currentYear = document.querySelector("#current-year");
const designDialog = document.querySelector(".design-dialog");
const dialogImage = document.querySelector(".dialog-image");
const dialogTitle = document.querySelector("#dialog-title");
const dialogDescription = document.querySelector(".dialog-description");
const marketplaceButton = document.querySelector(".marketplace-button");
const dialogClose = document.querySelector(".dialog-close");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    siteNav.classList.toggle("is-open", !isExpanded);
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      menuToggle.setAttribute("aria-expanded", "false");
      siteNav.classList.remove("is-open");
    }
  });
}

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}

if (
  designDialog instanceof HTMLDialogElement
  && dialogImage instanceof HTMLImageElement
  && dialogTitle
  && dialogDescription
  && marketplaceButton instanceof HTMLAnchorElement
) {
  document.querySelectorAll(".design-card").forEach((card) => {
    const trigger = card.querySelector(".design-link");
    const image = card.querySelector(".design-image");

    if (!(trigger instanceof HTMLButtonElement) || !(image instanceof HTMLImageElement)) {
      return;
    }

    trigger.addEventListener("click", () => {
      dialogImage.src = image.currentSrc || image.src;
      dialogImage.alt = image.alt;
      dialogTitle.textContent = card.dataset.designTitle || "";
      dialogDescription.textContent = card.dataset.designDescription || "";
      marketplaceButton.href = card.dataset.marketplaceUrl || "https://desoma.com/";
      designDialog.showModal();
    });
  });

  dialogClose?.addEventListener("click", () => {
    designDialog.close();
  });

  designDialog.addEventListener("click", (event) => {
    if (event.target !== designDialog) {
      return;
    }

    const bounds = designDialog.getBoundingClientRect();
    const clickedInside = event.clientX >= bounds.left
      && event.clientX <= bounds.right
      && event.clientY >= bounds.top
      && event.clientY <= bounds.bottom;

    if (!clickedInside) {
      designDialog.close();
    }
  });
}
