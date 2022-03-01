const paywallElementClasses = ["tp-modal", "tp-backdrop"];
const paywallElementIDs = ["paywall_wrapper"];
const paywallBodyClasses = ["tp-modal-open"];
const paywallBodyStyles = [
  ["height", "100vh"],
  ["overflow", "hidden"],
];

const paywallElementObserver = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    mutation.addedNodes.forEach(function (node) {
      paywallElementClasses.forEach((elementClass) => {
        document.querySelectorAll(`.${elementClass}`).forEach((e) => {
          e.remove();
          console.log(`Paywall .${elementClass} removed`);
        });
      });

      paywallElementIDs.forEach((elementID) => {
        if (node.id == elementID) {
          document.querySelector(`#${elementID}`).remove();
          console.log(`Paywall #${elementID} removed`);
        }
      });
    });
  });
});

const bodyStyleObserver = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    switch (mutation.attributeName) {
      case "class":
        paywallBodyClasses.forEach((bodyClass) => {
          if (mutation.target.hasClass(bodyClass)) {
            mutation.target.classList.remove(bodyClass);
            console.log(`Paywall class ${bodyClass} removed from body element`);
          }
        });
        break;
      case "style":
        paywallBodyStyles.forEach((bodyStyle) => {
          if (mutation.target.style[bodyStyle[0]] == bodyStyle[1])
            mutation.target.style[bodyStyle[0]] = "";
          console.log(
            `Paywall inline style ${bodyStyle[0]}: ${bodyStyle[1]} removed from body element`
          );
        });
        break;
    }
  });
});

paywallElementObserver.observe(document.querySelector("body"), {
  subtree: true,
  childList: true,
});

bodyStyleObserver.observe(document.querySelector("body"), {
  attributeFilter: ["class", "style"],
  subtree: false,
  childList: false,
});

console.log("Started observing for paywall");
