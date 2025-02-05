document.getElementById('callbackButton').addEventListener('click', function() {
    setTimeout(() => {
        document.getElementById('result').innerText = "Callback executed after 5 seconds";
        fetchData(); // Call fetchData after the delay
    }, 5000);
});
function fetchData() {
    fetch('https://dummyjson.com/posts')
        .then(response => response.json())
        .then(data => {
            const titles = data.posts.map(post => post.title).join('<br>');
            document.getElementById('result').innerHTML += `<br><strong>Fetched Titles:</strong><br>${titles}`;
        })
        .catch(error => console.error('Error fetching data:', error));
}
