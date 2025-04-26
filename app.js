const legoSets = [
    { name: "밀레니엄 팔콘", year: 2019, pieces: 7541 },
    { name: "레고 시티 소방서", year: 2020, pieces: 509 },
    { name: "해리포터 호그와트 성", year: 2018, pieces: 6020 },
    { name: "테크닉 부가티 시론", year: 2018, pieces: 3599 }
  ];
  
  const searchInput = document.getElementById('searchInput');
  const resultsDiv = document.getElementById('results');
  
  function displayResults(sets) {
    resultsDiv.innerHTML = '';
    sets.forEach(set => {
      const card = document.createElement('div');
      card.className = 'lego-card';
      card.innerHTML = `
        <h3>${set.name}</h3>
        <p>연도: ${set.year} | 부품 수: ${set.pieces}</p>
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
  
  searchInput.addEventListener('input', searchSets);
  
  // 처음엔 전체 보여주기
  displayResults(legoSets);
  