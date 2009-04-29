
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

        element.setStyle({
            position: 'relative',
            borderColor: 'transparent',
            padding: 0
        });

        // There is many case where "display: 'inline'" actually is a problem.
        if(element.style.display == 'inline')
            element.style.display = 'inline-block';
        // IE7 Should be served inline instead of inline-block
        //        else if((($.browser.msie && $.browser.version == 7)
        //            || (document.documentMode && document.documentMode == 7))
        //        && $this.css('display') == 'inline-block')
        //            thisStyle.display = 'inline';

        //Step 3: Draw Borders
        var borderTop = element.getStyle('borderTopWidth');
        var borderBottom = element.getStyle('borderBottomWidth');
        var borderLeft = element.getStyle('borderLeftWidth');
        var borderRight = element.getStyle('borderRightWidth');

        slices.each(function(slice, index) {
            this.drawBorder(this.buildBorderStyle(index, borderTop, borderRight, borderBottom, borderLeft), slice, element)
        }, FallbackEngine);

        return element;
    }

});

FallbackEngine.getSlicer = function() {
    if(CanvasSlicer.isSupported()) {
        return new CanvasSlicer();
    } else {
        throw "This browser doesn't support any slicer.";
    }
}

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

FallbackEngine.drawBorder = function (style, slice, wrapper) {
    // Don't waste time drawing borders with null dimension
    if(parseInt(style.width) != 0 && parseInt(style.height) != 0) {
        slice.style.width = slice.style.height = '100%';
        slice.style.position = 'absolute';
        slice.style.border = 'none';

        var el = document.createElement('div');
        style.position = 'absolute';
        style.textAlign = "left";
        el.setStyle(style);
        el.appendChild(slice.cloneNode(true));
        wrapper.insert({
            top : el
        });
    }
}