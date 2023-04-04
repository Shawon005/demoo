var contentArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
localStorage.clear();
flashcards.innerHTML = '';
contentArray = [];
document.getElementById("save_card").addEventListener("click", () => {
  addFlashcard();
});
document.getElementById("show_card").addEventListener("click", () => {
  showFlashcard();
});

document.getElementById("delete_cards").addEventListener("click", () => {
  if (flashcards.hasChildNodes()) {
    flashcards.removeChild(flashcards.lastChild)
    localStorage.clear();
  } 
});

document.getElementById("show_card_box").addEventListener("click", () => {
  document.getElementById("create_card").style.display = "block";
  document.getElementById("empty_card").style.display = "none";
});
document.getElementById("make_new").addEventListener("click", () => {
  document.getElementById("create_card").style.display = "block";
  document.getElementById("empty_card").style.display = "none";
});
  

flashcardMaker = (text) => {
  const flashcard = document.createElement("div");
  const question = document.createElement('h2');
  const answer = document.createElement('h2');
  const editBtn= document.createElement('button');
  
  flashcard.className = 'flashcard';

  question.setAttribute("style", "border-top:1px solid red; padding: 15px; margin-top:30px");
  question.textContent = text.my_question;

  answer.setAttribute("style", "text-align:center; display:none; color:black");
  answer.textContent = text.my_answer;
   
  editBtn.setAttribute("style", " padding: 15px; margin-top:100px; ");
  
  flashcard.appendChild(question);
  flashcard.appendChild(answer);
  flashcard.appendChild(editBtn);

  flashcard.firstElementChild.addEventListener("click", () => {
    if(answer.style.display == "none")
      answer.style.display = "block";
    else
      answer.style.display = "none";
  });
  flashcard.lastElementChild.addEventListener("click", () => {
      document.getElementById("create_card").style.display = "block";
      document.getElementById("empty_card").style.display = "none";
     
      const qu = document.querySelector("#question");
      qu.value=text.my_question
      const an = document.querySelector("#answer");
      an.value=text.my_answer;
      flashcards.removeChild(flashcard);
      
  });
  let colorinput=document.querySelector("#color")
  colorinput.addEventListener('input',()=>{
  let color=colorinput.value;
   flashcard.style.backgroundColor=color;
  });
  let color=colorinput.value;
  flashcard.style.backgroundColor=color;

  document.querySelector("#flashcards").appendChild(flashcard);
  
}

contentArray.forEach(flashcardMaker);

addFlashcard = () => {
  const question = document.querySelector("#question");
  const answer = document.querySelector("#answer");
   

  let flashcard_info = {
    'my_question' : question.value,
    'my_answer'  : answer.value
    
  }

  contentArray.push(flashcard_info);
  localStorage.setItem('items', JSON.stringify(contentArray));
  if(question.value==""){ 
    alert('Enter the Question please!!!')
  }
  else if (answer.value=="") {
     alert('Enter the Answer please!!!')
  } else {
    flashcardMaker(contentArray[contentArray.length - 1]);
    question.value = "";
    answer.value = "";
  }
}
showFlashcard = () =>{
  var list = document.getElementById("flashcards");
  if(list.hasChildNodes()){
  document.getElementById("create_card").style.display = "none";
  document.getElementById("empty_card").style.display = "none";
  }
  else
  {
    document.getElementById("empty_card").style.display = "block";
    document.getElementById("create_card").style.display = "none";
  }
  
}
