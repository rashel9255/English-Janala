const loadLessons = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res =>res.json())
    .then(json => displayLessons(json.data));
}

const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayLevelWord(data.data));
}

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = "";

    if(words.length === 0){
        wordContainer.innerHTML = `
            <div class="text-center col-span-full py-10 rounded-xl space-y-6 font-bangla">
            <img class="mx-auto" src="assets/alert-error.png">
            <p class="text-xl font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="text-4xl font-bold">নেক্সট Lesson এ যান</h2>
        </div>
        `;
    }

    words.forEach(word => {
        const card = document.createElement('div');
        card.innerHTML = `
            <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="font-bold text-2xl">${word.word ? word.word : "Word is not found"}</h2>
            <p class="font-semibold">Meaning/Pronounciation</p>
            <div class="text-2xl font-medium font-bangla">"${word.meaning ? word.meaning : "Meaning is not found"} / ${word.pronunciation ? word.pronunciation : "Pronounciation is not found"}</div>
            <div class="flex justify-between items-center">
                <button type="button" class="btn bg-[#1A91FF1A] hover:bg-[#1A91FF]" aria-label="More information"><i class="fa-solid fa-circle-info"></i></button>
                <button type="button" class="btn bg-[#1A91FF1A] hover:bg-[#1A91FF]" aria-label="More information"><i class="fa-solid fa-volume-high"></i></button>

            </div>
        </div>
        `;
        wordContainer.appendChild(card);
    })
}

const displayLessons = (lessons) =>{
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = '';

    lessons.forEach(lesson => {
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML =/*html*/`
            <button onClick = "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary"> 
                <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}
            </button>
        `;

        levelContainer.appendChild(btnDiv);
    })
}
loadLessons();