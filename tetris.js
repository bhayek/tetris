// 'game_canvas' is the tetris game
// 'preview_canvas' is the piece privewer

let peak = {
	"name":"peak",
	"cords": [[-1,0],[0,0],[1,0],[0,-1]],
	"actCords": [[-1,0],[0,0],[1,0],[0,-1]],
	"color":"purple",
	"position":[0,0],
	"xmax":0,
	"xmin":0,
	"ymax":0,
	"ymin":0,
}
let stick = {
	"name": "stick",
	"cords": [[0,-2],[0,-1],[0,0],[0,1]],
	"actCords": [[0,-2],[0,-1],[0,0],[0,1]],
	"color":"orange",
	"position":[0,0],
	"xmax":0,
	"xmin":0,
	"ymax":0,
	"ymin":0,
}
let elR = {
	"name": "elR",
	"cords": [[0,-1],[0,0],[0,1],[1,-1]],
	"actCords": [[0,-1],[0,0],[0,1],[1,-1]],
	"orientation": 0,
	"color": "brown",
	"position":[0,0],
	"xmax":0,
	"xmin":0,
	"ymax":0,
	"ymin":0,
}
let elL = {
	"name": "elL",
	"cords": [[0,-1],[0,0],[0,1],[-1,-1]],
	"actCords": [[0,-1],[0,0],[0,1],[-1,-1]],
	"orientation": 0,
	"color":"blue",
	"position":[0,0],
	"xmax":0,
	"xmin":0,
	"ymax":0,
	"ymin":0,
}
let square = {
	"name": "square",
	"cords": [[-1,-1],[-1,0],[0,-1],[0,0]],
	"actCords": [[-1,-1],[-1,0],[0,-1],[0,0]],
	"orientation": 0,
	"color": "yellow",
	"position":[0,0],
	"xmax":0,
	"xmin":0,
	"ymax":0,
	"ymin":0,
}
let essR = {
	"name": "essR",
	"cords": [[1,-1],[1,0],[0,0],[0,1]],
	"actCords": [[1,-1],[1,0],[0,0],[0,1]],
	"orientation": 0,
	"color": "red",
	"position":[0,0],
	"xmax":0,
	"xmin":0,
	"ymax":0,
	"ymin":0,
}
let essL = {
	"name": "essL",
	"cords": [[0,1],[0,0],[-1,-1],[-1,0]],
	"actCords": [[0,1],[0,0],[-1,-1],[-1,0]],
	"orientation":0,
	"color":"green",
	"position":[0,0],
	"xmax":0,
	"xmin":0,
	"ymax":0,
	"ymin":0,
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
let squareSize = 20
let lastMoveX = 0
let lastMoveY = 0
let canvasWidth = 200
let canvasHeight = 460
let playedCoordinates = []

let pieceMaxMin = () => {
	// currentPiece.xmin, currentPiece.xmax, 
	// currentPiece.ymin, currentPiece.ymax = 0;
	currentPiece.xmin = Math.min(
		currentPiece.actCords[0][0],
		currentPiece.actCords[1][0],
		currentPiece.actCords[2][0],
		currentPiece.actCords[3][0])
	currentPiece.xmax = Math.max(
		currentPiece.actCords[0][0],
		currentPiece.actCords[1][0],
		currentPiece.actCords[2][0],
		currentPiece.actCords[3][0])
	currentPiece.ymin = Math.min(
		currentPiece.actCords[0][1],
		currentPiece.actCords[1][1],
		currentPiece.actCords[2][1],
		currentPiece.actCords[3][1])
	currentPiece.ymax = Math.max(
		currentPiece.actCords[0][1],
		currentPiece.actCords[1][1],
		currentPiece.actCords[2][1],
		currentPiece.actCords[3][1])
}

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
	currentPiece.cords = newCoordinates;
	}

}

let renderGameCanvas = (ctx) => {
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
	currentPiece["cords"].forEach((cord,index) => {
			let pX = position[0]
			let pY = position[1]
			let x = ((cord[0] + pX) *squareSize + Offset)
			let y = ((cord[1] + pY) *squareSize + Offset)
			currentPiece["actCords"][index][0] = x;
			currentPiece["actCords"][index][1] = y;
			ctx.beginPath()
			ctx.rect(x,y,squareSize,squareSize)
			ctx.fillStyle=currentPiece.color
			ctx.fill()
			ctx.stroke()
			ctx.closePath()
	})
	playedCoordinates.forEach(cord =>{
		let x = cord[0]
		let y = cord[1]
		ctx.beginPath()
		ctx.rect(x,y,squareSize,squareSize)
		ctx.fillStyle=cord[2]
		ctx.fill()
		ctx.stroke()
		ctx.closePath();
	})
pieceMaxMin()
}


let newPiece = () => {
	playedPieces.push(pieces[randomProperty(pieces)])
	currentPiece = playedPieces[playedPieces.length -1]
	renderPreviewCanvas();
	renderPiece(previewCtx, currentPiece)


}
newPiece()

let movePiece = (direction) => {
	switch(direction){
		case "left":
		if (currentPiece.xmin > 0) {
			currentPiece.position[0] += -1	
			//renderPiece(gameCtx, currentPiece, currentPiece.position)
		}
		break;
		case "right":
		if (currentPiece.xmax < (canvasWidth - squareSize)) {
			currentPiece.position[0] += 1
			//renderPiece(gameCtx, currentPiece, currentPiece.position)
		}
		break;
		renderPiece(gameCtx, currentPiece, currentPiece.position)
		pieceMaxMin()
		// case "down":
		// currentPiece.position[1] += 1
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

	}


	
	
})
renderGameCanvas()
renderPiece(gameCtx, currentPiece)
renderPiece(previewCtx, currentPiece)

let incrimentPieceMovement = () => {
	if (currentPiece.ymax >= 440) {
		endTurn()
		newPiece()
	// } else if (avoidanceCheck()) {
	// 	endTurn()
	// 	newPiece()	
	} else {
		currentPiece.position[1] += 1;
	}
	renderPiece(gameCtx, currentPiece, currentPiece.position)
}

// let avoidanceCheck = () => {
// 	currentPiece.actCords.forEach(currentCord => {
// 		playedCoordinates.forEach(playedCord => {
// 			let cord1 = currentCord.toString()
// 			let cord2 = [playedCord[0],playedCord[1].toString()]
// 			console.log("cord1: " + cord1 + "cord2: " + cord2)
// 			if(currentCord[0] === playedCord[0] && currentCord[1]+20 === playedCord[1]) {
// 				return true;
// 				console.log("true")
// 			}
// 		})
// 	})
// }

let endTurn = () => {
	let playedCord = []
	currentPiece.actCords.forEach((cord,index) => {
		playedCord = [currentPiece["actCords"][index][0],currentPiece["actCords"][index][1],currentPiece.color]
		playedCoordinates.push(playedCord)

	})
	
}

function gameSpeed(){setTimeout(function(){
	//movePiece("down")
	incrimentPieceMovement();
	pieceMaxMin()
	renderGameCanvas()
	renderPiece(gameCtx, currentPiece, currentPiece.position)
	renderPiece(gameCtx, playedCoordinates, currentPiece.position)
	gameSpeed()
	},1000)}

gameSpeed()


