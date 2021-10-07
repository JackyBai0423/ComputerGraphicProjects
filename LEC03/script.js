var angle1 = 0;
function setup(){ "use strict";
    var canvas;
    canvas =document.getElementById("myCanvas");
    var slider_x = document.getElementById('slider_x');
    var slider_y = document.getElementById('slider_y');
    var rotate_switch = document.getElementById("rotate_switch");
    var scaling_switch = document.getElementById("scaling_switch");
    slider_x.value = 0;
    slider_y.value = 0;

    function draw(){
        var context = canvas.getContext('2d');
        canvas.width = canvas.width;
        var dx = parseInt(slider_x.value);
        var dy = parseInt(slider_y.value);


        function DrawTriangleShape(color) {
            context.beginPath();
            context.fillStyle = color;
            context.moveTo(0, 0);
            context.lineTo(-50, 0+Math.sqrt(3)/2*100);
            context.lineTo(50,0+Math.sqrt(3)/2*100);
            context.closePath();
            context.fill();
        }

        function DrawRectangleShape(color) {
            context.beginPath();
            context.fillStyle = color;
            context.moveTo(0, 0);
            context.lineTo(100, 0);
            context.lineTo(100, 100);
            context.lineTo(0, 100);
            context.closePath();
            context.fill();
        }

        function DrawAxes(color) {
            context.strokeStyle = color;
            context.beginPath();
            // Axes
            context.moveTo(400, 0);
            context.lineTo(0, 0);
            context.lineTo(0, 400);
            // head
            context.moveTo(390,5);
            context.lineTo(400,0);
            context.lineTo(390,-5);
            context.moveTo(5,390);
            context.lineTo(0,400);
            context.lineTo(-5,390);

            context.moveTo(380, 10);
            context.lineTo(390, 20);
            context.moveTo(390, 10);
            context.lineTo(380, 20)

            context.moveTo(10, 380);
            context.lineTo(15, 385);
            context.moveTo(20, 380);
            context.lineTo(15, 385);
            context.lineTo(15, 390);

            context.stroke();
        }


        context.fillStyle = "#a9e4e8";
        context.fillRect(0, 0, canvas.width, canvas.height);
        DrawAxes("black")
        context.translate(dx, dy);

        context.translate(200, 100+(50*2/3*Math.sqrt(3))); // move to 100,100 to start
        context.save();
        if(rotate_switch.checked == true) context.rotate(angle1);
        if(scaling_switch.checked == true) context.scale(Math.sin(angle1),Math.cos(angle1)); // use of Math library
        context.translate(0, -(50*2/3*Math.sqrt(3)));
        DrawTriangleShape("#95daa0"); // draw the triangle
        context.restore();
        // context.save();
        context.translate(0,100); // move down 100
        if(rotate_switch.checked == true) context.rotate(angle1);
        if(scaling_switch.checked == true) context.scale(Math.sin(angle1),Math.cos(angle1)); // use of Math library
        // context.restore();
        context.translate(-50,-50);
        DrawRectangleShape("#E4ea7d");

        angle1 += Math.PI/90;

    }

    function updateCoordinate(dy, dx){

    }

    canvas.addEventListener("mousemove", draw);
    slider_x.addEventListener("input", draw);
    slider_y.addEventListener("input", draw);
    draw();

}


window.onload = setup;