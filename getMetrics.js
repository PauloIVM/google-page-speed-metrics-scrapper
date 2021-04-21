function GooglePageSpeedScrapper() {}

GooglePageSpeedScrapper.prototype.getMetrics = function(elementBase) {
    const fcp = elementBase.getElementsByClassName("lh-metric__value")[8].textContent.match(/([0-9]*,[0-9]*)|([0-9]*)/i)[0];
    const si  = elementBase.getElementsByClassName("lh-metric__value")[9].textContent.match(/([0-9]*,[0-9]*)|([0-9]*)/i)[0];
    const lcp = elementBase.getElementsByClassName("lh-metric__value")[10].textContent.match(/([0-9]*,[0-9]*)|([0-9]*)/i)[0];
    const tti = elementBase.getElementsByClassName("lh-metric__value")[11].textContent.match(/([0-9]*,[0-9]*)|([0-9]*)/i)[0];
    const tbt = elementBase.getElementsByClassName("lh-metric__value")[12].textContent.match(/([0-9]*,[0-9]*)|([0-9]*)/i)[0];
    const cls = elementBase.getElementsByClassName("lh-metric__value")[13].textContent.match(/([0-9]*,[0-9]*)|([0-9]*)/i)[0];
    const page_speed = elementBase.getElementsByClassName("lh-gauge__percentage")[0].textContent;
    return (fcp+" "+si+" "+lcp+" "+tti+" "+tbt+" "+cls+" "+page_speed);
}

GooglePageSpeedScrapper.prototype.showMobileMetrics = function() {
    const elementBase = document.getElementsByClassName("goog-control result lh-vars lh-root");
    console.log("Mobile:");
    console.log(this.getMetrics(elementBase[0]));
}

GooglePageSpeedScrapper.prototype.showDesktopMetrics = function() {
    const elementBase = document.getElementsByClassName("goog-control result lh-vars lh-root");
    console.log("Destop:");
    console.log(this.getMetrics(elementBase[1]));
}