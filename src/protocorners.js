
var ProtoCorners = {

    isSupported : function() {
        if(NativeEngine.isSupported()) {
            this.engine = new NativeEngine();
            return true;
        } else if(FallbackEngine.isSupported()) {
            this.engine = new FallbackEngine();
            return true;
        }
        return false;
    },

    getEngine : function() {
        if(!ProtoCorners.engine && !ProtoCorners.isSupported()) {
            throw new Error("ProtoCorners not supported on this browser");
        }
        return ProtoCorners.engine;
    },

    borderImage : function() {
        var args = $A(arguments);
        var element = args.shift();
        var image = args.shift();
        var cuts = new Cuts(image.getHeight(), image.getWidth(), args[0], args[1], args[2], args[3]);
        ProtoCorners.getEngine().addBorderImage(element, image, cuts);
        return element;
    }
}

Element.addMethods({ borderImage : ProtoCorners.borderImage});