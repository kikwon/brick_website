const legoSets = [
  { name: "밀레니엄 팔콘", year: 2019, pieces: 7541, img: "https://images.unsplash.com/photo-1617610382244-55cf40ef1ec4" },
  { name: "레고 시티 소방서", year: 2020, pieces: 509, img: "https://images.unsplash.com/photo-1600334129128-18b43e74f6d5" },
  { name: "호그와트 성", year: 2018, pieces: 6020, img: "https://images.unsplash.com/photo-1606813909025-29a212c6d3b8" },
  { name: "부가티 시론", year: 2018, pieces: 3599, img: "https://images.unsplash.com/photo-1583523151252-6e3f6f3cfa2f" }
];

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resultsDiv = document.getElementById('results');

function displayResults(sets) {
  resultsDiv.innerHTML = '';
  sets.forEach(set => {
    const card = document.createElement('div');
    card.className = 'lego-card';
    card.innerHTML = `
      <img src="${set.img}" alt="${set.name}">
      <h3>${set.name}</h3>
      <p>연도: ${set.year} <br> 부품 수: ${set.pieces}</p>
    `;
    resultsDiv.appendChild(card);
  });
}

function searchSets() {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredSets = legoSets.filter(set => 
    set.name.toLowerCase().includes(searchTerm)
  );
  displayResults(filteredSets);
}

searchBtn.addEventListener('click', searchSets);
searchInput.addEventListener('keyup', function(event) {
  if (event.key === "Enter") {
    searchSets();
  }
});

// 처음에는 전체 세트 보여주기
displayResults(legoSets);
