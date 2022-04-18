export default class CanvasHelper{

    /**
     * Draw rectangle with a checkmark on the canvas.
     *
     * @param canvas
     */
    static drawImageAdded(canvas){
        const ctx = canvas.getContext("2d");
        ctx.strokeStyle = "#DFB1BB";

        ctx.beginPath();
        ctx.moveTo(0,13);
        ctx.lineTo(11,25);

        ctx.moveTo(11,25);
        ctx.lineTo(25,0);
        ctx.stroke();
    }

    /**
     * Draws image with cross on the canvas.
     *
     * @param canvas
     */
    static drawNoImage(canvas){
        const ctx = canvas.getContext("2d");
        ctx.strokeStyle = "#DFB1BB";

        ctx.beginPath();
        ctx.moveTo(25,25);
        ctx.lineTo(0,0);
        ctx.moveTo(0,25);
        ctx.lineTo(25,0);
        ctx.stroke();
    }
}