const ingredients = [
  { name: "계란", emoji: "🥚", category: "단백질" },
  { name: "감자", emoji: "🥔", category: "채소" },
  { name: "양파", emoji: "🧅", category: "채소" },
  { name: "대파", emoji: "🌿", category: "채소" },
  { name: "김치", emoji: "🥬", category: "기타" },
  { name: "밥", emoji: "🍚", category: "기타" },
  { name: "두부", emoji: "⬜", category: "단백질" },
  { name: "토마토", emoji: "🍅", category: "채소" },
];

const recipes = [
  {
    title: "김치볶음밥",
    description: "잘 익은 김치와 계란으로 만드는 간단하고 든든한 한 그릇",
    image: "./images/kimchi-rice.png",
    time: "15분",
    difficulty: "쉬움",
    ingredients: ["김치", "계란", "밥"],
  },
  {
    title: "감자채계란전",
    description: "채 썬 감자와 계란을 노릇하게 부쳐 만드는 바삭한 한 끼",
    image: "./images/potato-egg-pancake.png",
    time: "20분",
    difficulty: "쉬움",
    ingredients: ["감자", "계란", "양파"],
  },
  {
    title: "감자채볶음",
    description: "감자와 양파를 함께 볶아 만드는 담백하고 간단한 반찬",
    image: "./images/stir-fried-potato.png",
    time: "15분",
    difficulty: "쉬움",
    ingredients: ["감자", "양파", "대파"],
  },
];

const selectedIngredients = [];
let activeCategory = "전체";

const ingredientList = document.querySelector("#ingredientList");
const selectedList = document.querySelector("#selectedList");
const selectedCount = document.querySelector("#selectedCount");
const searchButton = document.querySelector("#searchButton");
const resetButton = document.querySelector("#resetButton");
const recipeResult = document.querySelector("#recipeResult");
const categoryButtons = document.querySelectorAll(".demo-category");

function renderIngredients() {
  ingredientList.textContent = "";

  const visibleIngredients = ingredients.filter((ingredient) => {
    return activeCategory === "전체" || ingredient.category === activeCategory;
  });

  visibleIngredients.forEach((ingredient) => {
    const button = document.createElement("button");
    const isSelected = selectedIngredients.includes(ingredient.name);

    button.type = "button";
    button.className = `demo-ingredient${isSelected ? " selected" : ""}`;
    button.dataset.name = ingredient.name;
    button.setAttribute("aria-pressed", String(isSelected));
    button.innerHTML = `<span aria-hidden="true">${ingredient.emoji}</span><span>${ingredient.name}</span>`;

    button.addEventListener("click", () => {
      toggleIngredient(ingredient.name);
    });

    ingredientList.append(button);
  });
}

function toggleIngredient(name) {
  const selectedIndex = selectedIngredients.indexOf(name);

  if (selectedIndex === -1) {
    selectedIngredients.push(name);
  } else {
    selectedIngredients.splice(selectedIndex, 1);
  }

  renderIngredients();
  renderSelectedIngredients();
}

function renderSelectedIngredients() {
  selectedList.textContent = "";
  selectedCount.textContent = `${selectedIngredients.length}개 선택`;

  if (selectedIngredients.length === 0) {
    const emptyText = document.createElement("span");
    emptyText.className = "demo-empty-text";
    emptyText.textContent = "아직 선택한 재료가 없어요.";
    selectedList.append(emptyText);

    searchButton.disabled = true;
    searchButton.textContent = "재료를 선택해주세요";
    return;
  }

  selectedIngredients.forEach((name) => {
    const tag = document.createElement("button");
    tag.type = "button";
    tag.className = "demo-selected-tag";
    tag.setAttribute("aria-label", `${name} 선택 해제`);
    tag.innerHTML = `${name} <span aria-hidden="true">×</span>`;
    tag.addEventListener("click", () => toggleIngredient(name));
    selectedList.append(tag);
  });

  searchButton.disabled = false;
  searchButton.textContent = `${selectedIngredients.length}개의 재료로 레시피 찾기 →`;
}

function findRecipes() {
  if (selectedIngredients.length === 0) {
    return;
  }

  const matchedRecipes = recipes
    .map((recipe) => {
      const matched = recipe.ingredients.filter((ingredient) => {
        return selectedIngredients.includes(ingredient);
      });

      const missing = recipe.ingredients.filter((ingredient) => {
        return !selectedIngredients.includes(ingredient);
      });

      return {
        ...recipe,
        matched,
        missing,
      };
    })
    .filter((recipe) => recipe.matched.length > 0)
    .sort((a, b) => {
      if (b.matched.length !== a.matched.length) {
        return b.matched.length - a.matched.length;
      }

      return a.missing.length - b.missing.length;
    });

  renderRecipes(matchedRecipes);
}

function renderRecipes(recipeList) {
  recipeResult.textContent = "";

  if (recipeList.length === 0) {
    recipeResult.innerHTML = `
      <div class="demo-no-result">
        선택한 재료와 연결된 예시 레시피가 없어요.<br />
        다른 재료도 함께 선택해보세요.
      </div>
    `;
    return;
  }

  recipeList.forEach((recipe) => {
    const card = document.createElement("article");
    card.className = "demo-recipe-card";

    const ingredientTags = recipe.ingredients
      .map((ingredient) => {
        const hasIngredient = selectedIngredients.includes(ingredient);
        return `
          <span class="demo-material ${hasIngredient ? "have" : "need"}">
            ${hasIngredient ? "✓" : "+"} ${ingredient}
          </span>
        `;
      })
      .join("");

    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}" />
      <div class="demo-recipe-body">
        <div class="demo-recipe-top">
          <h3>${recipe.title}</h3>
          <span class="demo-match">보유 ${recipe.matched.length}/${recipe.ingredients.length}</span>
        </div>
        <p class="demo-recipe-description">${recipe.description}</p>
        <div class="demo-recipe-meta">
          <span>⏱ ${recipe.time}</span>
          <span>🍳 ${recipe.difficulty}</span>
          <span>${recipe.missing.length === 0 ? "재료 준비 완료" : `추가 ${recipe.missing.length}개 필요`}</span>
        </div>
        <div class="demo-recipe-materials">${ingredientTags}</div>
      </div>
    `;

    recipeResult.append(card);
  });
}

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.category;

    categoryButtons.forEach((categoryButton) => {
      const isActive = categoryButton === button;
      categoryButton.classList.toggle("active", isActive);
    });

    renderIngredients();
  });
});

resetButton.addEventListener("click", () => {
  selectedIngredients.splice(0, selectedIngredients.length);
  renderIngredients();
  renderSelectedIngredients();
  recipeResult.innerHTML = `
    <div class="demo-result-placeholder">
      <div class="demo-placeholder-icon" aria-hidden="true">🍳</div>
      <strong>어떤 요리를 만들 수 있을까요?</strong>
      <p>왼쪽에서 재료를 선택하면<br />추천 가능한 메뉴를 보여드려요.</p>
    </div>
  `;
});

searchButton.addEventListener("click", findRecipes);

renderIngredients();
renderSelectedIngredients();
