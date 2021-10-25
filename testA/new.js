Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getObject = function(key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
}

var testObject = { 'drinks': [0, 0, 0, 0], 'triggers': [0, 0, 0, 1], 'reflections': ["", ""] };
console.log('testObject: ', testObject);
// Put the object into storage
localStorage.setObject('a', testObject);

// Retrieve the object from storage
var retrievedObject = localStorage.getObject('testObject');
console.log('retrievedObject: ', retrievedObject);

// // Put the object into storage
// console.log('testObject: ', testObject);
// console.log('stringy: ', JSON.stringify(testObject));
// localStorage.setItem('testObject', JSON.stringify(testObject));


// // Retrieve the object from storage
// var retrievedObject = localStorage.getItem('testObject');
// console.log('retrievedObject: ', JSON.parse(retrievedObject));