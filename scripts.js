window.onload = function () {
  // Create elements first
  const select = document.createElement("select");
  select.id = "topicSelect";

  const contentDiv = document.createElement("div");
  contentDiv.id = "content";

  // Insert after disclaimer
  const disclaimer = document.querySelector(".disclaimer");
  disclaimer.after(select);
  select.after(contentDiv);

  fetch("test1.txt")
    .then((response) => response.text())
    .then((text) => {
      // Display initial content
      contentDiv.innerHTML = `<pre><code class="language-txt">${text}</code></pre>`;
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
          contentDiv.innerHTML = `<pre><code class="language-txt">${text}</code></pre>`;
        } else {
          const selectedContent = sections[this.value].trim();
          contentDiv.innerHTML = `<pre><code class="language-txt">${selectedContent}</code></pre>`;
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
