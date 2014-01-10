var tabId = chrome.devtools.inspectedWindow.tabId;
var err = document.getElementById('error');
var editor = ace.edit("cc-editor");
editor.setTheme("ace/theme/twilight");
editor.session.setMode("ace/mode/coffee");
editor.session.setUseSoftTabs(true);
editor.session.setTabSize(2);
editor.setShowPrintMargin(false);

var compiled = ace.edit("cc-results");
compiled.setTheme("ace/theme/twilight");
compiled.session.setMode("ace/mode/javascript");
compiled.session.setUseSoftTabs(true);
compiled.session.setTabSize(2);
compiled.setShowPrintMargin(false);


function compileIt(){
    chrome.devtools.inspectedWindow.eval( compiled.session.getValue(), function(result, isException) {});
}

function update(){
    try {
        var compiledSource = CoffeeScript.compile( editor.session.getValue(), {bare:true});
        compiled.session.setValue(compiledSource);
        err.className = 'is-hidden';
    } catch (error) {
        err.className = '';
        err.innerHTML = error.message;
    }
    localStorage.setItem("state" + tabId, editor.session.getValue());
}

schedule = function(fn, timeout) {
    if (fn.$timer) return;
    fn.$timer = setTimeout(function() {fn.$timer = null; fn()}, timeout || 10);
}

editor.on("change", function(e){
    schedule(update, 20);
});

var compileOptions = {
    name: "compileIt",
    exec: compileIt,
    bindKey: "Ctrl-Return|Command-Return|Shift-Return"
};

editor.commands.addCommand(compileOptions);
compiled.commands.addCommand(compileOptions);

document.getElementById('runcc').addEventListener('click', compileIt);
editor.session.setValue(localStorage.getItem("state" + tabId));
schedule(function(){ editor.focus() }, 20);

