/* creates a div container with the given tutorial as its child, formatted correclty*/ 
function createTutorialDiv(tutorial) {
    var tutorialDiv = document.createElement("div");
    tutorialDiv.setAttribute("class","tutorial");

    var tempElement = document.createElement("h1");
    tempElement.setAttribute("class", "title");
    tempElement.appendChild(document.createTextNode(tutorial.title));
    tutorialDiv.appendChild(tempElement);


    tempElement = document.createElement("p");
    tempElement.setAttribute("class", "stars inner");
    if (tutorial.stars == 0) {
        tempElement.appendChild(document.createTextNode(""));
    }
    else {
        tempElement.appendChild(document.createTextNode("Stars: " +tutorial.stars));
    }
    tutorialDiv.appendChild(tempElement);

    tempElement = document.createElement("p");
    tempElement.setAttribute("class", "day inner");
    tempElement.appendChild(document.createTextNode(tutorial.day));
    tutorialDiv.appendChild(tempElement);
    
    tempElement = document.createElement("p");
    tempElement.setAttribute("class", "room inner");
    tempElement.appendChild(document.createTextNode(tutorial.room));
    tutorialDiv.appendChild(tempElement);

    return tutorialDiv;
}
