
var ProtoCorners = {

    isSupported : function() {
        factory = ProtoCorners.engines.find(function(factory) {
            return factory.isSupported();
        });

        if(factory != null) {
            ProtoCorners.engine = new factory();
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
    },

    engines : $A([]),

    registerEngines : function() {
        ProtoCorners.engines = ProtoCorners.engines.concat($A(arguments));
        return ProtoCorners;
    }
}

Element.addMethods({ borderImage : ProtoCorners.borderImage});