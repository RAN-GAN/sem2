window.onload = function() {
    fetch('txt.txt')
    .then(response => response.text())
    .then(text => {
        document.getElementById('fileContent').textContent = text;
        Prism.highlightAll();
    })
    .catch(error => console.error('Error loading the file:', error));
};
