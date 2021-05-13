const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal");
const mealDetailsContent = document.querySelector(".meal-details-content");
const recipeCloseBtn = document.getElementById("recipe-close-btn");

// event listeners
searchBtn.addEventListener("click", getMealList);
mealList.addEventListener("click", getMealRecipe);
recipeCloseBtn.addEventListener("click", () => {
    mealDetailsContent.parentElement.classList.remove("showRecipe");
});


// get meal list that matches with the ingrediatns
function getMealList() {
    let searchInputTxt = document.getElementById("search-input").value.trim();

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals) {
            data.meals.forEach(meal => {
                html += `
                    <div class="meal-item" data-id = "${meal.idMeal}">
                        <div class="meal-img">
                            <img src="${meal.strMealThumb}" alt="food">
                        </div>
                        <div class="meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href="#" class="recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove("notFound");
        } else {
            html = `<div class="meal-name">
            <h4>"Sorry Ashley, I didn't find anything that matches that!"</h4>
            <p>The ingrediant might have been too unique (like you are my love!); or, check the spelling and try again.<br>
            Keep in mind, I'm only in the first part of Justice Reskill coding class, so, that might be it too!<p>
            <img src="tay-not-found.gif" alt="Not Found">` ;
            mealList.classList.add("notFound");
        }

        mealList.innerHTML = html;
    });
}


// get recipe of the meal
function getMealRecipe(e) {
    e.preventDefault();
    if(e.target.classList.contains("recipe-btn")) {
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }
}

function mealRecipeModal(meal) {
    meal = meal[0];
    let html = `
    <h2 class="recipe-title">${meal.strMeal}</h2>
        <p class="recipe-category">${meal.strCategory}</p>
        <div class="recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class="recipe-meal-img">
            <img src="${meal.strMealThumb}" alt="">
        </div>
        <div class="recipe-link">
            <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add("showRecipe");

}