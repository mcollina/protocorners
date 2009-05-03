
var FallbackEngine = Class.create({
    initialize : function() {
        this.slicer = FallbackEngine.getSlicer();
    },

    addBorderImage : function(element, image, cuts) {
        element = $(element);

        //Step 1: Create Slices
        
        // |0|1|2|
        // |3|4|5|
        // |6|7|8|
        var slicer = this.slicer;
        var slices = cuts.map(function(cut) {
            return slicer.slice(image,cut.x, cut.y, cut.w, cut.h);
        });

        //Step 2: Create Wrapper

        var wrapper = new Element('div');
        wrapper.setStyle({
            paddingTop : element.getStyle('paddingTop'),
            paddingLeft : element.getStyle('paddingLeft'),
            paddingBottom : element.getStyle('paddingBottom'),
            paddingRight : element.getStyle('paddingRight'),

            position : 'relative'
        });

        wrapper.innerHTML = element.innerHTML;
        element.innerHTML = '';
        
        element.appendChild(wrapper);

        var display = element.getStyle("display");

        // There is many case where "display: 'inline'" actually is a problem.
        if(display == 'inline')
            display = 'inline-block';
        
        // IE7 Should be served inline instead of inline-block
        if(document.documentMode && document.documentMode == 7 && display == 'inline-block') {
            display = 'inline';
        }
        
        element.setStyle({
            position: 'relative',
            borderColor: 'transparent',
            display : display,
            padding: 0
        });

        //Step 3: Draw Borders
        var borderTop = element.getStyle('borderTopWidth');
        var borderBottom = element.getStyle('borderBottomWidth');
        var borderLeft = element.getStyle('borderLeftWidth');
        var borderRight = element.getStyle('borderRightWidth');

        slices.each(function(slice, index) {
            this.drawBorder(this.buildBorderStyle(index, borderTop, borderRight, borderBottom, borderLeft), slice, element)
        }, FallbackEngine);

        // stupid trick to fix an IE bug.
        element.outerHTML = element.outerHTML;

        return element;
    }

});

FallbackEngine.getSlicer = function() {
    if(CanvasSlicer.isSupported()) {
        return new CanvasSlicer();
    } else if(VMLSlicer.isSupported()) {
        return new VMLSlicer();
    } else {
        throw new Error("This browser doesn't support any slicer.");
    }
}

FallbackEngine.isSupported = function() {
    return CanvasSlicer.isSupported() || VMLSlicer.isSupported();
};

FallbackEngine.buildBorderStyle = function(sliceNumber, borderTop, borderRight, borderBottom, borderLeft) {
    var style = {};

    if([0,3,6].include(sliceNumber)) {          // first column
        style.left = "-" + borderLeft;
        style.width = borderLeft;
    } else if([2,5,8].include(sliceNumber)) {   // third column
        style.right = "-" + borderRight;
        style.width = borderRight;
    } else {                                    // second column
        style.width = "100%";
    }
    
    if([0,1,2].include(sliceNumber)) {          // first line
        style.top = "-" + borderTop;
        style.height = borderTop;
    } else if([6,7,8].include(sliceNumber)) {   // third line
        style.bottom = "-" + borderBottom;
        style.height = borderBottom;
    } else {                                    // second line
        style.height = "100%";
    }

    return style;
}

FallbackEngine.drawBorder = function (style, slice, slice_container) {
    // Don't waste time drawing borders with null dimension
    if(slice != null && parseInt(style.width) != 0 && parseInt(style.height) != 0) {
        slice.setStyle({
            width : '100%',
            height : '100%',
            position : 'absolute',
            border : 'none'
        });

        var el = new Element("div");
        style.position = 'absolute';
        style.textAlign = "left";
        el.setStyle(style);

        el.insert(slice);
        //here internet explorer does something bad.
        slice_container.insert({
            top : el
        });
    }
}