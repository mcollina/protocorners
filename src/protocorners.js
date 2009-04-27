
var ProtoCorners = {
    getSlicer : function() {
        if(CanvasSlicer.isSupported()) {
            return new CanvasSlicer();
        } else {
            throw "This browser doesn't support any slicer.";
        }
    }

}