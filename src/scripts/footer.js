// Asynchronously loads a module named 'simpleLogo.js' from the current directory
async function loadModule() {
  const module = await import("./simpleLogo.js");
}

// Attempts to load the 'simpleLogo.js' module and logs any errors to the console
loadModule().catch((error) => console.error("Failed to load module:", error));

// Immediately invoked async function expression to handle asynchronous operations
(async () => {
  try {
    // Fetches the external CSS file located at '../styles/output.css'
    const cssResponse = await fetch("../styles/output.css");
    const cssText = await cssResponse.text(); // Reads the fetched CSS as text

    // Creates a new CSSStyleSheet object and replaces its content with the fetched CSS
    const styleSheet = new CSSStyleSheet();
    styleSheet.replaceSync(cssText); // Synchronously replaces the stylesheet content

    // Fetches the HTML content for the footer from '../components/footer.html'
    const htmlComponent = "../components/footer.html";
    const htmlResponse = await fetch(htmlComponent);
    const htmlContent = await htmlResponse.text(); // Reads the fetched HTML as text

    // Creates a new template element and sets its innerHTML to the fetched HTML content
    const template = document.createElement("template");
    template.innerHTML = htmlContent; // Parses the HTML string into DOM nodes

    // Defines a custom web component extending HTMLElement
    class FooterElement extends HTMLElement {
      constructor() {
        super(); // Calls the superclass constructor

        // Attaches a shadow root to the custom element with open mode
        const shadowRoot = this.attachShadow({ mode: "open" });

        // Adopts the fetched CSS stylesheet into the shadow root
        shadowRoot.adoptedStyleSheets = [styleSheet];

        // Appends the cloned content of the fetched HTML template to the shadow root
        shadowRoot.appendChild(template.content.cloneNode(true)); // Clones the template content to avoid direct manipulation of the original

        // Updates the year span with the current year
        const year = new Date().getFullYear();
        const yearSpan = shadowRoot.getElementById("year");
        yearSpan.innerText = year; // Sets the text content of the year span

        // Dynamically inserts the app-logo custom element into the logo-footer slot
        const logo = shadowRoot.getElementById("logo-footer");
        logo.innerHTML = `<app-logo></app-logo>`; // Inserts the app-logo element
      }
    }

    // Registers the custom element with the browser under the tag name 'app-footer'
    customElements.define("app-footer", FooterElement);
  } catch (error) {
    // Logs initialization failures to the console
    console.error("Initialization failed:", error);
  }
})();
