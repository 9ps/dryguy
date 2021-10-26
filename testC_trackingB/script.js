//these prototype methods are to set and get objects to Local storage
Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getObject = function(key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
}

const currentDate = document.querySelector('.currentDate');
var d = new Date();
var today = new Date(d.getFullYear(), d.getMonth(), d.getDate());
currentDate.textContent = today.getDate();