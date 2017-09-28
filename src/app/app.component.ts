import { Component } from "@angular/core";
import Deck from "./../classes/Deck";
import ICard from "./../interfaces/ICard";

@Component({
	selector: "application",
	templateUrl: "./app.html",
	styleUrls: ["./app.css"]
})
export class AppComponent {
	// write your component code here
	private deck:Deck = new Deck; // get a new deck
	private ownedCards:ICard[] = []; // an array that will hold all the cards owned by the player
	private recentCard:ICard; // the most recently drawn card
	private lifeBarContStyle = {
		'display': 'flex',
		'height.%': 100,
		'justify-content': 'center'
	}
	private lifeBarStyle = { // styles for the life bar
		'height.%': 100,
		'background-color': 'green'
	};

	

	public userPickedCard() { // user draws a card
		this.recentCard = this.deck.drawCard(); // utilize the drawcard function in Deck.ts to draw a card and put it in recentCard
		this.ownedCards.push(this.recentCard); // add the most recent card to the ownedCards array
		this.lifeBarRedraw(this.ownedCards.length)
		//let button:any = document.getElementById('drawButton'); // grab the button from the DOM...
		//if((52-this.ownedCards.length) < 1 ) {button.disabled = true;} // and if theres no cards left (52-cards owned >1), then disable the button
	}

	private lifeBarRedraw(cardsOwned:number) {
		this.lifeBarStyle['height.%'] = (52 - cardsOwned) / 52 * 100; //set the height to the pct of cards left
		if(cardsOwned > 41) {this.lifeBarStyle['background-color']='red';} // if theres only 10 cards left make it red...
		else if(cardsOwned > 31) {this.lifeBarStyle['background-color']='yellow';} // otherwise if theres 20 cards left make it yellow
		else {this.lifeBarStyle['background-color']='green';} // otherwise green
	}

	public userReturnedCard(card, event) { // user returns a card
		// console.log(card, event);
		for (const item of this.ownedCards) { // iterate through all cards
			if(item.rank === card.rank && item.suit === card.suit) { // if the rank and suit of the iteration match the card in hand...
				//console.log(`We have a match with ${item.rank}${item.suit} at index ${this.ownedCards.indexOf(item)}`);
				this.deck.returnCardToDeck(item); //...utilize the returncardtodeck function from Deck.ts to put the card back
				this.ownedCards.splice(this.ownedCards.indexOf(item), 1); // and remove the card from the ownedcards array
				this.lifeBarRedraw(this.ownedCards.length);
			} //end if
		} // end for..of

		//let button:any = document.getElementById('drawButton');
		//if (button.disabled===true) {button.disabled=false;}
	} //end userReturnedCard()

}
