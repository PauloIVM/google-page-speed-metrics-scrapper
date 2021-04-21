let mobileMetricsButton = document.getElementById("mobile");
let desktopMetricsButton = document.getElementById("desktop");

mobileMetricsButton.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: new GooglePageSpeedScrapper().showMobileMetrics,
    });
});

desktopMetricsButton.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: new GooglePageSpeedScrapper().showDesktopMetrics,
    });
});

function GooglePageSpeedScrapper() {}

GooglePageSpeedScrapper.prototype.getMetrics = function(elementBase) {

    // For some reason I am not aware of, private methods are not recognized within other
    // methods when I pass the function to executeScript(). So I'm rewriting the getMetrics
    // method until I can resolve this.

    const fcp = elementBase.getElementsByClassName("lh-metric__value")[8].textContent.match(/([0-9]*,[0-9]*)|([0-9]*)/i)[0];
    const si  = elementBase.getElementsByClassName("lh-metric__value")[9].textContent.match(/([0-9]*,[0-9]*)|([0-9]*)/i)[0];
    const lcp = elementBase.getElementsByClassName("lh-metric__value")[10].textContent.match(/([0-9]*,[0-9]*)|([0-9]*)/i)[0];
    const tti = elementBase.getElementsByClassName("lh-metric__value")[11].textContent.match(/([0-9]*,[0-9]*)|([0-9]*)/i)[0];
    const tbt = elementBase.getElementsByClassName("lh-metric__value")[12].textContent.match(/([0-9]*,[0-9]*)|([0-9]*)/i)[0];
    const cls = elementBase.getElementsByClassName("lh-metric__value")[13].textContent.match(/([0-9]*,[0-9]*)|([0-9]*)/i)[0];
    const page_speed = elementBase.getElementsByClassName("lh-gauge__percentage")[0].textContent;
    return (fcp+" "+si+" "+lcp+" "+tti+" "+tbt+" "+cls+" "+page_speed);
}

GooglePageSpeedScrapper.prototype.copyTextToClipboard = function(text) {
    
    // This method is unused for the same reason on the getMetrics() method
    
    var textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";     
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select(); 
    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }  
    document.body.removeChild(textArea);
}

GooglePageSpeedScrapper.prototype.showMobileMetrics = function() {
    function getMetrics(elementBase) {
        const fcp = elementBase.getElementsByClassName("lh-metric__value")[8].textContent.match(/([0-9]*,[0-9]*)|([0-9]*)/i)[0];
        const si  = elementBase.getElementsByClassName("lh-metric__value")[9].textContent.match(/([0-9]*,[0-9]*)|([0-9]*)/i)[0];
        const lcp = elementBase.getElementsByClassName("lh-metric__value")[10].textContent.match(/([0-9]*,[0-9]*)|([0-9]*)/i)[0];
        const tti = elementBase.getElementsByClassName("lh-metric__value")[11].textContent.match(/([0-9]*,[0-9]*)|([0-9]*)/i)[0];
        const tbt = elementBase.getElementsByClassName("lh-metric__value")[12].textContent.match(/([0-9]*,[0-9]*)|([0-9]*)/i)[0];
        const cls = elementBase.getElementsByClassName("lh-metric__value")[13].textContent.match(/([0-9]*,[0-9]*)|([0-9]*)/i)[0];
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
          var successful = document.execCommand('copy');
          var msg = successful ? 'successful' : 'unsuccessful';
          console.log('Fallback: Copying text command was ' + msg);
        } catch (err) {
          console.error('Fallback: Oops, unable to copy', err);
        }  
        document.body.removeChild(textArea);
    }

    const elementBase = document.getElementsByClassName("goog-control result lh-vars lh-root");
    console.log("Mobile:");
    console.log(getMetrics(elementBase[0]));
    copyTextToClipboard(getMetrics(elementBase[0]))
}

GooglePageSpeedScrapper.prototype.showDesktopMetrics = function() {
    function getMetrics(elementBase) {
        const fcp = elementBase.getElementsByClassName("lh-metric__value")[8].textContent.match(/([0-9]*,[0-9]*)|([0-9]*)/i)[0];
        const si  = elementBase.getElementsByClassName("lh-metric__value")[9].textContent.match(/([0-9]*,[0-9]*)|([0-9]*)/i)[0];
        const lcp = elementBase.getElementsByClassName("lh-metric__value")[10].textContent.match(/([0-9]*,[0-9]*)|([0-9]*)/i)[0];
        const tti = elementBase.getElementsByClassName("lh-metric__value")[11].textContent.match(/([0-9]*,[0-9]*)|([0-9]*)/i)[0];
        const tbt = elementBase.getElementsByClassName("lh-metric__value")[12].textContent.match(/([0-9]*,[0-9]*)|([0-9]*)/i)[0];
        const cls = elementBase.getElementsByClassName("lh-metric__value")[13].textContent.match(/([0-9]*,[0-9]*)|([0-9]*)/i)[0];
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
          var successful = document.execCommand('copy');
          var msg = successful ? 'successful' : 'unsuccessful';
          console.log('Fallback: Copying text command was ' + msg);
        } catch (err) {
          console.error('Fallback: Oops, unable to copy', err);
        }  
        document.body.removeChild(textArea);
    }
    const elementBase = document.getElementsByClassName("goog-control result lh-vars lh-root");
    console.log("Destop:");
    console.log(getMetrics(elementBase[1]));
    copyTextToClipboard(getMetrics(elementBase[1]))
}