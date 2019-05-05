let protocol = window.location.protocol;
protocol = protocol.substring(0, protocol.length - 1);
let hasPassword = document.querySelector('input[type="password"]') != null;
if (protocol === 'http' && hasPassword) {
    // alert("Don't enter your password");
    chrome.runtime.sendMessage({
        action: 'CreateDialog',
        type: 'text',
        content: "This site isn't secure. Don't enter any sensitive information"
    });
} else {
    console.log("This site is safe");
}
