const createElements = (arr) => {
  const htmlElements = arr.map((el) => `<span class = "btn">${el}</span>`);
  return htmlElements.join(' ');
}


function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}


const manageSpinner = (status) => {
  if(status === true){
    document.getElementById('spinner').classList.remove('hidden');
    document.getElementById('word-container').classList.add('hidden');
  }else{
    document.getElementById('spinner').classList.add('hidden');
    document.getElementById('word-container').classList.remove('hidden');
  }
}

const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLessons(json.data));
};

const removeActive = () =>{
    const lessonButtons = document.querySelectorAll(".lesson-btn");
    lessonButtons.forEach( button => {
        button.classList.remove("active");
    })
}

const loadLevelWord = (id) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
        removeActive();
        const clickBtn = document.getElementById(`lesson-btn-${id}`);
        clickBtn.classList.add("active");
        displayLevelWord(data.data);


    });
};

const loadWordDetail = async(id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data);
}

const displayWordDetails = (word) => {
  const detailsBox = document.getElementById('details-container');
  detailsBox.innerHTML = `
                <div class="">
                    <h2 class="text-2xl font-bold">${word.word} ( <i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h2>
                </div>
                <div>
                    <h3 class="font-bold">Meaning</h3>
                    <p>${word.meaning}</p>
                </div>
                <div>
                    <h3 class="font-bold">Example</h3>
                    <p>${word.sentence}</p>
                </div>
                <div>
                    <h3 class="font-bold">সমার্থক শব্দ গুলো</h3>
                    <div>
                        ${createElements(word.synonyms)}
                    </div>
                 </div>
  `;
  document.getElementById('word_modal').showModal();;
}


const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length === 0) {
    wordContainer.innerHTML = `
            <div class="text-center col-span-full py-10 rounded-xl space-y-6 font-bangla">
            <img class="mx-auto" src="assets/alert-error.png">
            <p class="text-xl font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="text-4xl font-bold">নেক্সট Lesson এ যান</h2>
        </div>
        `;
  }

  words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="font-bold text-2xl">${word.word ? word.word :    "Word is not found"}
            </h2>
            <p class="font-semibold">Meaning/Pronounciation</p>
            <div class="text-2xl font-medium font-bangla">"${
            word.meaning ? word.meaning : "Meaning is not found"
            } / ${
            word.pronunciation ? word.pronunciation : "Pronounciation is not found"
            }
        </div>
        <div class="flex justify-between items-center">
            <button onclick="loadWordDetail(${word.id})" type="button" class="btn bg-[#1A91FF1A] hover:bg-[#1A91FF]" aria-label="More information"><i class="fa-solid fa-circle-info"></i></button>

            <button onclick="pronounceWord('${word.word}')" type="button" class="btn bg-[#1A91FF1A] hover:bg-[#1A91FF]" aria-label="More information"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `;
    wordContainer.appendChild(card);
  });
  manageSpinner(false);
  return;
};

const displayLessons = (lessons) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  lessons.forEach((lesson) => {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
            <button id = "lesson-btn-${lesson.level_no}" onClick = "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"> 
                <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}
            </button>
        `;

    levelContainer.appendChild(btnDiv);
  });
};
loadLessons();

document.getElementById('btn-search').addEventListener('click', () =>{
  removeActive();
  const searchValue = document.getElementById('input-search').value.trim().toLowerCase();

  const url = `https://openapi.programming-hero.com/api/words/all`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const  allWords = data.data;
      const filterWords = allWords.filter(word => word.word.toLowerCase().includes(searchValue));
      
      displayLevelWord(filterWords);
    });

    
})
