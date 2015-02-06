var Module = function() {
    this._view = Ti.UI.createView({
        bubbleParent : false,
        touchEnabled : false,
    }), this.segmentlänge = 0, this.index = 0, this.images = [];
    return this;
};

Module.prototype = {
    /* parameters is array of images and the anchorPoint*/
    createView : function(args) {
        var views = [],
            that = this;
        args.images && args.images.forEach(function(image, i) {
            that._view.add(Ti.UI.createImageView({
                image : image,
                touchEnabled : false,
                width : args.width || 200,
                height : args.width || 200,
                transform : Ti.UI.create2DMatrix({
                    rotate : 360 / args.images.length * i,
                    anchorPoint : args.anchorPoint
                })
            }));
        });
        if (args.images) {
            this.images = args.images;
            this.segmentlänge = 360 / args.images.length;
        }
        this.anchorpoint = args.anchorPoint;
        return this._view;
    },
    /* rotate one step to left or right */
    rotateStep : function(direction) {
        this.index = (direction == 'left') ? (this.index - 1) : (this.index + 1);
        var that = this;
        // rotate all children: */
        this._view.children.forEach(function(child, i) {
            child.animate({
                duration : 100 + Math.random() * 70, // alive!
                transform : Ti.UI.create2DMatrix({
                    rotate : (that.index + i) * that.segmentlänge,
                    anchorPoint : that.anchorpoint
                })
            });
        });
        var index = (this.images.length - this.index) % this.images.length;
        return (index >= 0) ? index : index + this.images.length;
    },
    /* jump to one segmentlänge*/
    go2Segment : function(index) {
        this.index = (this.images.length - index + this.images.length) % this.images.length;
        var that = this;
        this._view.children.forEach(function(child, i) {
            child.animate({
                duration : 100 + Math.random() * 500,
                transform : Ti.UI.create2DMatrix({
                    rotate : (that.index + i) * that.segmentlänge + 360,
                    anchorPoint : that.anchorpoint
                })
            });
        });
    }
};

module.exports = Module;
