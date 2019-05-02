// 'game_canvas' is the tetris game
// 'preview_canvas' is the piece privewer

	let peak = {
		"name":"peak",
		"cords": [[-1,0],[0,0],[1,0],[0,-1]],
		"orientation":[0,0],
		"color":"purple",
		"position":[0,0]
	}
	let stick = {
		"name": "stick",
		"cords": [[0,-2],[0,-1],[0,0],[0,1]],
		"orientation":[0,0],
		"color":"orange",
		"position":[0,0]
	}
	let elR = {
		"name": "elR",
		"cords": [[0,-1],[0,0],[0,1],[1,-1]],
		"orientation": 0,
		"color": "brown",
		"position":[0,0]
	}
	let elL = {
		"name": "elL",
		"cords": [[0,-1],[0,0],[0,1],[-1,-1]],
		"orientation": 0,
		"color":"blue",
		"position":[0,0]
	}
	let square = {
		"name": "square",
		"cords": [[-1,-1],[-1,0],[0,-1],[0,0]],
		"orientation": 0,
		"color": "yellow",
		"position":[0,0]
	}
	let essR = {
		"name": "essR",
		"cords": [[1,-1],[1,0],[0,0],[0,1]],
		"orientation": 0,
		"color": "red",
		"position":[0,0]
	}
	let essL = {
		"name": "essL",
		"cords": [[0,1],[0,0],[-1,-1],[-1,0]],
		"orientation":0,
		"color":"green",
		"position":[0,0]
	}

let pieces = {
	"peak":peak,
	"stick":stick,
	"elR":elR,
	"elL":elL,
	"square":square,
	"essR":essR,
	"essL":essL
}

let currentPiece = ""
let gameCanvas = document.getElementById('game_canvas');
let gameCtx = gameCanvas.getContext('2d');
let previewCanvas = document.getElementById('preview_canvas');
let previewCtx = previewCanvas.getContext('2d');
let translated = 0
let ctx =""
let playedPieces = []

// Object.keys(pieces).forEach((piece) => {
// 	pieces[piece].cords.forEach(cord => {
// 		cord[0] +=40;
// 		cord[1] +=40
// 	})

// })


let randomNumber = (optionCount) => (Math.floor(Math.random()*optionCount))


let randomProperty = (objectName) => {
	let keys = Object.keys(objectName)
	return keys[randomNumber(keys.length)]
}

function rotatePiece(direction) {
	if(currentPiece.name !== "square") {
	let coordinates = currentPiece.cords;
	let newCoordinates = []

	coordinates.forEach((coordinate,index) => {
		let x = coordinate[0];
		let y = coordinate[1];
		switch(direction) {
			case "left":				
				y = y - (y*2)
			break;
			case "right":
				x = x - (x*2)
			break;
		}
		newCoordinates[index] = [y,x]
	})
	currentPiece.cords = newCoordinates
	//console.log(currentPiece.name + " - cords: " + currentPiece.cords)	
	}

}

let renderGameCanvas = (ctx) => {
	let canvasWidth = 200;
	let canvasHeight = 450;
	gameCanvas.setAttribute('width', canvasWidth);
	gameCanvas.setAttribute('height', canvasHeight);
	ctx = gameCanvas.getContext('2d');
	//ctx.clearRect(0,0,200,450)
}

let renderPreviewCanvas = (ctx) => {
	let canvasWidth = 100;
	let canvasHeight = 100;
	previewCanvas.setAttribute('width', canvasWidth);
	previewCanvas.setAttribute('height', canvasHeight);
	ctx = previewCanvas.getContext('2d');
	ctx.clearRect(0,0,100,100)	// IMPORTANT: must be on canvas not on Piece

}


renderPreviewCanvas();

let renderPiece = (ctx, piece, position = [0,0]) => { 	
		let Offset = 40
	if(currentPiece.name === "square" && ctx === previewCanvas) {
		Offset = 50
	}
	piece["cords"].forEach((cord,index) => {
			let pixelSize = 20;
			let pX = position[0]
			let pY = position[1]
			let x = ((cord[0] + pX) *20 + Offset)
			let y = ((cord[1] + pY) *20 + Offset) 
			ctx.rect(x,y,pixelSize,pixelSize)
			ctx.fillStyle=currentPiece.color
			ctx.fill()
			ctx.stroke()
	})
}


let newPiece = () => {
	playedPieces.push(pieces[randomProperty(pieces)])
	console.log(playedPieces)
	currentPiece = playedPieces[playedPieces.length -1]
	renderPiece(previewCtx, currentPiece)
	console.log(currentPiece)

}
newPiece()
renderGameCanvas()

let movePiece = (direction) => {
	switch(direction){
		case "left":
		currentPiece.position[0] += -1
		break;
		case "right":
		currentPiece.position[0] += 1
	}
}

window.addEventListener('keydown', event => {
		renderGameCanvas()
	let arrow = event.keyCode;
	switch(arrow) {
		case 38: // up arrow
			rotatePiece("left");
			renderPiece(gameCtx, currentPiece, currentPiece.position)
			break;
		case 40: // down arrow
			rotatePiece("right");
			renderPiece(gameCtx, currentPiece, currentPiece.position)
			break;
		case 37: // left
			movePiece("left");
			renderPiece(gameCtx, currentPiece, currentPiece.position)
			break;
		case 39: // right
			movePiece("right")
			renderPiece(gameCtx, currentPiece, currentPiece.position)
			break;
		case 32:
			newPiece()
			renderPreviewCanvas()
			renderPiece(previewCtx, currentPiece)
			renderPiece(gameCtx, currentPiece)
			break;
		default:
			renderPiece(gameCtx, currentPiece, currentPiece.position)
			break;
	}


	
	
})
renderGameCanvas()
renderPiece(gameCtx, currentPiece)
renderPiece(previewCtx, currentPiece)





