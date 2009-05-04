
var BorderImageStyler = Class.create({
    initialize : function(property, supported) {
        this.property = property;
        this.isSupported = supported;
    },

    setStyle : function(element, value) {
        element.setStyle("backgroundColor", "transparent");
        //hack to fix strange things happening with prototype and Firefox 3.5.
        element.style[this.property] = value;
    }
});

var moz_styler = new BorderImageStyler("MozBorderImage", function() {
    if(!document.defaultView) {
        return false;
    } else if(!document.defaultView.getComputedStyle) {
        return false;
    }
    
    var s = document.defaultView.getComputedStyle(document.body, '');
    return s.getPropertyValue('-moz-border-image') !== '';
});

var webkit_styler = new BorderImageStyler("-webkit-border-image", function() {
    return typeof(document.body.style['-webkitBorderImage']) == 'string';
});

var NativeEngine = Class.create({
   initialize : function() {
       if(moz_styler.isSupported()) {
           this.styler = moz_styler;
       } else if(webkit_styler.isSupported()) {
           this.styler = webkit_styler;
       } else {
           throw new Error("NativeEngine not supported on this browser");
       }
   },

   addBorderImage : function(element, image, cuts) {
        var value = "url(\""+ image.src + "\")";
        [cuts.topHeight, cuts.rightWidth, cuts.bottomHeight, cuts.leftWidth].each(function(elem) {
            value += " " + elem;
        });
        this.styler.setStyle(element, value);
   }
});

NativeEngine.isSupported = function() {
   return moz_styler.isSupported() || webkit_styler.isSupported();
}
