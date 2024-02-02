class Draw {
    constructor() {
        this.canvas = document.getElementById("matriz");
        this.ctx = this.canvas.getContext("2d");
        this.heightCell = this.canvas.height / 65;
        this.widthCell = this.canvas.width / 85;
        this.positionDraw = [ 0, 0 ];
    }

    draw(matriz, playerPosition) {
        this.ctx.clearRect(this.positionDraw[0], this.positionDraw[1], this.widthCell, this.heightCell);

        this.ctx.beginPath();

        matriz.forEach((value, index) => {
            value.forEach((valueNumber, indexNumber) => {
                if(valueNumber == 0) {
                    this.ctx.fillStyle = "cyan";
                    this.ctx.fillRect(this.positionDraw[0], this.positionDraw[1], this.widthCell, this.heightCell);
                } else if(valueNumber == 1) {
                    this.ctx.fillStyle = "green";
                    this.ctx.fillRect(this.positionDraw[0], this.positionDraw[1], this.widthCell, this.heightCell);
                } else {
                    this.ctx.fillStyle = "yellow";
                    this.ctx.fillRect(this.positionDraw[0], this.positionDraw[1], this.widthCell, this.heightCell);
                }

                if(index == playerPosition[1] && indexNumber == playerPosition[0]) {
                    this.ctx.fillStyle = "red";
                    this.ctx.fillRect(this.positionDraw[0] + this.widthCell / 4, this.positionDraw[1] + this.heightCell / 4, this.widthCell / 2, this.heightCell / 2);
                }

                if(indexNumber == 84) {
                    this.positionDraw[1] += this.heightCell;
                    this.positionDraw[0] = 0;
                } else {
                    this.positionDraw[0] += this.widthCell;
                }
            });
        });

        this.ctx.closePath();
        this.positionDraw[0] = 0;
        this.positionDraw[1] = 0;
    }
}

export default Draw;