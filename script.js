const apiUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

document.getElementById('search-button').addEventListener('click', async () => {
    const searchInput = document.getElementById('search-input').value;
    const mealResults = document.getElementById('meal-results');
    mealResults.innerHTML = '';

    if (searchInput) {
        try {
            const response = await fetch(apiUrl + searchInput);
            const data = await response.json();

            if (data.meals) {
                data.meals.forEach(meal => {
                    const mealDiv = document.createElement('div');
                    mealDiv.classList.add('meal');
                    mealDiv.innerHTML = `
                        <h3>${meal.strMeal}</h3>
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                        <p>${meal.strCategory}</p>
                        <a class="recipe-link" href="${meal.strSource}" target="_blank">View Recipe</a>
                        <a class="preparation-link" href="${meal.strYoutube}" target="_blank">View Preparation</a>
                    `;
                    mealResults.appendChild(mealDiv);
                });
            } else {
                mealResults.innerHTML = '<p>No meals found.</p>';
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            mealResults.innerHTML = '<p>Error fetching data.</p>';
        }
    } else {
        mealResults.innerHTML = '<p>Please enter a meal name.</p>';
    }
});
