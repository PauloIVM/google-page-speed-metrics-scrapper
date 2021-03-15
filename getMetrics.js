function getMetrics(elementBase) {
    const fcp = elementBase.getElementsByClassName("lh-metric__value")[4].textContent.match(/([0-9]*,[0-9]*)|([0-9]*)/i)[0];
    const si  = elementBase.getElementsByClassName("lh-metric__value")[5].textContent.match(/([0-9]*,[0-9]*)|([0-9]*)/i)[0];
    const lcp = elementBase.getElementsByClassName("lh-metric__value")[6].textContent.match(/([0-9]*,[0-9]*)|([0-9]*)/i)[0];
    const tti = elementBase.getElementsByClassName("lh-metric__value")[7].textContent.match(/([0-9]*,[0-9]*)|([0-9]*)/i)[0];
    const tbt = elementBase.getElementsByClassName("lh-metric__value")[8].textContent.match(/([0-9]*,[0-9]*)|([0-9]*)/i)[0];
    const cls = elementBase.getElementsByClassName("lh-metric__value")[9].textContent.match(/([0-9]*,[0-9]*)|([0-9]*)/i)[0];
    const page_speed = elementBase.getElementsByClassName("lh-gauge__percentage")[0].textContent;
    return (fcp+" "+si+" "+lcp+" "+tti+" "+tbt+" "+cls+" "+page_speed);
}
function logMobileAndResidentialMetrics() {
    const elementBase = document.getElementsByClassName("goog-control result lh-vars lh-root");
    console.log("Mobile:");
    console.log(getMetrics(elementBase[0]));
    console.log("Residential:");
    console.log(getMetrics(elementBase[1]));
}