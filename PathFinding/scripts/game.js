var width = 640, height=960;

var cells = [];

var cellsD = [];

var w = 20, h = 20;
var cellSize = 15;

var startCell, endCell;

var startCellD, endCellD;

var front;
var came_from = new Map();
var	cost_so_far = new Map();
var current;

var frontD;
var came_fromD = new Map();
var	cost_so_farD = new Map();
var currentD;


function draw()
{   

	textout(canvas,font,"A* :",0,250,25,makecol(0,0,0));
	
	textout(canvas,font,"Dijkstra :",0,height/2+100,25,makecol(0,0,0));

	drawPlayground(cells);
	drawPlayground(cellsD);
}

function drawPlayground(tab){
	for(var i = 0; i<w; i++){
		for(var j = 0; j<h; j++){
			
			var value = tab[i][j];
			
			if(!value.disabled){
				
				var color1, color2, color3;
				
				if(value != startCell && value != endCell && value != startCellD && value != endCellD){
					if(value.color == 'grey'){
						color1 = makecol(145,145,145);
						color2 = makecol(100,100,100);
						color3 = makecol(200,200,200);
					}else if(value.color == 'white'){
						color1 = makecol(0,0,145);
						color2 = makecol(0,0,100);
						color3 = makecol(0,0,200)
					}else if(value.color == 'black'){
						var x = heuristic(startCell,endCell);
						var f = heuristic(value,endCell);
						var ind = x>f ? f/x : 1;
						color1 = makecol(ind*145,(1-ind)*145,0);
						color2 = makecol(ind*100,(1-ind)*100,0);
						color3 = makecol(ind*200,(1-ind)*200,0)
					}else{
						color1 = makecol(145,0,0);
						color2 = makecol(100,0,0);
						color3 = makecol(200,0,0);
					}
				}else if(value == endCell || value == endCellD){
					color1 = makecol(0,0,145);
					color2 = makecol(0,0,100);
					color3 = makecol(0,0,200);
				}else if(value == startCell || value == startCellD){
					color1 = makecol(0,145,0);
					color2 = makecol(0,100,0);
					color3 = makecol(0,200,0);
				}
				
				
				polygonfill(canvas,4,[value.x+cellSize, value.y-value.height, value.x, value.y+cellSize/2-value.height, value.x-cellSize, value.y-value.height, value.x, value.y-cellSize/2-value.height],color1);
				polygonfill(canvas,4,[value.x+cellSize, value.y-value.height, value.x, value.y+cellSize/2-value.height, value.x, value.y+cellSize/2, value.x + cellSize, value.y],color2);
				polygonfill(canvas,4,[value.x-cellSize, value.y-value.height, value.x, value.y+cellSize/2-value.height, value.x, value.y+cellSize/2, value.x - cellSize, value.y],color3);
				
				line (canvas, value.x+cellSize, value.y-value.height, value.x, value.y+cellSize/2-value.height, makecol(255,255,255), 1);
				line (canvas, value.x-cellSize, value.y-value.height, value.x, value.y+cellSize/2-value.height, makecol(255,255,255), 1);
				line (canvas, value.x+cellSize, value.y-value.height, value.x, value.y-cellSize/2-value.height, makecol(255,255,255), 1);
				line (canvas, value.x-cellSize, value.y-value.height, value.x, value.y-cellSize/2-value.height, makecol(255,255,255), 1);
				line (canvas, value.x+cellSize, value.y-value.height, value.x+cellSize, value.y, makecol(255,255,255), 1);
				line (canvas, value.x-cellSize, value.y-value.height, value.x-cellSize, value.y, makecol(255,255,255), 1);
				line (canvas, value.x, value.y+cellSize/2-value.height, value.x, value.y+cellSize/2, makecol(255,255,255), 1);
				
			}
		}
	}
}

function controls ()
{
	controlPlayground(cells);
	controlPlayground(cellsD);
}

