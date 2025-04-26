// API 키와 URL 설정
const API_KEY = 'ca9d8006e5a8af186676e1f0bf656677'; // Rebrickable API 키를 여기에 입력하세요.
let currentPage = 1;
const pageSize = 50;  // 한 번에 불러올 최대 결과 수 (50개)

async function handleSearch() {
  const query = document.getElementById('searchQuery').value.trim();
  if (!query) {
    alert("검색어를 입력해주세요.");
    return;
  }

  currentPage = 1; // 새 검색 시 첫 페이지로 리셋
  searchLegoSets(query);  // 검색 함수 호출
}

// API에서 데이터 요청 후 결과를 처리하는 함수
async function searchLegoSets(query) {
  const url = `https://rebrickable.com/api/v3/lego/sets/?search=${encodeURIComponent(query)}&page_size=${pageSize}&page=${currentPage}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `key ${API_KEY}`
      }
    });

    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status}`);
    }

    const data = await response.json();
    console.log("🔵 API 응답 데이터:", data); // 응답 데이터 확인
    displayResults(data.results); // 검색 결과 화면에 출력
    toggleNextPageButton(data.count); // "다음 페이지" 버튼 표시 여부 결정
  } catch (error) {
    console.error("🔴 에러 발생:", error);
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `<p>검색 중 에러가 발생했습니다. 다시 시도해주세요.</p>`;
  }
}

// 검색 결과를 화면에 표시하는 함수
function displayResults(sets) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = ''; // 이전 결과 초기화

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

// "다음 페이지" 버튼을 표시할지 여부를 결정하는 함수
function toggleNextPageButton(totalCount) {
  const nextPageButton = document.getElementById('nextPageButton');
  nextPageButton.style.display = (currentPage * pageSize < totalCount) ? 'block' : 'none';
}

// "다음 페이지" 버튼 클릭 시 호출되는 함수
function nextPage() {
  const query = document.getElementById('searchQuery').value.trim();
  if (!query) return;

  currentPage++;  // 페이지 증가
  searchLegoSets(query);  // 다음 페이지 결과 불러오기
}
