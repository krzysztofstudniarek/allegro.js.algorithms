var width = 640, height=580;

var QSarr = [];
var ISarr = [];
var BSarr = [];
var MSarr = [];
var arrSize = 500;

var stack = [];
var t = -1;

var index = 0;
var bubble =arrSize -1;

var curr_size = 1;
var left_start = 1;  

var msIndex = 1;
var msJIndex = msIndex;

function draw()
{   
	textout(canvas,font,"MS :",0,height-470,25,makecol(0,0,0));
	textout(canvas,font,"BS :",0,height-360,25,makecol(0,0,0));
	textout(canvas,font,"IS :",0,height-250,25,makecol(0,0,0));
	textout(canvas,font,"QS :",0,height-140,25,makecol(0,0,0));

	for(var i = 0 ; i<arrSize; i++){
		line(canvas,60+i,height - 430,60+i,height - 430 - MSarr[i],makecol(255 * MSarr[i]/100, 255 * (1-MSarr[i]/100), 0),1);
		line(canvas,60+i,height - 320,60+i,height - 320 - BSarr[i],makecol(255 * BSarr[i]/100, 255 * (1-BSarr[i]/100), 0),1);
		line(canvas,60+i,height - 210,60+i,height - 210 - ISarr[i],makecol(255 * ISarr[i]/100, 255 * (1-ISarr[i]/100), 0),1);
		line(canvas,60+i,height - 100,60+i,height - 100 - QSarr[i],makecol(255 * QSarr[i]/100, 255 * (1-QSarr[i]/100), 0),1);
	}
}

function update()
{	

}

function main()
{
    enable_debug('debug');
    allegro_init_all("game_canvas", width, height);
	load_elements();
	font = load_font("../antilles.ttf");
	ready(function(){
        loop(function(){
            clear_to_color(canvas,makecol(255,255,255));
            update();
            draw();
			bubbleSortStep();
			quickSortStep();
			insertionSortStep();
			mergeSort();
        },BPS_TO_TIMER(60));
    });
    return 0;
}
END_OF_MAIN();

function load_elements()
{
	for(var i = 0 ; i<arrSize; i++){
		k = rand()%100
		QSarr[i] = k;
		ISarr[i] = k;
		BSarr[i] = k;
		MSarr[i] = k;
	}
	
	//quickSort(0,arrSize-1);
	
	stack[++t] = 0;
	stack[++t] = arrSize-1;
	
	
	
}

//INSERTION SORT IMPLEMENTATION
function insertionSortStep(){
	if(index < arrSize){
		var curr = ISarr[index];
		var pos = index;
		while(pos >= 0 && ISarr[pos-1] > curr){
			//swap(ISarr, j, j-1);
			ISarr[pos] = ISarr[pos - 1];
			pos = pos-1;
		}
		ISarr[pos] = curr;
		index ++;
	}
	
}

//BUBBLE SORT IMPLEMENTATION
function bubbleSortStep(){
	if(bubble >= 0){
		for(var i = 0; i < bubble; i++){
			if(BSarr[i] > BSarr[i+1]){
				swap(BSarr, i, i+1);
			}
		}
		bubble --;
	}
}

//QUICK SORT IMPLEMENTATION
function quickSortStep(){
	
	if(t >= 0)
	{
		right = stack [t--];
		left = stack [t--];
		
		var p = partition(left, right);
		
		if(p-1 > left){
			stack [++t] = left;
			stack [++t] = p-1;
		}
		
		if(p+1 < right){
			stack[++t] = p+1;
			stack[++t] = right;
		}
	}
	
}

function partition(left, right){
	
	var pivot = QSarr[right];
	var i = left;
	for(var j = left; j < right; j++){
		if(QSarr[j] < pivot){
			swap(QSarr ,i, j);
			i = i+1;
		}
	}
	
	swap(QSarr,i, right);
	
	return i;
}

function mergeSort(){
	if(msIndex <= arrSize)
    {
        if(msJIndex <= arrSize)
        {
            merge(msJIndex - msIndex, msJIndex, Math.min(msJIndex + msIndex, arrSize));
			msJIndex += 2 * msIndex;
        }else{
			msIndex *= 2;
			msJIndex = msIndex;
		}
    }
 
}

function merge(start,middle,end){
	var merge = [];
	var l = 0, r = 0, i = 0;
    while (l < middle - start && r < end - middle)
    {
       if(MSarr[start + l]< MSarr[middle + r]){
		   merge[i] = MSarr[start + l];
		   l++;
	   }else{
		   merge[i] = MSarr[middle + r];
		   r++;
	   }
	   i++;

    }
 
    while (r < end - middle){
		merge[i] = MSarr[middle + r];
		r++;
		i++;
	} 
 
    while (l < middle - start){
		merge[i] = MSarr[start + l];
		l++;
		i++;
	}

	for(var i = 0; i < merge.length; i++){
		MSarr[start + i] = merge[i];
	}
}

function swap(arr, x , y){
	tmp = arr[x];
	arr[x] = arr[y];
	arr[y] = tmp;
}