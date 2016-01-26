var width = 640, height=580;
var fib = [0,1,1];
var n = 15;
var index = 2;
var r = 1;

var midX = width/2+130;
var midY = height/2-80;

var moveX = 0;
var moveY = 0;

var last_mouse_z = mouse_z;

function draw()
{  
	moveX = 0;
	moveY = 0;
	for(var i =1; i<n; i++){
		if(i%4 == 1){
			moveX -= (fib[i]-fib[i-1]);
			rect (canvas, midX + moveX*r, midY + moveY*r, fib[i]*r, fib[i]*r, makecol(0,0,0), 1);
			arc(canvas, midX + moveX*r, midY + moveY*r, DEG(PI*(i-1)/2), DEG(PI*i/2), fib[i]*r, makecol(0,0,0), 2);
			
		}else if(i%4 == 2){
			moveY -= (fib[i]-fib[i-1]);
			rect (canvas, midX + moveX*r-fib[i]*r, midY + moveY*r, fib[i]*r, fib[i]*r, makecol(0,0,0), 1);
			arc(canvas, midX + moveX*r, midY + moveY*r, DEG(PI*(i-1)/2), DEG(PI*i/2), fib[i]*r, makecol(0,0,0), 2);
			
		}else if(i%4 == 3){
			moveX += (fib[i]-fib[i-1]);
			rect (canvas, midX + moveX*r - fib[i]*r, midY + moveY*r - fib[i]*r, fib[i]*r, fib[i]*r, makecol(0,0,0), 1);
			arc (canvas, midX + moveX*r, midY + moveY*r, DEG(PI*(i-1)/2), DEG(PI*i/2), fib[i]*r, makecol(0,0,0), 2);
			
		}else if(i%4 == 0){
			moveY += (fib[i]-fib[i-1]);
			rect (canvas, midX + moveX*r, midY + moveY*r - fib[i]*r, fib[i]*r, fib[i]*r, makecol(0,0,0), 1);
			arc (canvas, midX + moveX*r, midY + moveY*r, DEG(PI*(i-1)/2), DEG(PI*i/2), fib[i]*r, makecol(0,0,0), 2);
		}
	}
}

function update()
{	
	if(last_mouse_z != mouse_z){
		r += sgn(last_mouse_z - mouse_z);
		r<1?r=1:r;
		last_mouse_z = mouse_z;
	}
}

function main()
{
    enable_debug('debug');
    allegro_init_all("game_canvas", width, height);
	load_elements();
	font = load_font("../antilles.ttf");
	fibon();
	ready(function(){
        loop(function(){
            clear_to_color(canvas,makecol(255,255,255));
            update();
            draw();
			//fib_step();
        },BPS_TO_TIMER(60));
    });
    return 0;
}
END_OF_MAIN();

function load_elements()
{
	
}

function fibon(){
	
	for(var i = 2; i<n; i++){
		fib[i] = fib[i-1]+fib[i-2];
	}
}
