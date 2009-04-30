
var ProtoCorners = {

    isSupported : function() {
        if(FallbackEngine.isSupported()) {
            this.engine = FallbackEngine;
            return true;
        }
        return false;
    },

    borderImage : function() {
        var args = $A(arguments);
        var element = args.shift();
        var image = args.shift();
        var cuts = new Cuts(image.getHeight(), image.getWidth(), args[0], args[1], args[2], args[3]);
        ProtoCorners.engine.addBorderImage(element, image, cuts);
        return element;
    }
}

Element.addMethods({ borderImage : ProtoCorners.borderImage});