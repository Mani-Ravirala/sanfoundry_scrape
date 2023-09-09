// Initialize an array to store cleaned data
var dataArray = [];
var answerIndex = 0;

// Function to clean up IDs
function cleanID(id) {
  return id.replace(/\s+/g, "").replace(/\./g, "");
}

// Helper function to split content into questions and answers
function splitContent(content) {
  var contentArray = content.split("\n");
  var question = contentArray[0].substr(3);
  var quesno = contentArray[0].slice(0, 2);
  var options = contentArray.slice(1, -1);
  return {
    id: cleanID(quesno),
    question: question,
    options: options,
  };
}

// Process paragraph tags (questions)
var pTags = document
  .getElementsByClassName("entry-content")[0]
  .getElementsByTagName("p");
for (var i = 0; i < pTags.length; i++) {
  var content = pTags[i].textContent.trim();

  // Check if the content is empty
  if (content.length === 0) {
    continue;
  }

  // Check if it's a question (starts with a number)
  if (/^\d+\./.test(content)) {
    dataArray.push(splitContent(content));
  }
}

// Process answer tags (explanations)
var dTags = document
  .getElementsByClassName("entry-content")[0]
  .getElementsByClassName("collapseomatic_content");
for (var i = 0; i < dTags.length; i++) {
  var content = dTags[i].textContent.trim();

  // Check if the content is empty
  if (content.length === 0) {
    continue;
  }

  // Find the corresponding question by matching IDs
  var correspondingQuestion = dataArray[answerIndex];

  if (correspondingQuestion) {
    // Split the answer into answer and explanation
    var [answer, explanation] = content.split("\n");

    // Assign the separated values
    correspondingQuestion.answer = answer ? answer.substring(8) : "";
    correspondingQuestion.explanation = explanation
      ? explanation.substring(13)
      : "";

    answerIndex++;
  }
}


var jsonData = JSON.stringify(dataArray);

// console.log(jsonData);
copyToClipboard(jsonData)

function copyToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  }
  
