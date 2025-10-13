const startTime = function () {
  const today = new Date();
  const h = today.getHours();
  const m = today.getMinutes();
  const s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById('time').innerText = h + ":" + m + ":" + s;
  setTimeout(startTime, 1000);
}

const checkTime = function (i) {
  if (i < 10) {
    i = '0' + i;
  }
  return i;
}

startTime();