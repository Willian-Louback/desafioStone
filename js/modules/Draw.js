class Draw {
    constructor() {
        this.canvas = document.getElementById("matriz");
        this.ctx = this.canvas.getContext("2d");
        this.heightCell = this.canvas.height / 65;
        this.widthCell = this.canvas.width / 85;
        this.positionDraw = [ 0, 0 ];
    }

    configCanvas() {
        const widthScreen = window.innerWidth;

        if(widthScreen < 480) {
            console.log("foi");
            this.canvas.width = 340;
            this.canvas.height = 260;

            this.heightCell = this.canvas.height / 65;
            this.widthCell = this.canvas.width / 85;
        } else if(widthScreen >= 480 && widthScreen <= 685) {
            this.canvas.width = 510;
            this.canvas.height = 390;

            this.heightCell = this.canvas.height / 65;
            this.widthCell = this.canvas.width / 85;
        }
    }

    async draw(matriz, individuals) {
        return new Promise(resolve => {
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

                    Object.values(individuals).forEach(individual => {
                        if(index == individual.position[1] && indexNumber == individual.position[0]) {
                            if(individual.status == "death") {
                                return;
                            }

                            if(valueNumber == 1) {
                                this.ctx.fillStyle = "black";
                            } else {
                                this.ctx.fillStyle = "red";
                            }
                            this.ctx.fillRect(this.positionDraw[0] + this.widthCell / 4, this.positionDraw[1] + this.heightCell / 4, this.widthCell / 2, this.heightCell / 2);
                        }
                    });

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
            resolve();
        });
    }
}

export default Draw;