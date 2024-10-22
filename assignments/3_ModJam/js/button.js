/**
 * Class for the game's buttons
 */
class Button {
    /**
     * Object property for the colour inside the button
     */
    fill = {
        r: 255,
        g: 255,
        b: 255,
        a: 255
    };

    /**
     * Object property for everything related to the button's outside stroke
     */
    stroke = {
        weight: 7.5,
        r: 77,
        g: 130,
        b: 47,
        a: 255
    };

    /**
     * Constructor
     * @param {Number} x center x coordinate
     * @param {Number} y center y coordinate
     * @param {Number} w width of the button
     * @param {Number} h height of the button
     * @param {Number} txtSize size of the button's text
     * @param {String} txtLabel button's text
     */
    constructor(x, y, w, h, txtSize, txtLabel) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.txt = {
            size: txtSize,
            weight: 2.5,
            label: txtLabel
        };
    }

    /**
     * Draws the button on the canvas
     */
    display() {
        let isHover = isRectPointOverlap(this.x, this.y, this.w, this.h, mouseX, mouseY);
        // Change button opacity to indicate whether the mouse is currently hovering it or not
        if (isHover) {
            this.stroke.a = 255;
            this.fill.a = 255;
        }
        else {
            this.stroke.a = 175;
            this.fill.a = 175;
        }

        push();
        stroke(0, 0, 0, this.fill.a);
        strokeWeight(this.stroke.weight);
        fill(this.fill.r, this.fill.g, this.fill.b, this.fill.a);
        rect(this.x, this.y, this.w + 7.5, this.h + 7.5);
        pop();

        push();
        stroke(this.stroke.r, this.stroke.g, this.stroke.b);
        strokeWeight(this.stroke.weight);
        noFill();
        rect(this.x, this.y, this.w, this.h);
        pop();

        push();
        textAlign(CENTER, CENTER);
        fill(this.stroke.r, this.stroke.g, this.stroke.b, this.stroke.a);
        stroke(0, 0, 0, this.stroke.a);
        strokeWeight(this.txt.weight);
        textSize(this.txt.size);
        text(this.txt.label, this.x, this.y);
        pop();
    }
}