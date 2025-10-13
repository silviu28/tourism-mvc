const submitForm = function (event) {
  event.preventDefault();
  const name = document.getElementById('namefield').textContent;
  const email = document.getElementById('emailfield').textContent;
  const password = document.getElementById('passwordfield').textContent;

  // server POST here...
  alert('signup successful');
}