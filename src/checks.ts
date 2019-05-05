// Check for entering sensitive data into unsecure webpage
let protocol = window.location.protocol;
protocol = protocol.substring(0, protocol.length - 1);
let hasPassword = document.querySelector('input[type="password"]') != null;
if (protocol === 'https' && hasPassword) {
    console.log('bad');
    chrome.runtime.sendMessage({
        target: 'tab',
        content: {
            action: 'CreateDialog',
            type: 'text',
            id: 'warning',
            data: "This site isn't secure. Don't enter any sensitive information",
            style: {top: '100px'}
        }
    });
} else {
    console.log("This site is secure");
}


// Check for 3rd party download sites
let tp_download_sites = [
    /download\.cnet\.com/,
    /softonic\.com/
];
let hostname = window.location.hostname;
tp_download_sites.forEach((v, i, arr) => {
    if (v.test(hostname)) {
        console.log("MATCH");
        chrome.runtime.sendMessage({
            target: 'tab',
            content: {
                action: 'CreateDialog',
                type: 'text',
                //TODO add a google search for the first party download link
                id: 'warning_dl',
                data: "This site is a third-party download site. Consider searching for the official download site",
                style: {top: '100px'}
            }
        });
    }
});
