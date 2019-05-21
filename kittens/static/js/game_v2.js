//get canvas
var c = document.getElementById("play_area");

var deck = [];
var my_hand = [];
var opponent_hand = [];

var card_images = {
    "attack": "../static/images/attack.png",
    "drawfrombottom": "../static/images/drawfrombottom.png",
    "favor": "../static/images/favor.png",
    "shuffle": "../static/images/shuffle.png",
    "skip": "../static/images/skip.png",
    "diffuse": "../static/images/diffuse.png"
}

var make_card = function(type){
    var card = document.createElementNS("http://www.w3.org/2000/svg", "image");
    card.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href", "../static/images/backcard.png");
    card.setAttribute("width",200);
    card.setAttribute("height",200);
    card.setAttribute("x", 0);
    card.setAttribute("y", 200);
    card.setAttribute("type", type)
    return card
};

var shuffle = function(array){
    var i, j, temp;
    
    for (i = array.length - 1; i > 0; i -= 1) {
	j = Math.floor(Math.random() * (i + 1))
	temp = array[i]
	array[i] = array[j]
	array[j] = temp
    }
};

var make_deck = function(){
    var types = [
	"attack",
	"drawfrombottom",
	"favor",
	"shuffle",
	"skip"
    ]
    for (i = 0; i < 5; i+=1){
	var type = types[i];
	for (j = 0; j < 4; j+=1){
	    card = make_card(type);
	    deck.push(card)
	}
    }

    var diffuse = make_card("diffuse", "../static/images/diffuse.png");
    deck.push(diffuse);
};

var setup = function(){
    make_deck();
    shuffle(deck);
    console.log(deck);
    make_my_hand();
    make_opponent_hand();
    for (i = 0; i < deck.length; i+=1){
	var card = deck[i];
	c.appendChild(card);
    }
    for (i = 0; i < my_hand.length; i+=1){
	var card = my_hand[i];
	c.appendChild(card);
	card = opponent_hand[i];
	c.append(card);
    }
};

var make_my_hand = function(){
    for (i = 0; i < 5; i+=1){
	if (i == 0){
	    card = make_card("diffuse");
	}
	else{
	    var card = deck.pop();
	}
	card.setAttribute("x", 100 + i*200);
	card.setAttribute("y", 400);

	var type = card.getAttribute("type");
	
	card.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href", card_images[type]);
	//card.addEventListener("click", move);
	card.addEventListener("mouseover", hover);
	card.addEventListener("mouseleave", reset_position);
	card.addEventListener("click", move_center);
	my_hand.push(card);
    };
};

var make_opponent_hand = function(){
        for (i = 0; i < 5; i+=1){
	if (i == 0){
	    card = make_card("diffuse", "../static/images/diffuse.png");
	}
	else{
	    var card = deck.pop();
	}
	card.setAttribute("x", 100 + i*200);
	card.setAttribute("y", 0);
	my_hand.push(card);
    };

};

var draw = function(e){
    var card = deck.pop();
    var card = e.target;
    my_hand.push(card);
    var type = card.getAttribute("type");
    card.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href", card_images[type]);
}

var arrange_cards = function(){

}

var hover = function(e){
    var requestID = 0;
    var card = e.target;
    console.log(e);
    var current = 0;
    var shift = function(){
	c.removeChild(card);
	prev = Number(card.getAttribute("y"));
	card.setAttribute("y", prev-5);
	c.appendChild(card);
	//cancel before animating in case  clicked multiple times
	window.cancelAnimationFrame(requestID)
	requestID = window.requestAnimationFrame(shift);
	if (prev<370){
	    window.cancelAnimationFrame(requestID);
	};
    }

    shift();
}

var reset_position = function(e){
    var card = e.target;
    card.setAttribute("y", 400);
    
}

var move_center = function(e){
    var requestID = 0;
    card = e.target;
    var place = function(){
	c.removeChild(card);
	var prev_y = Number(card.getAttribute("y"));
	var prev_x = Number(card.getAttribute("x"));

	var x_inc = (500 - prev_x)/10;
	var y_inc = (200 - prev_y)/10;

	card.setAttribute("y", prev_y + y_inc);
	card.setAttribute("x", prev_x + x_inc);
	c.appendChild(card);
	//cancel before animating in case  clicked multiple times
	window.cancelAnimationFrame(requestID)
	requestID = window.requestAnimationFrame(place);
	if (prev_y < 201 ){
	    window.cancelAnimationFrame(requestID);
	};
    }
    place();
    card.removeEventListener("mouseover", hover);
    card.removeEventListener("mouseleave", reset_position);
    card.removeEventListener("click", move_center);

}


setup();