function controlPlayground(tab){
	for(var i = 0; i<w; i++){
		for(var j = 0; j<h; j++){
			
			value = tab[i][j];
			
			if(abs(mouse_x - value.x)<cellSize && abs(mouse_y - value.y + value.height)<cellSize/2){
				if(
					cross(mouse_x, mouse_y, value.x, value.y - value.height, value.x -cellSize/2, value.y - value.height, value.x, value.y-cellSize/2 - value.height) ||
					cross(mouse_x, mouse_y, value.x, value.y - value.height, value.x -cellSize/2, value.y - value.height, value.x, value.y+cellSize/2 - value.height) ||
					cross(mouse_x, mouse_y, value.x, value.y - value.height, value.x +cellSize/2, value.y - value.height, value.x, value.y-cellSize/2 - value.height) ||
					cross(mouse_x, mouse_y, value.x, value.y - value.height, value.x +cellSize/2, value.y - value.height, value.x, value.y+cellSize/2 - value.height)
				){
					if(value.color != 'white' && value.color != 'black'){
						value.color = 'grey';
					}
				}else{
					if(mouse_pressed && !value.disabled){
						if(startCell == undefined && endCell == undefined){
							startCell = cells[i][j];
							startCellD = cellsD[i][j];
						}else if(endCell == undefined && value != startCell){
							endCell = cells[i][j];
							endCellD = cellsD[i][j];
							
							startCell.f = 0;
							front.push(startCell);
							came_from.set(startCell, null);
							cost_so_far.set(startCell, 0);
							
							startCellD.f = 0;
							frontD.push(startCellD);
							came_fromD.set(startCellD, null);
							cost_so_farD.set(startCellD, 0);

						}else if(endCell != undefined && startCell != undefined){
							startCell = cells[i][j];
							startCellD = cellsD[i][j];
							endCell = undefined;
							endCellD = undefined;
							
							front = new BinaryHeap(function(node){
								return node.f;
							});
							
							frontD = new BinaryHeap(function(node){
								return node.f;
							});
							
							came_from = new Map();
							cost_so_far = new Map();
							came_fromD = new Map();
							cost_so_farD = new Map();
							
							clearColor();
						}
						
					}
					if(value.color != 'white' && value.color != 'black'){
						value.color = 'red';
					}
					
				}
			}else{
				if(value.color != 'white' && value.color != 'black'){
					value.color = 'grey';
				}
				
			}
	
		}
	}
}

function clearColor(){
	for(var i = 0; i< w; i++){
		for(var j = 0; j<h; j++){
			cells[i][j].color = 'grey';
			cellsD[i][j].color = 'grey';
		}
	}
}

function main()
{
    enable_debug('debug');
    allegro_init_all("path_game_canvas", width, height);
	load_elements();
	font = load_font("../antilles.ttf");
	ready(function(){
        loop(function(){
            clear_to_color(canvas,makecol(255,255,255));
			aStarStep();
			dijkstraStep();
			controls();
            draw();
        },BPS_TO_TIMER(60));
    });
    return 0;
}
END_OF_MAIN();

function load_elements()
{
	cells = [];
	cellsD = [];
	for(var j =0; j < w; j++){
		cells[j] = [];
		cellsD[j] = [];
		for(var i =0; i < h; i++){
			var dis =  frand()<0.1;
			
			cells[j][i] = {
				xPos: j,
				yPos: i,
				x: width/2 + cellSize*i - cellSize*j,
				y: 100+height/4- max(w,h)*cellSize/2 + cellSize/2*j + cellSize/2*i + cellSize/2, 
				height: cellSize,//rand()%50,
				color: 'grey',
				disabled : dis,
				f : 9007199254740992
			};
			
			cellsD[j][i] = {
				xPos: j,
				yPos: i,
				x: width/2 + cellSize*i - cellSize*j,
				y: height/2 + 200 - max(w,h)*cellSize/2 + cellSize/2*j + cellSize/2*i + cellSize/2, 
				height: cellSize,//rand()%50,
				color: 'grey',
				disabled : dis,
				f : 9007199254740992
			};
		}
	}
	
	

	
	front = new BinaryHeap(function(node){
		return node.f;
	});
	
	frontD = new BinaryHeap(function(node){
		return node.f;
	});
}

