//METHODS, use localStorage.<>()
Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
}
Storage.prototype.getObject = function(key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
}

let data = localStorage.getObject("data");
if (data == null) { //if onboarding not complete
    console.log("no Data, fallback");
    localStorage.setObject("data", { name: "Ricky", 'dryDays': [0, 0, 1, 0, 1, 0, 0], 'dailyLimit': 2, 'majorGoal': 3, 'minorGoals': [1, 1, 1, 1, 0, 0, 0, 0] });
    let data = localStorage.getObject("data");
}

let username = document.getElementById('username');
username.textContent = data.name;
print(username);