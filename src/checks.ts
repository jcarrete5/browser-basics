let protocol = window.location.protocol;
protocol = protocol.substring(0, protocol.length - 1);
let hasPassword = document.querySelector('input[type="password"]') != null;
if (protocol === 'http' && hasPassword) {
    alert("Don't enter your password");
} else {
    alert("Safe");
}
