var isIE = /*@cc_on!@*/ false || !!document.documentMode;

if (isIE) {
    window.alert("Your browser is not supported. Please use another browser (such as Google Chrome, Mozilla Firefox or Microsoft Edge) to use this tool.\n\nVotre navigateur n'est pas supporté; veuillez utiliser un autre navigateur (comme Google Chrome, Mozilla Firefox ou Microsoft Edge) pour utiliser cet outil.");
    throw new Error("Something went badly wrong!");
}