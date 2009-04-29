
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
        var slice0 = this.slicer.slice(image, 0, 0, cuts.leftWidth, cuts.topHeight);
        var slice1 = this.slicer.slice(image, cuts.left, 0, cuts.centerWidth, cuts.topHeight);
        var slice2 = this.slicer.slice(image, cuts.right, 0, cuts.rightWidth, cuts.topHeight);

        var slice3 = this.slicer.slice(image, 0, cuts.top, cuts.leftWidth, cuts.centerHeight);
        var slice4 = this.slicer.slice(image, cuts.left, cuts.top, cuts.centerWidth, cuts.centerHeight);
        var slice5 = this.slicer.slice(image, cuts.right, cuts.top, cuts.rightWidth, cuts.centerHeight);

        var slice6 = this.slicer.slice(image, 0, cuts.bottom, cuts.leftWidth, cuts.bottomHeight);
        var slice7 = this.slicer.slice(image, cuts.left, cuts.bottom, cuts.centerWidth, cuts.bottomHeight);
        var slice8 = this.slicer.slice(image, cuts.right, cuts.bottom, cuts.rightWidth, cuts.bottomHeight);

        //Step 2: Create Wrapper

        var wrapper = new Element('div');
        wrapper.setStyle({
            paddingTop : element.getStyle('paddingTop'),
            paddingLeft : element.getStyle('paddingLeft'),
            paddingBottom : element.getStyle('paddingBottom'),
            paddingRight : element.getStyle('paddingRight'),
            //            borderTop : element.getStyle('borderTopWidth'),
            //            borderBottom : element.getStyle('borderBottomWidth'),
            //            borderLeft : element.getStyle('borderLeftWidth'),
            //            borderRight : element.getStyle('borderRigthWidth'),
            position : 'relative'
        });

        element.wrap(wrapper);

        element.setStyle({
            position: 'relative',
            borderColor: 'transparent',
            //border: 0,
            padding: 0
        });

        // TODO add particolar case handling

        //Step 3: Draw Borders
        var borderTop = element.getStyle('borderTopWidth');
        var borderBottom = element.getStyle('borderBottomWidth');
        var borderLeft = element.getStyle('borderLeftWidth');
        var borderRight = element.getStyle('borderRigthWidth');

        //        var borderTop = cuts.topHeight + "px";
        //        var borderBottom = cuts.bottomHeight+ "px";
        //        var borderLeft = cuts.leftWidth + "px";
        //        var borderRight = cuts.rightWidth+ "px";


        // Create the magical tiles
        this.drawBorder({
            top:'-'+borderTop,
            left:'-'+borderLeft,
            height: borderTop,
            width: borderLeft
        }, slice0, wrapper);
        this.drawBorder({
            top:'-'+borderTop,
            left: 0,
            width: '100%',
            height: borderTop
        }, slice1, wrapper);
        this.drawBorder({
            top:'-'+borderTop,
            right:'-'+borderRight,
            height: borderTop,
            width: borderRight
        }, slice2, wrapper);
        this.drawBorder({
            top: 0,
            bottom:0,
            left:'-'+borderLeft,
            width: borderLeft,
            height: '100%'
        }, slice3, wrapper);
        this.drawBorder({
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            height: '100%',
            width: '100%'
        }, slice4, wrapper);
        this.drawBorder({
            top: 0,
            bottom:0,
            right:'-'+borderRight,
            width: borderRight,
            height: '100%'
        }, slice5, wrapper);
        this.drawBorder({
            bottom:'-'+borderBottom,
            left:'-'+borderLeft,
            width: borderLeft,
            height: borderBottom
        }, slice6, wrapper);
        this.drawBorder({
            bottom:'-'+borderBottom,
            left: 0,
            width:'100%',
            height: borderBottom
        }, slice7, wrapper);
        this.drawBorder({
            bottom:'-'+borderBottom,
            right:'-'+borderRight,
            height: borderBottom,
            width: borderRight
        }, slice8, wrapper);

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

