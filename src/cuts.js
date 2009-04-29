
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
        
        // |0|1|2|
        // |3|4|5|
        // |6|7|8|
        this.array = new Array();
        this.array[0] = {x : 0, y : 0, w : this.leftWidth, h : this.topHeight};
        this.array[1] = {x : this.left, y : 0, w : this.centerWidth, h : this.topHeight};
        this.array[2] = {x : this.right, y : 0, w : this.rightWidth, h : this.topHeight};

        this.array[3] = {x : 0, y : this.top, w : this.leftWidth, h : this.centerHeight};
        this.array[4] = {x : this.left, y : this.top, w : this.centerWidth, h : this.centerHeight};
        this.array[5] = {x : this.right, y : this.top, w : this.rightWidth, h : this.centerHeight};

        this.array[6] = {x : 0, y : this.bottom, w : this.leftWidth, h : this.bottomHeight};
        this.array[7] = {x : this.left, y : this.bottom, w : this.centerWidth, h : this.bottomHeight};
        this.array[8] = {x : this.right, y : this.bottom, w : this.rightWidth, h : this.bottomHeight};
    },

    get : function(i) {
        return this.array[i];
    },
    
    _each : function(iterator) {
        for (var i = 0, length = this.array.length; i < length; i++)
            iterator(this.array[i]);
    }

});

Cuts.addMethods(Enumerable);

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
