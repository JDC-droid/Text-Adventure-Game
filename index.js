class Room {
  constructor(name, img = "") {
    this._name = name;
    this._description = "";
    this._linkedRooms = {};
    this._character = null;
    this._items = [];
    this._roomImage = img;
    this._itemWeight = 0;
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  get character() {
    return this._character;
  }

  get items() {
    return this._items;
  }

  get roomImage() {
    return this._roomImage;
  }

  get itemWeight() {
    return this._itemWeight;
  }

  set name(value) {
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }

  set description(value) {
    if (value.length < 4) {
      alert("Description is too short.");
      return;
    }
    this._description = value;
  }

  set character(value) {
    this._character = value;
  }

  addItem(item) {
    this._items.push(item);
  }

  removeItem(itemName) {
    this._items = this._items.filter(item => item.name !== itemName);
  }

  hasItem(itemName) {
    return this._items.some(item => item.name === itemName);
  }

  describe() {
    let itemDescription = "";
    if (this._items.length > 0) {
      itemDescription = ". In this room, " + this._items.map(item => item.describe().toLowerCase()).join(" and ");
    }
    return this._name + ": " + this._description + itemDescription;
  }

  linkRoom(direction, roomToLink) {
    this._linkedRooms[direction] = roomToLink;
  }

  getDetails() {
    const entries = Object.entries(this._linkedRooms);
    let details = [];
    for (const [direction, room] of entries) {
      let text = room.name + " - " + direction + ".";
      details.push(text);
    }
    return details;
  }

  move(direction, player) {
    if (direction in this._linkedRooms) {
      return this._linkedRooms[direction];
    } else {
      alert("You can't go that way.");
      return this;
    }
  }
}


class Item {
  constructor(name) {
    this._name = name;
    this._description = "";
    this._itemWeight = 0;
  }

  set name(value) {
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }

  set description(value) {
    if (value.length < 4) {
      alert("Description is too short.");
      return;
    }
    this._description = value;
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  get itemWeight() {
    return this._itemWeight;
  }

  set itemWeight(value) {
    this._itemWeight = value;
  }

  describe() {
    return "The " + this._name + " is " + this._description;
  }
}

class Character {
  constructor(name) {
    this._name = name;
    this._description = "";
    this._conversation = "";
  }

  set name(value) {
    this._name = value;
  }

  set description(value) {
    this._description = value;
  }

  set conversation(value) {
    this._conversation = value;
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  get conversation() {
    return this._conversation;
  }

  describe() {
    return "You have met " + this._name + ", who is " + this._description;
  }

  converse() {
    return this._name + " says '" + this._conversation + "'";
  }
}


class Player {
  constructor() {
    this._inventory = [];
    this._inventoryWeight = 415;
    this._currentInventoryWeight = 0;
  }

  updateInventory(item) {
    if (item.itemWeight + this._currentInventoryWeight >= this._inventoryWeight) {
      // too heavy
      alert("Womp Womp, too heavy.");
      startGame();
    } else {
      this._inventory.push(item);
      this._currentInventoryWeight += item.itemWeight;
      return `Berdaderduuuur, ${item.name} has been acquired.`;
    }
  }
  
}


//win condition route's

const middleForest = new Room("Forest of Awakening", "./images/middleForest.jpg");
middleForest.description = "(You hear a whisper): Wake up (You start to maybe listen): Oh for crying out loud wake up, (you fully open your eyes) AHA! there you are!";
const grimoire = new Item("grimoire");
grimoire.description = "A book of imaginable....no...it's empty. I'm sorry I told you about that.";
bookWeight = 4;
grimoire.description = "A book of starting power, if there was any, I'm sorry I told you about that.";
middleForest.addItem(grimoire);

const northForest = new Room("The North Forest", "./images/northForest.jpeg");
northForest.description = "Ah the woods are clearing my little adventurer, you and me, how, cheery? I dont know yet.";

const westForest = new Room("Thick Woodlands");
westForest.description = "I dont know why you chose this way for just look at this place we can barely see here!";
const stick = new Item("The sword of hope");
stick.description = "is this a sword? maybe our lucks turning arou...it's a twig, this is not a good sign.";
westForest.addItem(stick);

const eastForest = new Room("Moor Trees");
eastForest.description = "I dont know about you but the trees are losing their wonder now, where's home? why am I in your head?";

const southForest = new Room("Start of the Fissure");
southForest.description = "This doesn't look safe Adventurer...there's a weird distortion here.";

const tavern = new Room("Tavern");
tavern.description = "(You enter a tavern) Decent place, nice way to socialise.....too bad you're the anti-social type huh silent one.";
const beer = new Item("A lovely beverage (beer)");
beer.description = "OHO HO HOOO, now this I can get behind but uh lets save it for after the adventure yeah?";
tavern.addItem(beer);

const giftBearer = new Room("Gift Merchant");
giftBearer.description = "Oh lets listen to them (The gift Merchant speaks)";
const apple = new Item("apple");
apple._itemWeight = 25;
apple.description = "My gift to you a golden ap...why is it square?";
giftBearer.addItem(apple);
giftBearer.character = new Character("Gift Merchant Lyssandra");
giftBearer.character.description = "Aaagh, Lyssandra, the gift mercant, Legendary, truly a marvelous encounter, could this be our luck showing...your pants are falling...so, uh, maybe not?<br>";
giftBearer.character.conversation = "Oh, Oh my, anyway, hello there, I am the gift merchant of Legend Lyssandra, please take this and be on your way, with your, plummeting pants, I mean, I dont think that's how you make a first impression. Please be careful, it is a heavy apple for certain.";

const distortedForest = new Room("Distorted Forest");
distortedForest.description = "Okay, this place is not right, please tell me you have a plan for this.";

const theVoid = new Room("The Void");
theVoid.description = "nevermind this got worse I thought you had a plan not just KEEP HEADING INTO THE CREEPY AREA! sorry sorry but WHY?!";
const portal = new Item("portal");
portal.description = "It's...a...a..portal?...wait...how did I know that?";
theVoid.addItem(portal);

const bridge = new Room("Bridge of, well a bridge");
bridge.description = "well at least we got to the bridge, next step the kingdom am i right? Why am I asking you, you're not gonna answer me.";

const kingdomGate = new Room("The Gate", "./Kingdom.Gate.jpeg");
kingdomGate.description = "Why is there an ogre infront of the Gate? asleep?... We dont have gear to fight this thing or do anything really. what do we do?";
const ogre = new Item("Shargoth the Destroyer");
kingdomGate.character = new Character("Shargoth the Destroyer");
kingdomGate.character.description = "Shargoth the destroyer, the demon kings mightiest warrior, what are they doing here? of all things...";
ogre.description = "DID YOU JUST PICK UP AND STORE AN OGRE? WHO ARE YOU? WHAT ARE YOU?....you know what? forget it.";
kingdomGate.addItem(ogre);


const kingdom = new Room("Kingdom of Aurum Plateis");
kingdom.description = "You know for the place called kingdom of gold streets it sure looks rough here.";

const mainHall = new Room("The Great Hall");
mainHall.description = "This is it kid, the last walk of triumph only ones here are the knights, waiting for a new ruler, let's go get that throne.";

const throneRoom = new Room("The Golden Throne");
throneRoom.description = "There it is the Golden Throne...not to be mistaken with the porcelain one ha ha aaaahhh.. ahem....anyway...doesn't look comfy but hey that's why they have cushions right?";

const throne = new Room("Glad to of made it");
throne.description = "well thats it my friend, me and you all the way to the end, been good hasn't it? well, guess I will leave you with your achievemnt's, put that crown on, rule this place, you dont need me anymore. so long pal.";
const crown = new Item("crown");
crown.description ="Well, Good Job friend, well done.";
throne.addItem(crown);
throne.character = new Character("King of Aurum Plateis");
throne.character.description = "King of Aurum Plateis, the one and only, d@*&head, whoops sorry forgot this was PG rated. but no he Is a d#!£.";
throne.character.conversation = "YOOOOOOOOOUUUUU! GET OFF MY THRONE! WHO EVEN ARE YOU?! YOU SAD EXCUSE FOR A PEASANT! YOU DISHEVELED CRETIN! YOU ABSOLUTE NOBODY! I AM THE RULER NOT YOU! I AM THE KING! THE POWERFUL! THE MIGHTY! THE ONLY ONE WHO MATTERS!"

const TheKing = new Room("The King");
TheKing.description = "(The King walk's closer) <strong>YOU ABSOLUTE WASTE OF MY TIME! I NEED YOU TO GET OUT OF MY SEAT! LEAVE! YOU DON'T BELONG! GO, AWAY!</strong> pssst adventurer, we might want to do as he says and leave you know. come on we can find another way."
const king = new Item("King");
king.description = "well this is definiteley the king, I will tell you that, you enjoy meeting him?";
TheKing.addItem(king);

// death route's

const ewForest = new Room ("The wildlife of the forest");
ewForest.description = "Wolves, why is it always wolves?...this is a goodbye, we barely even got anywhere.";

const esForest = new Room("KNOCKOUT 1!");
esForest.description = "you RAN INTO A TREE, and you're out cold... for f..(you fade out of consciousness)";

const eeForest = new Room("ADVENTURE!");
eeForest.description = "I swear we passed that tree like five minutes ago...where are we....(50 days pass, you fall over from hunger)... we are done for kid, you just could'nt find civilisation we were this clo..hey HEY DO (you fall asleep for the final time)";

const wsForest = new Room("Sweet View!");
wsForest.description = "(You stumble and fall into a lake) of all the lakes you picked the one with rapids, RAPIDS! (you feel the air leaving your body as you submerge) This is a horrible way for this to end.";

const wwForest = new Room("Time for a rest");
wwForest.description = "(You take a rest on a very comfy, warm rock) This is nice we have sun, we have comfort, we have earthquakes. Wait...Earthquakes?! (You feel the giant boulder move from under you) This Isn't good kid. (The golem lifts its arm) Mommy? (The Golem flattens you with one tremendous slam)";

const weForest = new Room("Out of all the spots Amazing.");
weForest.description = "(You trip on a banana peal) Seriously...of all things...god I hate the wildlife in this area (You feel nauseous) oooo you got blood from your head you oka...(You fade out of consciousness)";

const seForest = new Room("The Warm Forest");
seForest.description = "(You feel a cuddly, embracing warmth of the heat around you comfort your soul) The weathers so nice here. (You lay back on the long grass) I think we could get used to this dont you? (Hours pass, you feel a presence)"

//sn returns to start

//Bridge South back to start

const bridgeW = new Room("Oh look!");
bridgeW.description = "(You lean over the edge of the bridge too far and fall) NO, NO ,NO.....aaahhhh why'd you have to go and do that? (You get taken down stream and become lost)";

//not a death but a return to bridge condition
const bridgeE = new Room("Ah the east");
bridgeE.description = "Alright, look at that view very peaceful, yeah, could take this in all day.....Too bad we are busy, let's get a move on come on.";

const seVoid = new Room("The Open Vault");
seVoid.description = "(A cascading vault tower's above you, the door already cracked open) This is weird (You approach closer to the vault) Hey...listen here, there's two of us, come on now (You enter the vault and get dragged, distorted, stretched, manipulated to the atom) WhHHaEAttaeeAAIITTT WHhhhYYyy DiiiddDDidId YooUUUuIOuyerftsy dODODooeerRR Thatwtahstdefatth.";

const swVoid = new Room("The Nothing");
swVoid.description = "(You enter a fragmented realm that suddenly settles, white, nothing, just like the start of the universe) Where...where are we? what is this? (2 decades pass in a mere 24 hours) Traveler...why are we alive here? what is this? why are we here? there's no way out? (The voice in your head has lost it all their reason, their will, you evently fall into the same pit insane, you are existing but lost and found, nothing.";

//swNorth return to start condition also
const swNorth = new Room("The Crystal");
swNorth.description = "(Walking forward a desirable looking crystal is in your path, purple, shiny, valuable?) I wonder what this is (You touch the Crystal, it's power forces you back to the forest forest propelling you backwards, you land winded back to your start destination)";

const wKingdom = new Room("Explore");
wKingdom.description = "(Walking West of the castle you enter a gloomy, dark, dissorienting maze of alley ways) Oh look! (As you hear the voice in your head depict you look....you are stabbed in the back by a dagger and then you're robbed, left to bleed out in the alley, they don't call you misfortunate for nothing) damn.";

const alley = new Room("The Depth's Alley");
alley.description = "(You enter a dark mist) Dead?! DEAD?! We were THIIIS close come oooon!"

const ko1 = new Room("K.O!!!");
ko1.description = "(You lay there fading) YOU GOT KNOCKED THE F OUT MAN...sorry just watched that movie called friday....I'll...I'll be here all week...you wont, but I will.";

const hunger = new Room("The Hunger");
hunger.description = "(You succumb to your hunger and begin to fall) Hey...Hey...Heeeeeeey...okay (your eyes close)";

const rock = new Room("Dwayne the Rock Golem");
rock.description = "So, here we are pancake, we ran into Dwayne, how we feeling, I'll tell you, I feel pretty crushed right now.";

const water = new Room("Glorious Water");
water.description = "you know human's are like 60% to 70% water so we should be right at home.....IF YOU COULD SWIM!!";

const banana = new Room("a damn BANANA!!!")
banana.description = "Well done, you were killed by a food item, a food...item, this isn't that movie sausage party, this one didn't even fight back.";

//This is encrypted to a Ceaser Cipher of 12
const rearranged = new Room("Mfay Dq-mddmzsqyqzf");
rearranged.description = "Nqmgfurgx, Kag saf agd itaxq nquzs dq-mddmzsqp....U tmfq, kag, U xuqp...za U pupz'f.....U'p eiqmd ngf qhqz qzodkbfqp uy zaf mxxaiqp £@*% KAG.....eqq.";

const quiet = new Room("The Quiet");
quiet.description = "This, well at least its peaceful (1 hour of silence passes) huh, tick tock tick tock. (2 hours) It's too quiet (75 hours pass) AAAHHHHHHH......this sucks (cuts to you as a skeleton)";

const necromancers = new Room("The Necromancers of the Nihilistic Regime");
necromancers.description = "(someone or something starts taking your limbs away) huh? uuuuhhhh we are getting harvested for right now? WAKE UP! WEEWOOWEEWOOWEEWOO!!! HEY! (You fail to wake and you are used to make potions of mana for the NecromancerS)";

const troll = new Room("Back to the Forest");
troll.description = "(you go to walk back to the forest) alright maybe we missed some loot. (You trip and fall knocking yourself out on the bridge) really? really?";

//not a loss just a room
const view = new Room("The Other View");
view.description = "(You walk over to a bench on the bridge overlooking the beautiful view of the outer village and all the incredible surrounding nature) This is nice, take a moment as long as you need.";


//Start room linking here
middleForest.linkRoom("north", northForest);
middleForest.linkRoom("south", southForest);
middleForest.linkRoom("west", westForest);
middleForest.linkRoom("east", eastForest);

westForest.linkRoom("north", tavern);
westForest.linkRoom("south", wsForest);
westForest.linkRoom("west", wwForest);
westForest.linkRoom("east", weForest);

eastForest.linkRoom("north", giftBearer);
eastForest.linkRoom("south", esForest);
eastForest.linkRoom("west", ewForest);
eastForest.linkRoom("east", eeForest);

southForest.linkRoom("west", seVoid);
southForest.linkRoom("south", distortedForest);
southForest.linkRoom("east", seForest);
southForest.linkRoom("north", swVoid);

wwForest.linkRoom("west",  rock);
wsForest.linkRoom("south", water);
weForest.linkRoom("east", banana);
esForest.linkRoom("south", ko1);
eeForest.linkRoom("north", hunger);

seVoid.linkRoom("east", rearranged);
seVoid.linkRoom("west", swNorth);
distortedForest.linkRoom("south", theVoid);
swVoid.linkRoom("west", quiet);
seForest.linkRoom("north", necromancers);

swNorth.linkRoom("back", middleForest);

bridgeE.linkRoom("next",view );

northForest.linkRoom("south", middleForest);
northForest.linkRoom("north", bridge);

bridge.linkRoom("north", kingdomGate);
bridge.linkRoom("west", bridgeW);
bridge.linkRoom("east", bridgeE);
bridge.linkRoom("back", troll);


kingdomGate.linkRoom("north", kingdom);
kingdom.linkRoom("north", mainHall);
wKingdom.linkRoom("north", alley);
mainHall.linkRoom("north", throneRoom);
throneRoom.linkRoom("north", throne);
throne.linkRoom("north", TheKing);

const originalRoomItems = new Map();
originalRoomItems.set(middleForest, [grimoire]);
originalRoomItems.set(westForest, [stick]);
originalRoomItems.set(tavern, [beer]);
originalRoomItems.set(giftBearer, [apple]);
originalRoomItems.set(theVoid, [portal]);
originalRoomItems.set(kingdomGate, [ogre]);
originalRoomItems.set(throne, [crown]);
originalRoomItems.set(TheKing, [king]);

//Main game function's here
let currentRoom = middleForest;
let player = new Player();
let playerInventory = [];
let playerAlive = Player._alive;
let currentInventoryWeight = 0;

function displayRoomInfo(room) {
  const textArea = document.getElementById("text");
  const imageArea = document.getElementById("image");

  let occupantMsg = "";
  if (room.character) {
    occupantMsg = room.character.describe() + "<br>" + room.character.converse();
  }

  const description = room.describe();
  const details = room.getDetails().join("<br>");
  const inventory = playerInventory.length > 0 
  ? playerInventory.map(item => item.name).join(", ") 
  : "empty";

  imageArea.src = room.roomImage;
  imageArea.alt = room.name;

  textArea.innerHTML = `
    <p>${description}</p>
    <p>${occupantMsg}</p>
    <p>${details}</p>
    <p>Your inventory: ${inventory}</p>
  `;
}



function collectItem(itemName) {
  const item = currentRoom.items.find(i => i.name.toLowerCase() === itemName.toLowerCase());
  if (item) {
    currentRoom.removeItem(itemName);
    playerInventory.push(item);
    return true;
  }
  return false;
}


function checkWinCondition() {
  const requiredItems = ["portal"];
  return requiredItems.every(item => playerInventory.some(i => i.name === item));
}

function checkSecondWinCondition() {
  const requiredItems = ["crown"];
  return requiredItems.every(item => playerInventory.some(i => i.name === item));
}

function checkThirdWinCondition() {
  const requiredItems = ["King"]
  return requiredItems.every(item => playerInventory.some(i => i.name === item));
}

function goToMiddleForest() {
  currentRoom = middleForest;
  displayRoomInfo(currentRoom);
}


function startGame() {
  currentRoom = middleForest;
  displayRoomInfo(currentRoom);

  const inputBox = document.getElementById("usertext");

  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      const command = inputBox.value.trim().toLowerCase();
      const directions = ["north", "south", "east", "west"];

      const output = document.getElementById("text");

      if (directions.includes(command)) {
        currentRoom = currentRoom.move(command);
        displayRoomInfo(currentRoom);
      } else if (command.startsWith("collect ")) {
        const itemName = command.replace("collect ", "");
        if (collectItem(itemName)) {
          output.innerHTML += `<p>You collected the ${itemName}!</p>`;
          if (checkWinCondition()) {
            output.innerHTML += `<p> We... where are we? this isn't our realm...what is this?.....<br><strong>You win!</strong></p>`;
            inputBox.disabled = true;
          } else if (checkSecondWinCondition()) {
            output.innerHTML += `<p>HAHA! SCREW YOU F@#%WIT WE WIN YOU ARE NO LONGER KING WE GOT THE CROWN YOU DON'T HAHAAAAA!<br><br><strong>You win!</strong></p>`;
            inputBox.disabled = true;
          } else if (checkThirdWinCondition()) {
            output.innerHTML += `<p>Uuuuuuuuh how in the f@£$..... you know what nevermind. <br><br><strong>You win!</strong></p>`;
            inputBox.disabled = true;
          }
        } else {
          output.innerHTML += `<p>There's no ${itemName} here to collect.</p>`;
        }
      } else {
        output.innerHTML += `<p>Unknown command.</p>`;
      }

      inputBox.value = "";
    }
  });
}


// Start the game on page load
window.onload = startGame;

document.getElementById("restart").addEventListener("click", function(event) {
  event.preventDefault();

  // Clear player's inventory
  playerInventory = [];

  // Reset item arrays in all rooms to original state
  for (const [room, items] of originalRoomItems.entries()) {
    room._items = [...items]; // Clone original array
  }

  // Reset and start game again
  currentRoom = middleForest;
  displayRoomInfo(currentRoom);
});