function cross(x1,y1,x2,y2,x3,y3,x4,y4){
	
	if ((det_matrix(x1, y1, x2, y2, x3, y3))*(det_matrix(x1, y1, x2, y2, x4, y4))>=0){
		return false; 
	}else if ((det_matrix(x3, y3, x4, y4, x1, y1))*(det_matrix(x3, y3, x4, y4, x2, y2))>=0){
		return false;
	}
	else{
		return true;
	}
}

function max(i,j){
	return i >= j ? i:j;
}

function det_matrix(xx,xy,yx,yy,zx,zy)
{
	return (xx*yy + yx*zy + zx*xy - zx*yy - xx*zy - yx*xy);
}

function aStarStep(){
	if( front.size() > 0 && startCell != undefined && endCell != undefined){
		current = front.pop()
	
		if(current == endCell){
			front = new BinaryHeap(function(node){
				return node.f;
			});
			getRoute(came_from);
			return;
		}
		
		//console.log(getNeighbors(current));
		
		getNeighbors(cells, current).forEach(function(value){
			var new_cost = cost_so_far.get(current) + 1;
			if(cost_so_far.get(value) == undefined || new_cost < cost_so_far.get(value)){
				cost_so_far.set(value, new_cost);
				priority = new_cost + heuristic(endCell, value);
				value.f = priority;
				value.color = 'black';
				front.push(value);
				came_from.set(value, current);
			}
		});
	}
	
	//console.log(came_from);
	//getRoute(came_from);
}

function dijkstraStep(){
	if( frontD.size() > 0 && startCellD != undefined && endCellD != undefined){
		currentD = frontD.pop()
	
		if(currentD == endCellD){
			frontD = new BinaryHeap(function(node){
				return node.f;
			});
			getRouteD(came_fromD);
			return;
		}
		
		getNeighbors(cellsD, currentD).forEach(function(value){
			var new_cost = cost_so_farD.get(currentD) + 1;
			if(cost_so_farD.get(value) == undefined || new_cost < cost_so_farD.get(value)){
				cost_so_farD.set(value, new_cost);
				priority = new_cost;
				value.f = priority;
				value.color = 'black';
				frontD.push(value);
				came_fromD.set(value, currentD);
			}
		});
	}
}

function getRoute(came_from){
	var ind = 0;
	var current = came_from.get(endCell);
	while(current != null){
		current.color = 'white';
		current = came_from.get(current);
		ind ++;
	}
	console.log(ind);
}

function getRouteD(came_from){
	var ind = 0;
	var currentD = came_from.get(endCellD);
	while(currentD != null){
		currentD.color = 'white';
		currentD = came_from.get(currentD);
		ind++;
	}
	console.log(ind);
}

function getNeighbors( tab ,cell){
	
	var set = new Set();
	if(cell.xPos >= 1 && !tab[cell.xPos-1][cell.yPos].disabled)
		set.add(tab[cell.xPos-1][cell.yPos]);
	if(cell.xPos < w-1 && !tab[cell.xPos+1][cell.yPos].disabled)
		set.add(tab[cell.xPos+1][cell.yPos]);
	if(cell.yPos >= 1 && !tab[cell.xPos][cell.yPos-1].disabled)
		set.add(tab[cell.xPos][cell.yPos-1]);
	if(cell.yPos < h-1 && !tab[cell.xPos][cell.yPos+1].disabled)
		set.add(tab[cell.xPos][cell.yPos+1]);
	
	return set;
}



function heuristic(a,b){
	return abs(a.xPos - b.xPos)+abs(a.yPos-b.yPos);
}