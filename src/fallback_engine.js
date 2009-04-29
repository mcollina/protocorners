
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

        // Create the magical tiles
        this.drawBorder({
            top:'-'+borderTop,
            left:'-'+borderLeft,
            height: borderTop,
            width: borderLeft
        }, slices[0], element);
        this.drawBorder({
            top:'-'+borderTop,
            left: 0,
            width: '100%',
            height: borderTop
        }, slices[1], element);
        this.drawBorder({
            top:'-'+borderTop,
            right:'-'+borderRight,
            height: borderTop,
            width: borderRight
        }, slices[2], element);
        this.drawBorder({
            top: 0,
            bottom:0,
            left:'-'+borderLeft,
            width: borderLeft,
            height: '100%'
        }, slices[3], element);
        this.drawBorder({
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            height: '100%',
            width: '100%'
        }, slices[4], element);
        this.drawBorder({
            top: 0,
            bottom:0,
            right:'-'+borderRight,
            width: borderRight,
            height: '100%'
        }, slices[5], element);
        this.drawBorder({
            bottom:'-'+borderBottom,
            left:'-'+borderLeft,
            width: borderLeft,
            height: borderBottom
        }, slices[6], element);
        this.drawBorder({
            bottom:'-'+borderBottom,
            left: 0,
            width:'100%',
            height: borderBottom
        }, slices[7], element);
        this.drawBorder({
            bottom:'-'+borderBottom,
            right:'-'+borderRight,
            height: borderBottom,
            width: borderRight
        }, slices[8], element);

        return wrapper;
    },

    drawBorder : function (style, slice, wrapper) {
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

    
});

FallbackEngine.getSlicer = function() {
    if(CanvasSlicer.isSupported()) {
        return new CanvasSlicer();
    } else {
        throw "This browser doesn't support any slicer.";
    }
}

