
var CanvasSlicer = Class.create({

    initialize: function() {
        var args = $A(arguments);
        this.canvas = document.createElement('canvas');
    },

    slice: function(image, sx, sy, sw, sh) {

        // Don't waste time drawing slice with null dimension
        if(sw > 0 && sh > 0) {
            // Clear the global canvas and use it to draw a new slice
            this.canvas.setAttribute('width', sw+'px');
            this.canvas.setAttribute('height', sh+'px');
            this.canvas.getContext('2d').drawImage(image, sx, sy, sw, sh, 0, 0, sw, sh);
            // Store the slice in an image in order to reuse it
            var el = new Element('img', { src : this.canvas.toDataURL()});
            //el.className = 'biSlice image';
            return el;
        } else {
            return document.createDocumentFragment();
        }

        //alert("sx: " + sx + ", sy: " + sy + ", sw: " + sw + ", sh: " + sh );
    }
    
});

CanvasSlicer.isSupported = function() {
    return document.createElement('canvas').getContext != null;
}
