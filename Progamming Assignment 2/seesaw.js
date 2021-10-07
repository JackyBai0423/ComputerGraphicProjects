var alpha = 0;
function Battle(){
    class leaf {
        constructor(speed){
            var state = 0; // 0 for complete, 1 for broken
            this.x = Math.random()*780+10;
            this.y = 0;
            this.speed = Math.random()*4+1;
        }

        update(){
            context.save();
            this.y += this.speed;
            if(this.y >= 800) this.y=0;
            context.translate(this.x + Math.sin(50*alpha)*50, this.y);
            draw_leaf();

            context.restore();
        }
    }
    var canvas = document.getElementById('myCanvas');
    var buttonLeftAttack = document.getElementById("left_samurai_attack");
    var slider = document.getElementById("s")
    var context = canvas.getContext('2d');
    var background_image = new Image(800,800);
    var leaves = [
        new leaf(),
        new leaf(),
        new leaf(),
        new leaf(),
        new leaf(),
        new leaf(),
        new leaf(),
        new leaf(),
        new leaf(),
        new leaf()
    ];

    background_image.src = "background.jpg";
    context = context;





    function draw_seesaw_base (color) {
        context.beginPath();
        context.fillStyle = color;
        context.moveTo(0,  0); // 400, 700
        context.lineTo(-40, 80);
        context.lineTo(40, 80);
        context.closePath();
        context.fill();


    }
    function draw_seesaw_board (color) {
        context.beginPath();
        context.fillStyle = color;
        context.moveTo(0,0); // 750 725
        context.lineTo(-700, 0);
        context.lineTo(-700, -15);
        context.lineTo(0, -15);
        context.closePath();
        context.fill();
    }
    function draw_center(color) {
        context.beginPath();
        context.fillStyle = color;
        // 400 717.5
        context.ellipse(0,0, 5,5, 0, 0, 2*Math.PI);
        context.fill();
    }
    function draw_samurai() {
        // draw leg
        context.lineWidth = 5;
        context.strokeStyle = "white";
        context.beginPath();
        context.moveTo(-10, 0); // draw left leg
        context.lineTo(-60, 50); // -50, +50
        context.moveTo(10, 0); // draw right leg
        context.lineTo(20, 20); // upper part of right leg +10, +20
        context.lineTo(0, 50); // lower part of right leg -20, +30
        context.stroke();
        // body
        context.fillStyle = "grey";
        context.beginPath();
        context.rect(-15, -70, 30, 70);
        context.fill();
        // head
        context.fillStyle = "#ffcc99";
        context.beginPath();
        context.ellipse(0, -100, 30, 30, 0, 0, 2*Math.PI);
        context.fill();
        context.fillStyle = "#663300";
        context.beginPath();
        context.moveTo(0, -150);
        context.lineTo(-50, -120);
        context.lineTo(50,-120);
        context.closePath();
        context.fill();
    }

    function draw_spin(){
        context.fillStyle = "green";
        context.beginPath();
        context.ellipse(0,0,25, 25, 0, 0, 2*Math.PI);
        context.fill();
        draw_wind_blade("brown");
        context.save();
        context.rotate(1/2*Math.PI);
        draw_wind_blade("brown");
        context.restore();
        context.save();
        context.rotate(Math.PI);
        draw_wind_blade("brown");
        context.restore();
        context.save();
        context.rotate(3/2*Math.PI);
        draw_wind_blade("brown");
        context.restore();
    }

    function draw_wind_blade(color){
        context.fillStyle = color;
        context.beginPath();
        context.moveTo(0,0);
        context.bezierCurveTo(5,10, 20, 10, 25, 0);
        context.closePath();
        context.fill();
    }

    function draw_leaf(){
        context.rotate(1/2*Math.PI);
        draw_wind_blade("green");
        context.save();
        context.scale(1, -1);
        draw_wind_blade("green");
        context.restore();
    }

    function draw_arm_kotana(){
        context.strokeStyle = "white";
        context.lineWidth = 5;
        context.beginPath();
        context.moveTo(-15,0); // draw left arm
        context.lineTo(-45, 30)
        context.moveTo(15, 0); // draw right arm
        context.lineTo(35,20);
        context.stroke();
        context.beginPath();
        context.strokeStyle = "gold";
        context.lineWidth = 2;
        context.fillStyle = "black";
        context.moveTo(35, 20);
        context.lineTo(35, 30);
        context.lineTo(-65, 42.5); // -100, -12.5
        context.lineTo(-65, 32.5);
        context.closePath();
        context.fill();
        context.moveTo(15, 22.5);
        context.lineTo(15, 32.5);
        context.stroke();

    }
    function draw () {
        canvas.width = canvas.width;
        context.drawImage(background_image, 0, 0, 800, 800);
        context.translate(400,700);
        draw_seesaw_base('brown');
        context.save();
        context.translate(0, 17.5);
        context.rotate(Math.asin(62.5/350) *Math.sin(100*alpha)); // enable board animation
        context.translate(0, -17.5);
        context.translate(350, 25);
        draw_seesaw_board('yellow');
        context.save(); // draw spins
        context.translate(0, -7.5);
        context.rotate(250*alpha);
        draw_spin();
        context.restore();

        context.save(); // draw spins
        context.translate(-700, -7.5);
        context.rotate(250*alpha);
        draw_spin();
        context.restore();

        context.translate(-350, -7.5)
        draw_center('orange');
        context.restore();
        alpha= (alpha + Math.PI/3600)%(2*Math.PI);
        context.translate(-200,-57.5);

        context.save(); // before draw the samurai
        context.translate(0,-(-400*Math.pow(Math.sin(50*alpha+3/4*Math.PI),2)+340));

        draw_samurai();
        context.save(); // draw arm and kotana
        context.translate(0, -40)
        draw_arm_kotana();

        context.restore();
        context.restore();

        context.save();
        context.translate(-200, -640); // 0,0
        draw_center();
        leaves.forEach(e=>e.update());
        context.restore();

        window.requestAnimationFrame(draw);

    }


    draw();
}

window.onload = Battle