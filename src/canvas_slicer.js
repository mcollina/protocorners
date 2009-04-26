
var CanvasSlicer = Class.create({

    initialize: function() {
        var args = $A(arguments);
        this.resolution = args.shift();
        this.resolution = this.resolution == null ? 20 : this.resolution;
        this.canvas = document.createElement('canvas');
    },

    slice: function(image, sx, sy, sw, sh, resolution) {
        resolution = resolution == null ? this.resolution : resolution;

        var slice = document.createDocumentFragment();
        // Don't waste time drawing slice with null dimension
        if(sw > 0 && sh > 0) {
            // Clear the global canvas and use it to draw a new slice
            this.canvas.setAttribute('width', resolution+'px');
            this.canvas.getContext('2d').drawImage(image, sx, sy, sw, sh, 0, 0, resolution, resolution);
            // Store the slice in an image in order to reuse it
            var el = new Element('img', { src : this.canvas.toDataURL()});
//            el.style.width = el.style.height = '100%';
//            el.style.position = 'absolute';
//            el.style.border = 'none';
//            el.className = 'biSlice image';
            slice.appendChild(el);
        }
        return slice;
    }
    
});
