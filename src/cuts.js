
var Cuts = Class.create({

    initialize : function() {
        // args order: width, height, top, right, bottom, left
        var args = $A(arguments);
        width = args.shift();
        height = args.shift();

        this.top = Cuts.parse(height, args.shift());
        this.right = (args.size() == 0) ? width - this.top : width - Cuts.parse(width, args.shift());
        this.bottom = (args.size() == 0) ? height - this.top : height - Cuts.parse(height, args.shift());
        this.left = (args.size() == 0) ? width - this.right : Cuts.parse(width, args.shift());
    }
});

Cuts.parse = function(base, value) {
    value = value.strip();
    if(value.endsWith("%")) {
        value = value.gsub("%",'');
        value = parseFloat(value);
        value = Math.floor(value / 100 * base);
    } else if(value.endsWith("px")) {
        value = value.gsub("px",'');
        value = parseInt(value);
    } else {
        value = parseInt(value);
    }
    return value;
}
