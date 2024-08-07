// Combine fetching CSS and HTML into a single promise chain
(async () => {
  try {
    // Load the external CSS file
    const cssResponse = await fetch("../styles/output.css");
    const cssText = await cssResponse.text();
    const styleSheet = new CSSStyleSheet();
    styleSheet.replaceSync(cssText);

    // Load the logo HTML content
    const htmlComponent = "../components/simple-logo.html";
    const htmlResponse = await fetch(htmlComponent);
    const htmlContent = await htmlResponse.text();
    const template = document.createElement("template");
    template.innerHTML = htmlContent;

    // Define the custom element
    class LogoElement extends HTMLElement {
      constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.adoptedStyleSheets = [styleSheet];
        shadowRoot.appendChild(template.content.cloneNode(true));
      }
    }
    // Define the custom element
    customElements.define("app-logo", LogoElement);
  } catch (error) {
    console.error("Initialization failed:", error);
  }
})();
