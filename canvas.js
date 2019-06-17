// resize the window when viewpoint change:
function resize(){
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.8;
}
window.addEventListener('resize', resize);

window.addEventListener('load', ()=>{
    const canvas = document.querySelector('#canvas');
    const context = canvas.getContext('2d');
    const divs = document.getElementsByTagName('div');
    console.log(divs[0]);
    // //Resizing

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    //variables
    let log = console.log;
    let painting = false;
    let penColor = 'red';
    document.getElementById('picker').addEventListener('input',function(e){
        penColor = this.value;
    });


    function checkPosition(e){

        var key = e.which;
        if (key === 40){
            painting = true;
            log(key);
            log('start');
        }else if (key ===38) {
            painting = false;
            context.beginPath();
            log(key);
            log('stop');
        }else if (key === 32){
            context.clearRect(0, 0, canvas.width, canvas.height);
        }else if (key === 82){
            penColor = 'red';
        }else if (key === 66){
            penColor = 'blue';
        }else if (key === 89){
            penColor = 'yellow';
        }else if (key === 71){
            penColor = 'green';
        }
    }

    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
            y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
        };
    }

    function getTouchPos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: (evt.touches[0].pageX - rect.left) / (rect.right - rect.left) * canvas.width,
            y: (evt.touches[0].pageY - rect.top) / (rect.bottom - rect.top) * canvas.height
        };
    }
    function draw(e){

        if (painting === true){
            //Resizing

            console.log('move');
            // context.lineWidth = 30;
            // context.lineCap = 'square';

            var pos = getMousePos(canvas,e);
            log(pos);
            //set the pen as the place of mouse
            // const clientX = e.clientX - 30;
            // const clientY = e.clientY - 30;
            context.fillStyle = penColor;
            context.fillRect(pos.x-15,pos.y-15,30,30);
            context.stroke();
            context.beginPath();
            context.moveTo(e.clientX,e.clientY);
        }
    }

    canvas.addEventListener('keydown',checkPosition);
    canvas.addEventListener("mousemove", draw);

    //

    canvas.addEventListener('touchmove',function(e){
        painting = true;
        const pos = getTouchPos(canvas,e);
        context.beginPath();
        context.fillStyle = penColor;
        context.fillRect(pos.x,pos.y,30,30);
        context.fill()
    });

    //rotation
    canvas.addEventListener("orientationchange", function() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    });

});