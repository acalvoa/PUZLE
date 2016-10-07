"use strict";
//DEFINIMOS LA MATRIZ BIDIMENSIONAL DE 3X3
var a = [[],[],[]];
var b = [1,2,3,4,5,6,7,8,0];
b = b.sort(function() {return Math.random() - 0.5});
var dist_manhattan = 0;
var pieza;
var lastm = [-1,-1];
var lasta = [-1,-1];
//DEFINIMOS EL OBJETO ELEMENTO
var element = function(numero,x,y){
	var _self = this; 
	this.numero, this.element, this.x, this.y;
	this.calculate = function(){
		this.element.style.top = _self.y*200;
		this.element.style.left = _self.x*200;
	}
	function constructor(num,x,y){
		_self.numero = num;
		_self.element = document.createElement('div');
		_self.element.className = "element";
		if(_self.numero > 0){
			_self.element.innerHTML = _self.numero;
		}
		document.getElementById("container").appendChild(_self.element);
		_self.x = x;
		_self.y = y;
		_self.calculate();
		_self.element.onclick = function(){
			_self.mov();
		}
	}
	this.canMove = function(){
		let x = _self.x;
		let y = _self.y;
		if(typeof a[(y-1)] != "undefined"){
			if(lastm[0] == (y-1) && lastm[1] == (x)) return false;
			if(a[(y-1)][(x)].getN() == 0) return true;
		}
		if(typeof a[(y+1)] != "undefined"){
			if(lastm[0] == (y+1) && lastm[1] == (x)) return false;
			if(a[(y+1)][(x)].getN() == 0) return true;
		}
		if(typeof a[(y)][x-1] != "undefined"){
			if(lastm[0] == (y) && lastm[1] == (x-1)) return false;
			if(a[(y)][(x-1)].getN() == 0) return true;
		}
		if(typeof a[(y)][x+1] != "undefined"){
			if(lastm[0] == (y) && lastm[1] == (x+1)) return false;
			if(a[(y)][(x+1)].getN() == 0) return true; 
		}
		return false;
	}
	this.mov = function mov(){
		//SOLO SON 4 POSICIONES POSIBLES
		let x = _self.x;
		let y = _self.y;
		var status = false;
		if(typeof a[(y-1)] != "undefined"){
			if(a[(y-1)][(x)].getN() == 0) _self.move((x),(y-1));
		}
		if(typeof a[(y+1)] != "undefined"){
			if(a[(y+1)][(x)].getN() == 0) _self.move((x),(y+1));
		}
		if(typeof a[(y)][x-1] != "undefined"){
			if(a[(y)][(x-1)].getN() == 0) _self.move((x-1),y);
		}
		if(typeof a[(y)][x+1] != "undefined"){
			if(a[(y)][(x+1)].getN() == 0) _self.move((x+1),y); 
		}
	}
	this.move = function(x0,y0){
		var aux = a[y0][x0]; 
		a[y0][x0] = _self;
		a[_self.y][_self.x] = aux;
		aux.setP(_self.x,_self.y);
		_self.setP(x0,y0);
	}
	this.getN = function(){
		return _self.numero;
	}
	this.setP = function(x,y){
		_self.x = x;
		_self.y = y;
		_self.calculate();
	}
	this.mark = function(){
		_self.element.style.background = "yellow";
	}
	this.mark2 = function(){
		_self.element.style.background = "orange";
	}
	this.unmark = function(){
		_self.element.style.background = "#DDD";
	}
	constructor(numero,x,y);
}
//GENERAMOS EL MAZE
function print(b){
	for(var i=0;i<b.length;i++){
		var y = Math.floor(i/3);
		var x = i%3;
		a[y][x] = new element(b[i],x,y);
	}
}
print(b);
//EN ESTE PUNTO COMENZAMOS A DEFINIR LA IA
var manhattan = [
[1,2,3],
[8,0,4],
[7,6,5]
];
var megan = [
	null,
	[[0,1,2],
	 [1,1,2],
	 [2,2,2]],
	[[1,0,1],
	 [1,1,1],
	 [2,2,2]],
	[[2,1,0],
	 [2,1,1],
	 [2,2,2]],
	[[2,1,1],
	 [2,1,0],
	 [2,1,1]],
	[[2,2,2],
	 [2,1,1],
	 [2,1,0]],
	[[2,2,2],
	 [1,1,1],
	 [1,0,1]],
	[[2,2,2],
	 [1,1,2],
	 [0,1,2]],
	[[1,1,2],
	 [0,1,2],
	 [1,1,2]],
];
var selected = null;
var selected2 = null;
function D_manhattan(ne){
	dist_manhattan = 0;
	document.getElementById("m_mahattan").innerHTML = "";
	let c = [
	[0,0,0],
	[0,0,0],
	[0,0,0]
	];
	var max = 0;
	let sele = null;
	for(let i=0;i<c.length;i++){
		for(let l=0; l<c[i].length;l++){
			c[i][l] = Math.abs(a[i][l].getN()-manhattan[i][l]);
			dist_manhattan += c[i][l];
			if(c[i][l] > max && a[i][l].getN() > 0){ sele = a[i][l]; max = c[i][l]; }
			var me = document.createElement('div');
			me.className = "m_mahattan_e";
			me.id = "m_t"+i+"l"+l;
			if(a[i][l].getN() > 0) me.innerHTML = c[i][l];
			document.getElementById("m_mahattan").appendChild(me);
			me.style.top=70*i;
			me.style.left=70*l;
		}
	}
	document.getElementById("d_manhattan").innerHTML = dist_manhattan;
	if(ne){
		selected = sele;
		selected.mark();
		document.getElementById("selected_d").innerHTML = selected.getN();
	}
	document.getElementById("m_t"+selected.y+"l"+selected.x).style.background = "green";
	return c;
}
function D_megan(){
	document.getElementById("m_megan").innerHTML = "";
	for(let i=0;i<megan[selected.getN()].length;i++){
		for(let l=0; l<megan[selected.getN()][i].length;l++){
			var me = document.createElement('div');
			me.className = "m_mahattan_e";
			me.id = "me_t"+i+"l"+l;
			me.innerHTML = megan[selected.getN()][i][l];
			document.getElementById("m_megan").appendChild(me);
			me.style.top=70*i;
			me.style.left=70*l;
		}
	}
	document.getElementById("d_megan").innerHTML = megan[selected.getN()][selected.y][selected.x];
	document.getElementById("me_t"+selected.y+"l"+selected.x).style.background = "green";
	return megan[selected.getN()];
}
//PRIMERA DECISION
var dm = D_manhattan(true);
D_megan();

//MOVIMIENTOS
function localicenextandmove(){
	let c = [
	[0,0,0],
	[0,0,0],
	[0,0,0]
	];
	lastm = [-1,-1];
	var next;
	var max = 0;
	if(selected2 != null) selected2.unmark();
	for(let i=0;i<c.length;i++){
		for(let l=0; l<c[i].length;l++){
			c[i][l] = Math.abs(a[i][l].getN()-manhattan[i][l]);
			if(c[i][l] > max && a[i][l].getN() > 0 && a[i][l].canMove()){
				if(selected2 == null || selected2.getN() != a[i][l].getN()){
					next = a[i][l]; 
					max = c[i][l];
				}
			}
		}
	}
	document.getElementById("m_t"+next.y+"l"+next.x).style.background = "orange";
	next.mark2();
	next.mov();
	selected2 = next;
}
document.getElementById('next').onclick = function(){
	if(selected.canMove()){
		lastm[0]=selected.x;
		lastm[1] = selected.y;
		selected.unmark();
		if(selected2 != null) selected2.unmark();
		selected2 = null;
		selected.mov();
		D_manhattan(true);
		D_megan();
	}
	else{
		localicenextandmove();
	}
}

