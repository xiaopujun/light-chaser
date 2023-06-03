fetch('http://www.lcdev.com/lc/test/postDemo', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        range: 23,
    })
})
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));



