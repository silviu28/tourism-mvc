const startDate = new Date("10/13/2025");
const actualTime = new Date();
const timeSince_seconds = (actualTime.getTime() - startDate.getTime()) / 1000;
const timeSince_minutes = (actualTime.getTime() - startDate.getTime()) / (1000 * 60);
const timeSince_hours = (actualTime.getTime() - startDate.getTime()) / (1000 * 3600);
const timeSince_days = (actualTime.getTime() - startDate.getTime()) / (1000 * 3600 * 24);

const sub = document.createElement('sub');
sub.innerText = `Last updated on ${startDate.toDateString()}, ${Math.floor(timeSince_days)} days ago.`;
document.body.appendChild(sub);