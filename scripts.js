// scripts.js
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

  // Show loading state
  contentDiv.innerHTML = "<p>Loading content...</p>";

  fetch("test.txt") // Changed from test.txt to txt.txt
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then((text) => {
      // Display all content immediately
      contentDiv.innerHTML = `<pre><code class="language-txt">${text}</code></pre>`;
      Prism.highlightAll();

      // Rest of the code remains same
      const sections = text.split("END");
      const topics = sections
        .map((section) => {
          const lines = section.trim().split("\n");
          return lines[0];
        })
        .filter((topic) => topic);

      // Add default option
      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.textContent = "Select a Topic";
      select.appendChild(defaultOption);

      topics.forEach((topic, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = topic;
        select.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Error loading the file:", error);
      contentDiv.innerHTML =
        '<p style="color: red;">Error loading content. Please check console for details.</p>';
    });
};
