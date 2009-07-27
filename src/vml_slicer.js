

var VMLSlicer = Class.create({
    initialize : function() {
        if(VMLSlicer.isSupported()) {
            if(!document.namespaces['biv']) {
                document.namespaces.add('biv', 'urn:schemas-microsoft-com:vml', "#default#VML");
                document.createStyleSheet().addRule('biv\\: *', "behavior: url(#default#VML); display:inline-block;");
            }
        } else {
            throw "VML slicing not supported on this browser.";
        }
    },
    
    slice: function(image, sx, sy, sw, sh) {
        // Don't waste time drawing slice with null dimension
        if(sw > 0 && sh > 0) {
            var imgWidth = image.getWidth();
            var imgHeight = image.getHeight();
            var el = new Element("biv:image");
            
            el.src = image.src;
            el.setAttribute("cropright", (imgWidth-sw-sx)/imgWidth);
            el.setAttribute("cropleft", sx / imgWidth);
            el.setAttribute("croptop", sy / imgHeight);
            el.setAttribute("cropbottom", (imgHeight-sh-sy)/imgHeight);
            el.setAttribute("coordsize", sw + "," + sh);

            return el;
        } else {
            return null;
        }

    }

});


VMLSlicer.isSupported = function() {
    return document.hasOwnProperty("namespaces");
}
