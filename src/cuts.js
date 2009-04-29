
var Cuts = Class.create({

    initialize : function() {
        // args order: this.width, this.height, top, right, bottom, left
        var args = $A(arguments);
        this.width = args.shift();
        this.height = args.shift();

        this.top = this.topHeight = Cuts.parse(this.height, args.shift());
        this.rightWidth = (args.size() == 0) ? this.top : Cuts.parse(this.width, args.shift());
        this.right = this.width - this.rightWidth;
        this.bottomHeight = (args.size() == 0) ? this.topHeight : Cuts.parse(this.height, args.shift());
        this.bottom = this.height - this.bottomHeight;
        this.left = this.leftWidth = (args.size() == 0) ? this.rightWidth : Cuts.parse(this.width, args.shift());
        
        this.centerHeight = this.bottom - this.top;
        this.centerWidth = this.right - this.left;
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
