async function loadModule() {
  const module = await import("./simpleLogo.js");
}

loadModule().catch((error) => console.error("Failed to load module:", error));

// Combine fetching CSS and HTML into a single promise chain
(async () => {
  try {
    // Load the external CSS file
    const cssResponse = await fetch("../styles/output.css");
    const cssText = await cssResponse.text();
    const styleSheet = new CSSStyleSheet();
    styleSheet.replaceSync(cssText);

    // Load the footer HTML content
    const htmlComponent = "../components/footer.html";
    const htmlResponse = await fetch(htmlComponent);
    const htmlContent = await htmlResponse.text();
    const template = document.createElement("template");
    template.innerHTML = htmlContent;

    // Define the custom element
    class FooterElement extends HTMLElement {
      constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.adoptedStyleSheets = [styleSheet];
        shadowRoot.appendChild(template.content.cloneNode(true));

        const year = new Date().getFullYear();
        const yearSpan = shadowRoot.getElementById("year");
        yearSpan.innerText = year;

        const logo = shadowRoot.getElementById("logo-footer");
        logo.innerHTML = `<app-logo></app-logo>`;
      }
    }
    // Define the custom element
    customElements.define("app-footer", FooterElement);
  } catch (error) {
    console.error("Initialization failed:", error);
  }
})();
