const image = document.getElementById("image");

const images = [
  "/images/gallery/gallery1.jpg",
  "/images/gallery/gallery2.jpg",
  "/images/gallery/gallery3.jpg",
  "/images/gallery/gallery4.jpeg",
  "/images/gallery/gallery5.jpg"
];

const sendButton = document.getElementById("sendbutton");
const topbutton = document.getElementById("topButton");

window.onscroll = function () {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    topbutton.style.display = "block";
  } else {
    topbutton.style.display = "none";
  }
};

const toTop = function () {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

setInterval(function () {
  let random = Math.floor(Math.random() * 5);
  image.src = images[random];
}, 5000);

sendbutton.onclick = function () {
  window.alert("Form has been sent!");
}

const sendFeedback = function (event) {
  event.preventDefault();
  alert('thank you for your feedback');
  // add POST here...
}