/**
 * Featherlight - ultra slim jQuery lightbox
 * Version 1.2.3 - http://noelboss.github.io/featherlight/
 *
 * Copyright 2015, Noël Raoul Bossart (http://www.noelboss.com)
 * MIT Licensed.
**/
!function(a){"use strict";function b(a,c){if(!(this instanceof b)){var d=new b(a,c);return d.open(),d}this.id=b.id++,this.setup(a,c),this.chainCallbacks(b._callbackChain)}if("undefined"==typeof a)return void("console"in window&&window.console.info("Too much lightness, Featherlight needs jQuery."));var c=[],d=function(b){return c=a.grep(c,function(a){return a!==b&&a.$instance.closest("body").length>0})},e=function(a,b){var c={},d=new RegExp("^"+b+"([A-Z])(.*)");for(var e in a){var f=e.match(d);if(f){var g=(f[1]+f[2].replace(/([A-Z])/g,"-$1")).toLowerCase();c[g]=a[e]}}return c},f={keyup:"onKeyUp",resize:"onResize"},g=function(c){a.each(b.opened().reverse(),function(){return c.isDefaultPrevented()||!1!==this[f[c.type]](c)?void 0:(c.preventDefault(),c.stopPropagation(),!1)})},h=function(c){if(c!==b._globalHandlerInstalled){b._globalHandlerInstalled=c;var d=a.map(f,function(a,c){return c+"."+b.prototype.namespace}).join(" ");a(window)[c?"on":"off"](d,g)}};b.prototype={constructor:b,namespace:"featherlight",targetAttr:"data-featherlight",variant:null,resetCss:!1,background:null,openTrigger:"click",closeTrigger:"click",filter:null,root:"body",openSpeed:250,closeSpeed:250,closeOnClick:"background",closeOnEsc:!0,closeIcon:"&#10005;",loading:"",otherClose:null,beforeOpen:a.noop,beforeContent:a.noop,beforeClose:a.noop,afterOpen:a.noop,afterContent:a.noop,afterClose:a.noop,onKeyUp:a.noop,onResize:a.noop,type:null,contentFilters:["jquery","image","html","ajax","iframe","text"],setup:function(b,c){"object"!=typeof b||b instanceof a!=!1||c||(c=b,b=void 0);var d=a.extend(this,c,{target:b}),e=d.resetCss?d.namespace+"-reset":d.namespace,f=a(d.background||['<div class="'+e+"-loading "+e+'">','<div class="'+e+'-content">','<span class="'+e+"-close-icon "+d.namespace+'-close">',d.closeIcon,"</span>",'<div class="'+d.namespace+'-inner">'+d.loading+"</div>","</div>","</div>"].join("")),g="."+d.namespace+"-close"+(d.otherClose?","+d.otherClose:"");return d.$instance=f.clone().addClass(d.variant),d.$instance.on(d.closeTrigger+"."+d.namespace,function(b){var c=a(b.target);("background"===d.closeOnClick&&c.is("."+d.namespace)||"anywhere"===d.closeOnClick||c.closest(g).length)&&(b.preventDefault(),d.close())}),this},getContent:function(){var b=this,c=this.constructor.contentFilters,d=function(a){return b.$currentTarget&&b.$currentTarget.attr(a)},e=d(b.targetAttr),f=b.target||e||"",g=c[b.type];if(!g&&f in c&&(g=c[f],f=b.target&&e),f=f||d("href")||"",!g)for(var h in c)b[h]&&(g=c[h],f=b[h]);if(!g){var i=f;if(f=null,a.each(b.contentFilters,function(){return g=c[this],g.test&&(f=g.test(i)),!f&&g.regex&&i.match&&i.match(g.regex)&&(f=i),!f}),!f)return"console"in window&&window.console.error("Featherlight: no content filter found "+(i?' for "'+i+'"':" (no target specified)")),!1}return g.process.call(b,f)},setContent:function(b){var c=this;return(b.is("iframe")||a("iframe",b).length>0)&&c.$instance.addClass(c.namespace+"-iframe"),c.$instance.removeClass(c.namespace+"-loading"),c.$instance.find("."+c.namespace+"-inner").slice(1).remove().end().replaceWith(a.contains(c.$instance[0],b[0])?"":b),c.$content=b.addClass(c.namespace+"-inner"),c},open:function(b){var d=this;if(d.$instance.hide().appendTo(d.root),!(b&&b.isDefaultPrevented()||d.beforeOpen(b)===!1)){b&&b.preventDefault();var e=d.getContent();if(e)return c.push(d),h(!0),d.$instance.fadeIn(d.openSpeed),d.beforeContent(b),a.when(e).always(function(a){d.setContent(a),d.afterContent(b)}).then(d.$instance.promise()).done(function(){d.afterOpen(b)})}return d.$instance.detach(),a.Deferred().reject().promise()},close:function(b){var c=this,e=a.Deferred();return c.beforeClose(b)===!1?e.reject():(0===d(c).length&&h(!1),c.$instance.fadeOut(c.closeSpeed,function(){c.$instance.detach(),c.afterClose(b),e.resolve()})),e.promise()},chainCallbacks:function(b){for(var c in b)this[c]=a.proxy(b[c],this,a.proxy(this[c],this))}},a.extend(b,{id:0,autoBind:"[data-featherlight]",defaults:b.prototype,contentFilters:{jquery:{regex:/^[#.]\w/,test:function(b){return b instanceof a&&b},process:function(b){return a(b).clone(!0)}},image:{regex:/\.(png|jpg|jpeg|gif|tiff|bmp)(\?\S*)?$/i,process:function(b){var c=this,d=a.Deferred(),e=new Image,f=a('<img src="'+b+'" alt="" class="'+c.namespace+'-image" />');return e.onload=function(){f.naturalWidth=e.width,f.naturalHeight=e.height,d.resolve(f)},e.onerror=function(){d.reject(f)},e.src=b,d.promise()}},html:{regex:/^\s*<[\w!][^<]*>/,process:function(b){return a(b)}},ajax:{regex:/./,process:function(b){var c=a.Deferred(),d=a("<div></div>").load(b,function(a,b){"error"!==b&&c.resolve(d.contents()),c.fail()});return c.promise()}},iframe:{process:function(b){var c=new a.Deferred,d=a("<iframe/>").hide().attr("src",b).css(e(this,"iframe")).on("load",function(){c.resolve(d.show())}).appendTo(this.$instance.find("."+this.namespace+"-content"));return c.promise()}},text:{process:function(b){return a("<div>",{text:b})}}},functionAttributes:["beforeOpen","afterOpen","beforeContent","afterContent","beforeClose","afterClose"],readElementConfig:function(b,c){var d=this,e=new RegExp("^data-"+c+"-(.*)"),f={};return b&&b.attributes&&a.each(b.attributes,function(){var b=this.name.match(e);if(b){var c=this.value,g=a.camelCase(b[1]);if(a.inArray(g,d.functionAttributes)>=0)c=new Function(c);else try{c=a.parseJSON(c)}catch(h){}f[g]=c}}),f},extend:function(b,c){var d=function(){this.constructor=b};return d.prototype=this.prototype,b.prototype=new d,b.__super__=this.prototype,a.extend(b,this,c),b.defaults=b.prototype,b},attach:function(b,c,d){var e=this;"object"!=typeof c||c instanceof a!=!1||d||(d=c,c=void 0),d=a.extend({},d);var f=d.namespace||e.defaults.namespace,g=a.extend({},e.defaults,e.readElementConfig(b[0],f),d);return b.on(g.openTrigger+"."+g.namespace,g.filter,function(f){var h=a.extend({$source:b,$currentTarget:a(this)},e.readElementConfig(b[0],g.namespace),e.readElementConfig(this,g.namespace),d);new e(c,h).open(f)}),b},current:function(){var a=this.opened();return a[a.length-1]||null},opened:function(){var b=this;return d(),a.grep(c,function(a){return a instanceof b})},close:function(){var a=this.current();return a?a.close():void 0},_onReady:function(){var b=this;b.autoBind&&(b.attach(a(document),{filter:b.autoBind}),a(b.autoBind).filter("[data-featherlight-filter]").each(function(){b.attach(a(this))}))},_callbackChain:{onKeyUp:function(a,b){return 27===b.keyCode?(this.closeOnEsc&&this.$instance.find("."+this.namespace+"-close:first").click(),!1):a(b)},onResize:function(a,b){if(this.$content.naturalWidth){var c=this.$content.naturalWidth,d=this.$content.naturalHeight;this.$content.css("width","").css("height","");var e=Math.max(c/parseInt(this.$content.parent().css("width"),10),d/parseInt(this.$content.parent().css("height"),10));e>1&&this.$content.css("width",""+c/e+"px").css("height",""+d/e+"px")}return a(b)},afterContent:function(a,b){var c=a(b);return this.onResize(b),c}}}),a.featherlight=b,a.fn.featherlight=function(a,c){return b.attach(this,a,c)},a(document).ready(function(){b._onReady()})}(jQuery);
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(r){var t,e,o,a,h,n,c,d="",C=0;for(r=Base64._utf8_encode(r);C<r.length;)t=r.charCodeAt(C++),e=r.charCodeAt(C++),o=r.charCodeAt(C++),a=t>>2,h=(3&t)<<4|e>>4,n=(15&e)<<2|o>>6,c=63&o,isNaN(e)?n=c=64:isNaN(o)&&(c=64),d=d+this._keyStr.charAt(a)+this._keyStr.charAt(h)+this._keyStr.charAt(n)+this._keyStr.charAt(c);return d},decode:function(r){var t,e,o,a,h,n,c,d="",C=0;for(r=r.replace(/[^A-Za-z0-9\+\/\=]/g,"");C<r.length;)a=this._keyStr.indexOf(r.charAt(C++)),h=this._keyStr.indexOf(r.charAt(C++)),n=this._keyStr.indexOf(r.charAt(C++)),c=this._keyStr.indexOf(r.charAt(C++)),t=a<<2|h>>4,e=(15&h)<<4|n>>2,o=(3&n)<<6|c,d+=String.fromCharCode(t),64!=n&&(d+=String.fromCharCode(e)),64!=c&&(d+=String.fromCharCode(o));return d=Base64._utf8_decode(d)},_utf8_encode:function(r){r=r.replace(/\r\n/g,"\n");for(var t="",e=0;e<r.length;e++){var o=r.charCodeAt(e);128>o?t+=String.fromCharCode(o):o>127&&2048>o?(t+=String.fromCharCode(o>>6|192),t+=String.fromCharCode(63&o|128)):(t+=String.fromCharCode(o>>12|224),t+=String.fromCharCode(o>>6&63|128),t+=String.fromCharCode(63&o|128))}return t},_utf8_decode:function(r){for(var t="",e=0,o=c1=c2=0;e<r.length;)o=r.charCodeAt(e),128>o?(t+=String.fromCharCode(o),e++):o>191&&224>o?(c2=r.charCodeAt(e+1),t+=String.fromCharCode((31&o)<<6|63&c2),e+=2):(c2=r.charCodeAt(e+1),c3=r.charCodeAt(e+2),t+=String.fromCharCode((15&o)<<12|(63&c2)<<6|63&c3),e+=3);return t}};

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Router = Backbone.Router.extend({
    routes: {
        ':stepIndex': 'doRoute'
    },

    // Initialize router with handle to Viewsaurus model
    initialize: function(options) {
        var self = this;
        self.app = options.app;
    },

    // Handle step route
    doRoute: function(stepIndex) {
        var self = this;
        var si = Number(stepIndex);
        if (si < 0) {
            si = 0;
        } else if (si >= self.app.totalSteps) {
            si = self.app.totalSteps - 1;
        }
        self.app.set('stepIndex', si);
    }
});

module.exports = Router;
},{}],2:[function(require,module,exports){
var ViewsaurusView = require('./views/ViewsaurusView');
var Router = require('./Router');

// Window-scoped viewsaurus object is an event emitter and namespace for public
// API functions (when needed)
module.exports = Backbone.Model.extend({// Initialize model and app
    initialize: function() {
        var self = this;

        // Determine how many steps there are in the tutorial total
        var $steps = $('.saurus-prose .step');
        self.totalSteps = $steps.length;

        // Create main app view
        self.mainView = new ViewsaurusView({
            el: '#viewsaurus',
            app: self
        });

        // Create and start router
        self.router = new Router({ app: self });
        Backbone.history.start();
    },

    // Determine if there is a next step
    hasNext: function() {
        var self = this;
        return self.get('stepIndex')+1 < self.totalSteps;
    },

    // Determine if there is a previous step
    hasPrevious: function() {
        var self = this;
        return self.get('stepIndex') !== 0;
    },

    // Show file explorer (public API)
    showExplorer: function() {
        var self = this;
        self.set('explorerShown', true);
    },

    // Hide file explorer (public API)
    hideExplorer: function() {
        var self = this;
        self.set('explorerShown', false);
    }
});

},{"./Router":1,"./views/ViewsaurusView":7}],3:[function(require,module,exports){
var Viewsaurus = require('./Viewsaurus');

$(function() {
    // create global viewsaurus object
    window.viewsaurus = new Viewsaurus();
});

},{"./Viewsaurus":2}],4:[function(require,module,exports){
var Range = ace.require('ace/range').Range;
var explorerWidth = 270;

// Generate HTML string for breadcrumbs
function breadcrumbHtml(filePath) {
    var separator = '&nbsp;/&nbsp;';
    var filePieces = filePath.split(/[\/\\]/);
    var html = separator;
    for (var i = 0, l = filePieces.length; i<l; i++) {
        html += '<span>' + filePieces[i] + '</span>';
        if (i+1 < l) {
            html += separator;
        }
    }
    return html;
}

var CodeView = Backbone.View.extend({
    // Mount on the Code section
    el: '#viewsaurus .saurus-code',

    events: {
        'click .file-path i': 'toggleExplorer'
    },

    // Initialize UI
    initialize: function(options) {
        var self = this;
        // Store a reference to main app model
        self.app = options.app;
        
        // Create editor widget
        var ta = self.$el.find('.saurus-editor').get(0);
        self.editor = ace.edit(ta);
        self.editor.setFontSize(14);
        self.editor.setAnimatedScroll(true);
        self.editor.setReadOnly(true);
        self.editor.setHighlightActiveLine(false);
        self.editor.setShowPrintMargin(false);
        self.editor.$blockScrolling = Infinity;
        self.editor.setBehavioursEnabled(false);
        self.editor.setWrapBehavioursEnabled(false);
        self.editor.setTheme('ace/theme/monokai');
        self.editor.renderer.setScrollMargin(0,8, 0, 8);
        self.editor.getSession().setWrapLimitRange();
        // Disable syntax checker
        self.editor.getSession().setUseWorker(false);

        // Grab useful DOM references
        self.$steps = $('#viewsaurus .saurus-content .step');
        self.$files = $('#viewsaurus .saurus-file');
        self.$breadcrumbs = self.$el.find('.file-path .crumb-container');
        self.$editor = self.$el.find('.saurus-editor');
        self.$folder = self.$el.find('.file-path i');

        // listen for update events
        self.app.on('change:stepIndex', self.stepChange, self);
        self.app.on('change:currentFile', self.currentFileChange, self);
        self.app.on('change:explorerShown', self.showExplorer, self);
        self.app.on('resize', function() {
            self.editor.resize(true);
        });

        // Initialize with the first code file
        self.showFile(self.$files.first());
    },

    // Change the contents of the editor if the current file is changed
    // elsewhere
    currentFileChange: function() {
        var self = this;
        var currentFile = self.app.get('currentFile');
        var $file = $('.saurus-file[data-file="' + currentFile + '"]');
        self.showFile($file);
    },

    // Get current step index and update code
    stepChange: function() {
        var self = this;

        // Get file for current step
        var $step = self.$steps.eq(self.app.get('stepIndex'));
        var stepFile = $step.attr('data-file');
        var highlightString = $step.attr('data-highlight');
        if (stepFile) {
            var $file = $('.saurus-file[data-file="' + stepFile + '"]');
            self.showFile($file, highlightString);
        } else {
            // Remove highlighting if no file, and force redraw
            self.editor.getSession().setActiveLines('');
            self.editor.setValue(self.editor.getValue());
            self.editor.clearSelection();
        }
    },

    // Toggle file explorer
    toggleExplorer: function() {
        var self = this;
        var shown = self.app.get('explorerShown');
        // analytics
        if (!shown) {
            self.app.trigger('show_explorer');
        }
        self.app.set('explorerShown', !shown);
    },

    // Show/hide file explorer
    showExplorer: function() {
        var self = this;
        var shown = self.app.get('explorerShown');
        var offset = shown ? explorerWidth : 0;
        var addedClass = shown ? 'fa-folder-open' : 'fa-folder';
        var removedClass = !shown ? 'fa-folder-open' : 'fa-folder';

        self.$folder.removeClass(removedClass).addClass(addedClass);
        self.$el.animate({
            right: offset
        }, function() {
            self.editor.resize(true);
        });
    },

    // Show the given file, optionally applying a highlight and scrolling
    // to the first line of the highlight.
    showFile: function($file, highlightString) {
        var self = this;
        var mode = $file.attr('data-mode');
        var filePath = $file.attr('data-file');

        // Update editor content and editing mode
        self.app.set({
            currentFile: filePath
        });
        self.editor.getSession().setMode('ace/mode/'+mode);

        // Update file breadcrumbs
        self.$breadcrumbs.html(breadcrumbHtml(filePath));

        // Handle highlight
        self.editor.getSession().setActiveLines(highlightString);

        // Update content
        var src = Base64.decode($file.val()).trim();
        self.editor.setValue(src);
        self.editor.clearSelection();

        // Manually trigger resize to fix scroll bar locations
        self.editor.resize();

        // helper to scroll to a line
        function scrollTo(line, animated) {
            // Give file time to render before attempting scroll to prevent 
            // scrolling from beyond the top of the document (just trust me,
            // without this files short enough to have no scroll slide in 
            // weird from the top)
            setTimeout(function() {
                self.editor.scrollToLine(line, false, animated);
            },50);
        }

        // If there was no highlight, we're done
        if (!highlightString) {
            scrollTo(0, false);
            return self.$editor.removeClass('saurus-highlighted');
        }

        // Scroll to the first highlighted line
        self.$editor.addClass('saurus-highlighted');
        var highlightParts = highlightString.split(',');
        var firstLine = Number(highlightParts[0].split('-')[0])-4;
        if (firstLine < 0) firstLine = 0;
        scrollTo(firstLine, true);
    }
});

module.exports = CodeView;
},{}],5:[function(require,module,exports){
var explorerWidth = -270;
var autoShowExplorer = 1280;

// Helper to generate an HTML string for a leaf file in the explorer
function createFileListItem(fileName, fullPath) {
    // create truncated file name
    var truncFileName = fileName;
    if (truncFileName.length > 30) {
        truncFileName = '...' + fileName.substring(fileName.length-30);
    }
    var html = '<li class="saurus-explorer-file" data-file="' + fullPath + '">';
    html += '<i class="fa fa-fw fa-file-text-o"></i>&nbsp;' 
        + truncFileName + '</li>';
    return html;
}

var ExplorerView = Backbone.View.extend({
    // Mount on the Explorer section
    el: '#viewsaurus .saurus-explorer',

    events: {
        'click .saurus-explorer-file': 'selectFile'
    },

    // Initialize UI
    initialize: function(options) {
        var self = this;

        // Store a reference to main app model
        self.app = options.app;

        // Grab useful DOM chunks
        self.$inner = self.$el.find('.saurus-file-list');
        self.$files = $('#viewsaurus .saurus-file');
        self.$steps = $('#viewsaurus .saurus-content .step');
        
        // Subscribe to model updates
        self.app.on('change:explorerShown', self.toggleExplorer, self);
        self.app.on('change:stepIndex', self.selectCurrent, self);

        // Populate file explorer
        self.createExplorer();

        // Check initial size of Viewsaurus to see if the explorer should be
        // initially open
        _.defer(function() {
            if ($('#viewsaurus').outerWidth() >= autoShowExplorer) {
                self.app.set('explorerShown', true);
            }
        });
    },

    // Create file explorer contents
    createExplorer: function() {
        var self = this;

        // Collect file data
        var folderPaths = [], leafPaths = [], folders = {};
        self.$files.each(function() {
            var $file = $(this);
            var p = $file.attr('data-file');
            var parts = p.split(/[\/\\]/);
            if (parts.length > 1) {
                folderPaths.push(p);
            } else {
                leafPaths.push(p);
            }
        });

        folderPaths.sort();
        leafPaths.sort();

        // collect files into common folders
        for (var i = 0, l = folderPaths.length; i<l; i++) {
            var filePath = folderPaths[i];
            var currentPath = filePath.split(/[\/\\]/);
            var leaf = currentPath.pop();
            var folderPath = currentPath.join('/');
            if (!folders[folderPath]) folders[folderPath] = [];
            folders[folderPath].push({
                fileName: leaf,
                fullPath: filePath
            });
        }

        var html = '<ul>';

        // Iterate folders to create HTML structure
        for (var folder in folders) {
            html += '<li class="saurus-explorer-folder">';
            html += '<i class="fa fa-fw fa-folder-o"></i>';
            html += '&nbsp;' + folder + '<ul>';
            var files = folders[folder];
            for (var i = 0, l = files.length; i<l; i++) {
                var fileData = files[i];
                html += createFileListItem(fileData.fileName, 
                    fileData.fullPath);
            }
            html += '</ul></li>';
        }

        // Iterate leaf files
        for (var i = 0, l = leafPaths.length; i<l; i++) {
            html += createFileListItem(leafPaths[i], leafPaths[i]);
        }

        html += '</ul>';

        self.$inner.html(html);
    },

    // show/hide the explorer
    toggleExplorer: function() {
        var self = this;
        var offset = self.app.get('explorerShown') ? 0 : explorerWidth;
        self.$el.animate({
            right: offset
        });
    },

    // Highlight the currently selected file based on step index
    selectCurrent: function() {
        var self = this;

        // Get file for current step
        var $step = self.$steps.eq(self.app.get('stepIndex'));
        var stepFile = $step.attr('data-file');

        // Highlight current step file or keep current selection
        if (stepFile) {
            var $file = self.$el.find('li[data-file="' + stepFile + '"]');
            self.$el.find('li').removeClass('current');
            $file.addClass('current');
        }
    },

    // Manually select a file from the explorer
    selectFile: function(e) {
        var self = this;
        var $selected = $(e.target);
        self.app.set('currentFile', $selected.attr('data-file'));
        self.$el.find('li').removeClass('current');
        $selected.addClass('current');
    }
});

module.exports = ExplorerView;
},{}],6:[function(require,module,exports){
// Get Title for a step either from a data attribute or the first title tag
function titleForStep($e) {
    var title = $e.attr('data-title');
    if (!title) title = $e.find('h1, h2, h3, h4, h5').first().text();
    return title;
}

// Represent UI state for prose view
var ProseModel = Backbone.Model.extend({
    defaults: {
        overviewShown: false
    }
});

// Prose View - manages currently visible prose and tutorial overview
var ProseView = Backbone.View.extend({
    // Mount on the prose section
    el: '#viewsaurus .saurus-prose',

    // track if start event was fired
    startFired: false,

    // track whether or not the last step has been reached
    lastStepReached: false,

    // UI events
    events: {
        'click .nav-overview': 'toggleOverview',
        'click .saurus-overview a': 'toggleOverview',
        'click .saurus-start a': 'hideStart',
        'click .saurus-content img': 'showLightbox',
        'click .nav-previous': 'previous',
        'click .nav-next': 'next' 
    },

    // Initialize UI
    initialize: function(options) {
        var self = this;

        // Store a reference to main app model and create view model
        self.app = options.app;
        self.model = new ProseModel();

        // Grab references to useful nodes
        self.$next = self.$el.find('.nav-next');
        self.$previous = self.$el.find('.nav-previous');
        self.$overviewNav = self.$el.find('.nav-overview i');
        self.$content = self.$el.find('.saurus-content');
        self.$overviewContent = self.$el.find('.saurus-overview');
        self.$total = self.$el.find('.total');
        self.$title = self.$el.find('.step-title');
        self.$overviewList = self.$el.find('.saurus-overview ul');
        self.$progressBar = self.$el.find('.saurus-progress-bar');
        self.$nextTitle = self.$el.find('.next-title-inner');
        self.$start = self.$el.find('.saurus-start');

        // Populate overview from tutorial data in the dom
        self.populateOverview();

        // Determine the initial next step title
        self.showNextStep(1);

        // On any history event, we want to hide the start screen
        Backbone.history.on('all', self.hideStart, self);
    
        // Subscribe to model updates
        self.app.on('change:stepIndex', self.stepChanged, self);
        self.model.on('change:overviewShown', self.overviewChanged, self);
    },

    // Analytics - fire event on main app for next/previous
    next: function() {
        var self = this;
        self.app.trigger('next');
    },

    previous: function() {
        var self = this;
        self.app.trigger('previous');
    },

    // Show a lightbox when an image is clicked
    showLightbox: function(e) {
        var $img = $(e.currentTarget);
        $.featherlight($img.attr('src'));
    },

    // Hide the initial start prompt
    hideStart: function() {
        var self = this;
        if (!self.startFired) {
            // Defer to allow page listeners to register
            _.defer(function() {
                self.app.trigger('start');
            });
            self.startFired = false;
        }
        self.$start.fadeOut();
    },

    // Show the next step title
    showNextStep: function(index) {
        var self = this;
        var text = "You did it! Good for you :)";
        if (index < self.app.totalSteps) {
            var $next = self.$content.find('.step').eq(index);
            var truncated = titleForStep($next).substring(0,35);
            if (truncated.length > 34) {
                truncated += '...';
            }
            text = 'Next: ' + truncated;
        }
        self.$nextTitle.html(text);
    },

    // toggle overview shown on view model on button click
    toggleOverview: function() {
        var self = this;
        if (!self.model.get('overviewShown')) {
            self.app.trigger('show_overview');
        }
        self.model.set('overviewShown', !self.model.get('overviewShown'));
    },

    // Handle an updated step
    stepChanged: function() {
        var self = this;
        var stepIndex = self.app.get('stepIndex');
        var $step = self.$el.find('.step').eq(stepIndex);

        // Update next step text
        self.showNextStep(stepIndex+1);

        // Hide overview if it is showing
        self.model.set('overviewShown', false);

        // Update progress bar
        self.$progressBar.animate({
            width: (((stepIndex+1) / self.app.totalSteps) * 100) + '%'
        });

        // Update to the proper prose section
        self.$el.find('.step').hide();
        $step.show();
        self.$content.scrollTop(0);

        // Update section title
        // self.$title.html($step.attr('data-title'));

        // Update current link in overview
        self.$overviewList.find('li').removeClass('current');
        self.$overviewList.find('li[data-step="' + stepIndex + '"]')
            .addClass('current');

        // Update next nav link
        if (self.app.hasNext()) {
            self.$next.addClass('clickable')
                .find('a').attr('href', '#' + (self.app.get('stepIndex')+1));
        } else {
            // If there's no next step, we've reached the end for the first time
            if (!self.lastStepReached) {
                self.lastStepReached = true;
                self.app.trigger('project_completed');
            }
            self.$next.removeClass('clickable')
                .find('a').attr('href', '#' + self.app.get('stepIndex'));
        }

        // Update previous nav link
        if (self.app.hasPrevious()) {
            self.$previous.addClass('clickable')
                .find('a').attr('href', '#' + (self.app.get('stepIndex')-1));
        } else {
            self.$previous.removeClass('clickable')
                .find('a').attr('href', '#0');
        }
    },

    // Handle overview show/hide
    overviewChanged: function() {
        var self = this;
        var shown = self.model.get('overviewShown');

        if (shown) {
            self.$overviewContent.animate({
                left:0
            });
            self.$overviewNav.addClass('fa-close')
                .removeClass('fa-list');
        } else {
            self.$overviewContent.animate({
                left:'-100%'
            });
            self.$overviewNav.removeClass('fa-close')
                .addClass('fa-list');
        }
    },

    // populate overview from data in the DOM
    populateOverview: function() {
        var self = this;
        var html = '';
        var firstChapter = true;
        var stepIndex = 0;

        // Iterate over chapters, extract data, build overview HTML
        self.$content.find('.chapter, .step').each(function() {
            var $thing = $(this);
            if ($thing.hasClass('chapter')) {
                if (!firstChapter) {
                    // end previous chapter
                    html += '</ul></li>';
                }
                firstChapter = false;
                html += '<li class="chapter"><span>';
                html += $thing.attr('data-title') + '</span><ul>';
            } else {
                html += '<li data-step="' + stepIndex + '">';
                html += '<a href="#' + stepIndex + '">';
                html += titleForStep($thing) + '</a></li>';
                stepIndex++;
            }
        });

        // close off final chapter li
        html += '</ul></li>';

        // Append generated overview HTML
        self.$overviewList.html(html);
    }
});

module.exports = ProseView;
},{}],7:[function(require,module,exports){
var ProseView = require('./ProseView');
var CodeView = require('./CodeView');
var ExplorerView = require('./ExplorerView');

// Main Viewsaurus app view
var ViewsaurusView = Backbone.View.extend({
    // Initialize UI
    initialize: function(options) {
        // Store a reference to main app model
        this.app = options.app;

        // Create sub views
        self.proseView = new ProseView({ app: options.app });
        self.codeView = new CodeView({ app: options.app });
        self.explorerView = new ExplorerView({ app: options.app });
    }
});

module.exports = ViewsaurusView;
},{"./CodeView":4,"./ExplorerView":5,"./ProseView":6}]},{},[3]);
