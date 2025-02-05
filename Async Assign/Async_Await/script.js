document.getElementById('asyncButton').addEventListener('click', async function() {
    const resultDiv = document.getElementById('result');
    
    // Show loading message
    resultDiv.innerText = "Loading...";
    
    try {
        const titles = await fetchData();
        resultDiv.innerHTML = `<strong>Fetched Titles:</strong><br>${titles}`;
    } catch (error) {
        resultDiv.innerText = error; // Display error message
    }
});

async function fetchData() {
    const response = await Promise.race([
        fetch('https://dummyjson.com/posts'),
        new Promise((_, reject) => setTimeout(() => reject("Operation timed out."), 5000))
    ]);

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.posts.map(post => post.title).join('<br>');
}
