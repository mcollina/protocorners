

var VMLSlicer = Class.create({
    initialize : function() {
        if(VMLSlicer.isSupported()) {
            if(!document.namespaces['biv']) {
                document.namespaces.add('biv', 'urn:schemas-microsoft-com:vml', "#default#VML");
                document.createStyleSheet().addRule('biv\\: *', "behavior: url(#default#VML);");
            }
        } else {
            throw "VML slicing not supported on this browser.";
        }
    },
    
    slice: function(image, sx, sy, sw, sh) {
        // Don't waste time drawing slice with null dimension
        if(sw > 0 && sh > 0) {
            var el = document.createElement('div');
            el.insertAdjacentHTML('BeforeEnd',
                '<biv:image src="'+image[i].src+'" cropleft="'+sx/imgWidth+'" croptop="'+sy/imgHeight+'" cropright="'+(imgWidth-sw-sx)/imgWidth+'" cropbottom="'+(imgHeight-sh-sy)/imgHeight+'" />' );
            return el.firstChild;
        } else {
            return null;
        }

    }

});


VMLSlicer.isSupported = function() {
    return document.namespaces;
}