// Check for entering sensitive data into unsecure webpage
let protocol = window.location.protocol;
protocol = protocol.substring(0, protocol.length - 1);
let hasPassword = document.querySelector('input[type="password"]') != null;
if (protocol === 'http' && hasPassword) {
    chrome.runtime.sendMessage({
        action: 'CreateDialog',
        type: 'text',
        content: "This site isn't secure. Don't enter any sensitive information"
    });
} else {
    console.log("This site is safe");
}


// Check for 3rd party download sites
let tp_download_sites = [
    /download\.cnet\.com/,
    /softonic\.com/
];
let hostname = window.location.hostname;
tp_download_sites.forEach((v, i, arr) => {
    if (v.test(hostname)) {
        alert("Matched bad hosts");
    }
});
