console.log('hello from comment section');

const comments = document.getElementById('comment-section');
const test = document.createElement('p');
test.innerText = 'yep';
comments.appendChild(test);