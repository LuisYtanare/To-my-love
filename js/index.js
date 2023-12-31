   $('#myModal').modal('show');

    var c = document.getElementById("canvas");
    var a = c.getContext("2d");

    var w = c.width;
    var h = c.height;

    var hearts = [];

    function Heart(x, y, size, direction, alpha) {
        this.hue = (Math.random() * 25) | 0 + 10;
        this.x = x;
        this.y = y;
        this.size = (Math.random() * 60) | 0 + 50;
        this.direction = "u";
        this.a = 1;
    }

    c.onmousemove = function(e) {
        var mouseX, mouseY;

        if (e.offsetX) {
            mouseX = e.offsetX;
            mouseY = e.offsetY;
        } else if (e.layerX) {
            mouseX = e.layerX;
            mouseY = e.layerY;
        }

        hearts.push(new Heart(mouseX - 4, mouseY - 4));
    };

    window.setInterval(function() {

        a.fillStyle = "#fff";
        a.fillRect(0, 0, w, h);

        if (hearts.length === 0) return;

        hearts = hearts.filter(function(val) {
            return val.y >= 0 && val.a >= 0;
        });

        hearts.forEach(function(heart) {

            heart.y = heart.y + 2;
            heart.a = heart.a - 0.01;

            if (heart.direction === "u") {
                heart.size = heart.size + 5;
                if (heart.size >= 100) heart.direction = "d";
            } else {
                heart.size = heart.size - 5;
                if (heart.size <= 10) heart.direction = "u";
            }

            a.save();
            a.font = heart.size + 'px Arial';
            a.fillStyle = "hsla(" + heart.hue + ",100%,50%," + heart.a + ")";
            a.fillText('♥', heart.x, heart.y);
            a.restore();

        });
    }, 17);
