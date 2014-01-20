var tabId = chrome.devtools.inspectedWindow.tabId;
var resultsPanel = document.getElementById('cc-results');
var editorPanel = document.getElementById('cc-editor');
var err = document.getElementById('error');
var editor = ace.edit("cc-editor");
var compiled = ace.edit("cc-results");
var editorSizeKey = "cc-size";
var gutter = resultsPanel.querySelector('.ace_gutter');

function debug() {
    var args = Array.prototype.slice.call(arguments);
    var message = args.map(function(arg) {
        return JSON.stringify(arg);
    }).join(",")
    chrome.devtools.inspectedWindow.eval("console.log(" + message + ")")
}

function debugClick() {
  var offset = resultsPanel.offsetLeft;
  var to = event.pageX;
  var gutterWidth = gutter.offsetWidth
  debug("click:", "to", to, "offset", offset, "gutter width", gutterWidth)
}

// use percentages in case window size changes
function editorWidths() {
    var windowWidth = window.innerWidth;
    function percentWindow(width) {
        return parseInt(width) / windowWidth * 100 + '%';
    }
    return {
        editor: percentWindow(window.getComputedStyle(editorPanel).right),
        results: percentWindow(window.getComputedStyle(resultsPanel).left)
    }
}

function getSizes() {
    var stored = localStorage.getItem(editorSizeKey);
    var sizes;
    if (stored) {
        try {
            sizes = JSON.parse(stored);
        } catch(e) {
            debug(e.message)
            sizes = editorWidths();
        }
    } else {
        sizes = editorWidths();
    }
    return sizes;
}

function setSizes(sizes) {
    if (sizes.editor && sizes.results) {
        editorPanel.style.right = sizes.editor;
        resultsPanel.style.left = sizes.results;
        localStorage.setItem(editorSizeKey, JSON.stringify(sizes));
    }
}

function updatePanels() {
    editor.setTheme("ace/theme/twilight");
    editor.session.setMode("ace/mode/coffee");
    editor.session.setUseSoftTabs(true);
    editor.session.setTabSize(2);
    editor.setShowPrintMargin(false);
    editor.getSession().setUseWrapMode(true);

    compiled.setTheme("ace/theme/twilight");
    compiled.session.setMode("ace/mode/javascript");
    compiled.session.setUseSoftTabs(true);
    compiled.session.setTabSize(2);
    compiled.setShowPrintMargin(false);
    compiled.getSession().setUseWrapMode(true);
}

function resizePanels(sizes) {
    setSizes(sizes);
    // redraw in order for ace to pick up new sizes
    updatePanels();
}

function compileIt(){
    chrome.devtools.inspectedWindow.eval( compiled.session.getValue(), function(result, error) {
        if (error) {
            showError(error.value);
            debug(error.value)
        }
    });
}

function showError(error) {
    err.className = '';
    err.innerHTML = error;
}

function clearError() {
    err.className = 'is-hidden';
}

function update(){
    try {
        var compiledSource = CoffeeScript.compile( editor.session.getValue(), {bare:true});
        compiled.session.setValue(compiledSource);
        clearError();
        err.className = 'is-hidden';
    } catch (error) {
        showError(error.message)
    }
    localStorage.setItem("state" + tabId, editor.session.getValue());
}

function movePanel(event) {
  var offset = resultsPanel.offsetLeft;
  // center resize cursor over gutter
  var padding = gutter.offsetWidth / 2;
  var to = event.pageX - padding;

  var left = (to / window.innerWidth * 100).toFixed(2);
  var right = (100 - (to / window.innerWidth * 100)).toFixed(2);

    resizePanels({
        editor: right + '%',
        results: left + '%'
    });
}

var sizes = getSizes();
resizePanels(sizes);

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

gutter.addEventListener('mousedown', function(event) {
  window.addEventListener('mousemove', movePanel);
});

window.addEventListener('mouseup', function(event) {
    window.removeEventListener('mousemove', movePanel);
});
