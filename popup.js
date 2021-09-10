let mobileMetricsButton = document.getElementById("mobile");
let desktopMetricsButton = document.getElementById("desktop");

mobileMetricsButton.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.storage.sync.set({deviceType: "mobile"});
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: copyLabMetrics,
    });
});

desktopMetricsButton.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.storage.sync.set({deviceType: "desktop"});
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: copyLabMetrics,
    });
});

const copyLabMetrics = function() {
    function getMetrics(elementBase) {
        const element = elementBase.getElementsByClassName("lh-metric__value");

        // There is a problem here. If the element.length was different than 14,
        // the scrapper will crash. This is because sometimes google displays a page
        // with a different layout, but I was unable to reproduce that page

        const offset = 0;

        const fcp = element[8+offset].textContent.match(/([0-9]*,[0-9]*)|([0-9]*)/i)[0];
        const si  = element[9+offset].textContent.match(/([0-9]*,[0-9]*)|([0-9]*)/i)[0];
        const lcp = element[10+offset].textContent.match(/([0-9]*,[0-9]*)|([0-9]*)/i)[0];
        const tti = element[11+offset].textContent.match(/([0-9]*,[0-9]*)|([0-9]*)/i)[0];
        const tbt = element[12+offset].textContent.match(/([0-9]*,[0-9]*)|([0-9]*)/i)[0];
        const cls = element[13+offset].textContent.match(/([0-9]*,[0-9]*)|([0-9]*)/i)[0];
        const page_speed = elementBase.getElementsByClassName("lh-gauge__percentage")[0].textContent;
        return (fcp+" "+si+" "+lcp+" "+tti+" "+tbt+" "+cls+" "+page_speed);
    }
    function copyTextToClipboard(text) {
        var textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";     
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select(); 
        try {
            document.execCommand('copy');
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }  
        document.body.removeChild(textArea);
    }
    chrome.storage.sync.get(['deviceType'], function(result) {
        const deviceType = result.deviceType;
        const elementBase = document.getElementsByClassName("goog-control result lh-vars lh-root");
        const index = deviceType === "mobile" ? 0 : 1;
        copyTextToClipboard(getMetrics(elementBase[index]))
    });
}
