const recommendRecipes = [
  {
    id: 1,
    title: "김치볶음밥",
    description: "잘 익은 김치와 계란으로 만드는 간단하고 든든한 한 그릇",
    image: "./images/kimchi-rice.png",
    time: 15,
    difficulty: "쉬움",
    tags: ["김치", "계란", "밥"],
  },

  {
    id: 2,
    title: "감자채계란전",
    description: "채 썬 감자와 계란을 노릇하게 부쳐 만드는 바삭한 한 끼",
    image: "./images/potato-egg-pancake.png",
    time: 20,
    difficulty: "쉬움",
    tags: ["감자", "계란", "양파"],
  },

  {
    id: 3,
    title: "감자채볶음",
    description: "감자와 양파를 함께 볶아 만드는 담백하고 간단한 반찬",
    image: "./images/stir-fried-potato.png",
    time: 15,
    difficulty: "쉬움",
    tags: ["감자", "양파", "대파"],
  },
];

const recommendList = document.querySelector("#recommend-list");

function renderRecommendRecipes() {
  // 기존 카드 비우기
  recommendList.textContent = "";

  // 레시피 하나씩 꺼내기
  recommendRecipes.forEach((recipe) => {
    // article 태그 만들기
    const card = document.createElement("article");

    card.className = "recommend-card";

    // 카드 내용 만들기
    card.innerHTML = `
      <img
        src="${recipe.image}"
        alt="${recipe.title}"
        class="recommend-image"
      >

      <div class="recommend-content">

        <h3>${recipe.title}</h3>

        <p class="recommend-description">
          ${recipe.description}
        </p>

        <div class="recommend-info">

          <span>
            ◷ ${recipe.time}분
          </span>

          <span class="difficulty">
            ♨ ${recipe.difficulty}
          </span>

        </div>

        <div class="recommend-tags">

          ${recipe.tags.map((tag) => `<span>${tag}</span>`).join("")}

        </div>

      </div>
    `;

    // 완성된 카드를 화면에 추가
    recommendList.append(card);
  });
}

// 함수 실행
renderRecommendRecipes();
