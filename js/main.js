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

const features = [
  {
    id: 1,

    icon: "🛒",

    title: "장보기",

    description:
      "부족한 재료를 바로 장바구니에 담아 간편하게 구매할 수 있어요.",

    type: "shopping",

    items: [
      {
        name: "양파",
        emoji: "🧅",
      },
      {
        name: "감자",
        emoji: "🥔",
      },
      {
        name: "대파",
        emoji: "🌿",
      },
    ],
  },

  {
    id: 2,

    icon: "🍲",

    title: "조리도구",

    description: "필요한 조리도구를 미리 확인하고, 더 쉽게 요리할 수 있어요.",

    type: "tools",

    items: [
      {
        name: "프라이팬",
        emoji: "🍳",
      },
      {
        name: "칼",
        emoji: "🔪",
      },
      {
        name: "도마",
        emoji: "🪵",
      },
      {
        name: "뒤집개",
        emoji: "🥄",
      },
      {
        name: "냄비",
        emoji: "🍲",
      },
    ],
  },

  {
    id: 3,

    icon: "📅",

    title: "소비기한",

    description: "식재료의 소비기한을 관리해 버려지는 재료를 줄여줘요.",

    type: "expiry",

    items: [
      {
        name: "계란",
        date: "09.28",
        status: "여유있음",
        statusClass: "safe",
      },
      {
        name: "양파",
        date: "09.24",
        status: "3일 남음",
        statusClass: "warning",
      },
      {
        name: "감자",
        date: "09.21",
        status: "오늘까지",
        statusClass: "danger",
      },
    ],
  },
];

const featureList = document.querySelector("#feature-list");

function renderFeatures() {
  featureList.textContent = "";

  features.forEach((feature) => {
    const card = document.createElement("article");

    card.className = "feature-card";

    card.innerHTML = `
      <div class="feature-card-top">

        <div class="feature-icon">
          ${feature.icon}
        </div>

        <div class="feature-text">

          <h3>
            ${feature.title}
          </h3>

          <p>
            ${feature.description}
          </p>

        </div>

        <button
          class="feature-arrow"
          data-id="${feature.id}"
          aria-label="${feature.title} 자세히 보기"
        >
          ›
        </button>

      </div>


      <div class="feature-preview">

        ${createPreview(feature)}

      </div>

    `;

    featureList.append(card);
  });
}

renderFeatures();

function createPreview(feature) {
  // 장보기
  if (feature.type === "shopping") {
    return `
      <div class="shopping-preview">

        <strong>
          부족한 재료 ${feature.items.length}개
        </strong>

        <div class="shopping-items">

          ${feature.items
            .map(
              (item) => `
                <div class="shopping-item">

                  <input
                    type="checkbox"
                    checked
                  >

                  <span class="item-emoji">
                    ${item.emoji}
                  </span>

                  <span>
                    ${item.name}
                  </span>

                </div>
              `,
            )
            .join("")}

        </div>

        <button class="green-button">
          🛒 장바구니에 담기
        </button>

      </div>
    `;
  }

  // 조리도구
  if (feature.type === "tools") {
    return `
      <div class="tools-preview">

        <strong>
          필요한 조리도구
        </strong>

        <div class="tool-grid">

          ${feature.items
            .map(
              (item) => `
                <div class="tool-item">

                  <div class="tool-emoji">
                    ${item.emoji}
                  </div>

                  <span>
                    ${item.name}
                  </span>

                </div>
              `,
            )
            .join("")}

        </div>

      </div>
    `;
  }

  // 소비기한
  if (feature.type === "expiry") {
    return `
      <div class="expiry-preview">

        <div class="preview-title">

          <strong>
            내 냉장고 식재료
          </strong>

          <span>
            전체보기 ›
          </span>

        </div>


        <div class="expiry-list">

          ${feature.items
            .map(
              (item) => `
                <div class="expiry-item">

                  <strong>
                    ${item.name}
                  </strong>

                  <span class="expiry-date">
                    ${item.date}
                  </span>

                  <span
                    class="expiry-status ${item.statusClass}"
                  >
                    ${item.status}
                  </span>

                </div>
              `,
            )
            .join("")}

        </div>

      </div>
    `;
  }

  return "";
}
