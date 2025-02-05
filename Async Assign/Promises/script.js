document.getElementById('promiseButton').addEventListener('click', function() {
    const resultDiv = document.getElementById('result');
    
    // Show loading message
    resultDiv.innerText = "Loading...";
    
    // Create a new Promise
    const fetchDataPromise = new Promise((resolve, reject) => {
        // Set a timeout for 5 seconds
        const timeout = setTimeout(() => {
            reject("Operation timed out.");
        }, 5000);
        
        // Fetch data from the API
        fetch('https://dummyjson.com/posts')
            .then(response => {
                clearTimeout(timeout); // Clear timeout if fetch is successful
                if (!response.ok) throw new Error("Network response was not ok");
                return response.json();
            })
            .then(data => {
                resolve(data.posts.map(post => post.title).join('<br>'));
            })
            .catch(error => reject(error.message));
    });

    // Handle the promise result
    fetchDataPromise
        .then(titles => {
            resultDiv.innerHTML = `<strong>Fetched Titles:</strong><br>${titles}`;
        })
        .catch(errorMessage => {
            resultDiv.innerText = errorMessage; // Display error message
        });
});
