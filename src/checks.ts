// Check for entering sensitive data into unsecure webpage
let protocol = window.location.protocol;
protocol = protocol.substring(0, protocol.length - 1);
let hasPassword = document.querySelector('input[type="password"]') != null;
if (protocol === 'http' && hasPassword) {
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
        chrome.runtime.sendMessage({
            target: 'tab',
            content: {
                action: 'CreateDialog',
                type: 'html_string',
                id: 'warning_dl',
                data: '<h3>This site is a third-party download site. Consider <a href="https://www.google.com/">searching</a> for an official download site</h3>',
                style: {
                    top: '30px',
                    left: '30px'
                }
            }
        });
    }
});
