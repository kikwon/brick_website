const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resultsDiv = document.getElementById('results');

const API_KEY = "ca9d8006e5a8af186676e1f0bf656677"; // ⭐️⭐️⭐️

async function searchLegoSets(query) {
  const url = `https://rebrickable.com/api/v3/lego/sets/?search=${encodeURIComponent(query)}&page_size=10`;

  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `key ${API_KEY}`
      }
    });

    if (!response.ok) {
      throw new Error('API 요청 실패: ' + response.status);
    }

    const data = await response.json();
    displayResults(data.results);
  } catch (error) {
    console.error('에러 발생:', error);
    resultsDiv.innerHTML = `<p>검색 중 에러가 발생했습니다. 다시 시도해주세요.</p>`;
  }
}

function displayResults(sets) {
  resultsDiv.innerHTML = '';

  if (sets.length === 0) {
    resultsDiv.innerHTML = '<p>검색 결과가 없습니다.</p>';
    return;
  }

  sets.forEach(set => {
    const card = document.createElement('div');
    card.className = 'lego-card';
    card.innerHTML = `
      <img src="${set.set_img_url || 'https://via.placeholder.com/200'}" alt="${set.name}">
      <h3>${set.name}</h3>
      <p>Set Number: ${set.set_num}<br> Pieces: ${set.num_parts}</p>
    `;
    resultsDiv.appendChild(card);
  });
}

function handleSearch() {
  const query = searchInput.value.trim();
  if (query) {
    searchLegoSets(query);
  }
}

searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keyup', function(event) {
  if (event.key === "Enter") {
    handleSearch();
  }
});

// 사이트 처음 열었을 때 기본 검색어
searchLegoSets('star wars');
