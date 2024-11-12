window.onload = function () {
  const userAgent = navigator.userAgent;
  console.log(userAgent);

  // Check for both Samsung Browser and Edge
  if (
    userAgent.includes("Tizen") ||
    userAgent.includes("Gear") ||
    userAgent.includes("SamsungBrowser")
  ) {
    const browserWarning = document.createElement("div");
    browserWarning.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #f5f5f5;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      font-size: 1.2rem;
      text-align: center;
      padding: 20px;
    `;

    // Custom message based on browser
    const message = "Padichu eluthu da parama🙏";

    browserWarning.innerHTML = message;
    document.body.appendChild(browserWarning);
    return;
  }
  const select = document.createElement("select");
  select.id = "topicSelect";

  const contentDiv = document.createElement("div");
  contentDiv.id = "content";

  // Insert after disclaimer
  const disclaimer = document.querySelector(".disclaimer");
  disclaimer.after(select);
  select.after(contentDiv);

  fetch("OsEndLAB2.txt")
    .then((response) => response.text())
    .then((text) => {
      // Function to escape HTML special characters
      function escapeHtml(unsafe) {
        return unsafe
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;");
      }
      const browserWarning = document.createElement("div");
      browserWarning.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #f5f5f5;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      font-size: 1.2rem;
      text-align: center;
      padding: 20px;
    `;

      // Custom message based on browser

      browserWarning.innerHTML = userAgent;
      document.body.appendChild(browserWarning);
      // Display initial content
      contentDiv.innerHTML = `<pre><code class="language-txt">${escapeHtml(
        text
      )}</code></pre>`;
      Prism.highlightAll();

      // Split and process sections
      const sections = text.split("END");
      const topics = sections
        .map((section) => {
          const lines = section.trim().split("\n");
          return lines[0];
        })
        .filter((topic) => topic);

      // Clear existing options
      select.innerHTML = "";

      // Add default option
      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.textContent = "Select a Topic";
      select.appendChild(defaultOption);

      // Add topic options
      topics.forEach((topic, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = topic;
        select.appendChild(option);
      });

      // Add change event listener
      select.addEventListener("change", function () {
        if (this.value === "") {
          contentDiv.innerHTML = `<pre><code class="language-txt">${escapeHtml(
            text
          )}</code></pre>`;
        } else {
          const selectedContent = sections[this.value].trim();
          contentDiv.innerHTML = `<pre><code class="language-txt">${escapeHtml(
            selectedContent
          )}</code></pre>`;
        }
        Prism.highlightAll();
      });
    })
    .catch((error) => {
      console.error("Error loading file:", error);
      contentDiv.innerHTML =
        '<p style="color: red;">Error loading content. Please refresh the page.</p>';
    });
};
