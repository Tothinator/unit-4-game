var obiWan = {
    id: "obi-wan",
    name: "Obi-Wan Kenobi",
    imgLink: "assets/images/obiWan.jpg",
    health: 120,
    counterAttack: 15,
    background: "white",
    currentAttack: 7,
    textColor: "black",
};

var darthSidious = {
    id: "darth-sidious",
    name: "Darth Sidious",
    imgLink: "assets/images/darthSidious.jpg",
    health: 150,
    counterAttack: 20,
    background: "white",
    currentAttack: 6,
    textColor: "black",
};

var lukeSkywalker = {
    id: "luke-skywalker",
    name: "Luke Skywalker",
    imgLink: "assets/images/lukeSkywalker.jpg",
    health: 100,
    counterAttack: 10,
    background: "white",
    currentAttack: 8,
    textColor: "black",
};

var darthMaul = {
    id: "darth-maul",
    name: "Darth Maul",
    imgLink: "assets/images/darthMaul.jpg",
    health: 180,
    counterAttack: 25,
    background: "white",
    currentAttack: 5,
    textColor: "black",
};

var characters = [obiWan, lukeSkywalker, darthMaul, darthSidious]

$(document).ready(function() {
    for (var i = 0; i < characters.length; i++) {
        var characterDiv = $("<div>");
        characterDiv.addClass("text-center character-container col-3")
        characterDiv.id = characters[i].id;
        characterDiv.append($("<p>").text(characters[i].name));
        characterDiv.append($("<img>").attr("src", characters[i].imgLink));
        characterDiv.append($("<p>").text(characters[i].health));

        $("#starting-character-container").append(characterDiv);
    }
});