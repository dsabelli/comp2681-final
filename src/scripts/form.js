// Combine fetching CSS and HTML into a single promise chain
(async () => {
  try {
    // Load the external CSS file
    const cssResponse = await fetch("../styles/output.css");
    const cssText = await cssResponse.text();
    const styleSheet = new CSSStyleSheet();
    styleSheet.replaceSync(cssText);

    // Load the form HTML content
    const htmlComponent = "../components/form.html";
    const htmlResponse = await fetch(htmlComponent);
    const htmlContent = await htmlResponse.text();
    const template = document.createElement("template");
    template.innerHTML = htmlContent;

    // Fetch API key from Netlify function
    // const apiKeyResponse = await fetch("../../netlify/functions/getApiKey.js");
    // const apiKeyData = await apiKeyResponse.json();
    // const apiKey = apiKeyData.apiKey;
    (function () {
      emailjs.init({
        publicKey: "jzW08tXATahZEmECf",
      });
    })();

    // Define the custom element
    class FormElement extends HTMLElement {
      constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.adoptedStyleSheets = [styleSheet];
        shadowRoot.appendChild(template.content.cloneNode(true));

        shadowRoot
          .querySelector("#contact-form")
          .addEventListener("submit", function (event) {
            event.preventDefault();
            // these IDs from the previous steps
            emailjs.sendForm("service_mmlaf1r", "template_79xcu8k", this).then(
              () => {
                window.alert("SUCCESS!");
              },
              (error) => {
                window.alert("FAILED...", error);
              }
            );
          });
      }
    }
    // Define the custom element
    customElements.define("app-form", FormElement);
  } catch (error) {
    console.error("Initialization failed:", error);
  }
})();
