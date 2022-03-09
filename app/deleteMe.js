
/*
    Docs
        Positions
            https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Positions
        Basics
            https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Basic_Shapes
        Paths
            https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths
        Bezier curves
            https://en.wikipedia.org/wiki/B%C3%A9zier_curve
        Fills and strokes
            https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Fills_and_Strokes

    Excercises
        1. Take a look a the docs
        2. Draw some basic shapes
        3. Play with "viewbox"
        4. Draw line paths
            - use path element
            - try to create it with createElementNS and setAttributeNS
        5. Draw bezier paths
        6. Draw smiley face
        7. Create SVG painter class
            a. Listen on svg wrapper click events
            b. Draw circle at the position of each click
            c. Draw svg path where user clicked
            d. Create new path with ctrl/cmd + left mouse button
            e. Clear svg with shift + left mouse button
*/

class SvgPaint {
    constructor(target) {
        this.svg = document.querySelector(target);
        this.svgNs = "http://www.w3.org/2000/svg";

        this.svg.addEventListener("click", e => this.clickHandler(e));
    }

    clickHandler(e) {
        const x = e.offsetX;
        const y = e.offsetY;

        if (e.ctrlKey || e.metaKey) {
            this.createPath();
            this.draw(x, y);
        } else if (e.shiftKey) {
            this.clear();
        } else {
            if (!this.path) {
                this.createPath();
            }
            this.draw(x, y);
        }
    }

    draw(x, y) {
        let d = this.path.getAttributeNS(null, "d");
        if (!d) {
            d = `M ${x} ${y}`;
        } else {
            d += ` L ${x} ${y}`;
        }

        console.log("");
        console.log("d", d);

        this.path.setAttributeNS(null, "d", d);
        this.drawCircle(x, y);
    }

    clear() {
        this.svg.innerHTML = "";
        this.path = null;
    }

    drawCircle(x, y) {
        const circle = document.createElementNS(this.svgNs, "circle");
        circle.setAttributeNS(null, "cx", x);
        circle.setAttributeNS(null, "cy", y);
        circle.setAttributeNS(null, "r", "2");
        circle.setAttributeNS(null, "fill", "red");
        this.svg.appendChild(circle);
    }

    createPath() {
        const path = document.createElementNS(this.svgNs, "path");
        path.setAttributeNS(null, "stroke", "black");
        path.setAttributeNS(null, "stroke-width", "6px");
        path.setAttributeNS(null, "stroke-linejoin", "round");
        path.setAttributeNS(null, "fill", "transparent");

        this.svg.appendChild(path);
        this.path = path;
    }
}

new SvgPaint("#svg1");

