const connectApi = () => {
    const url = "https://openapi.programming-hero.com/api/news/categories"
    fetch(url)
        .then(res => res.json())
        .then(data => showCategory(data.data.news_category));
}

const showCategory = categories => {
    const categoryContainer = document.getElementById("categoryContainer");
    categories.forEach(category => {
        // console.log(category);
        const containerFluid = document.createElement("div");
        containerFluid.classList.add("col");
        containerFluid.innerHTML = `
        <a onclick='displayNews("${category.category_id}")' class="nav-link">${category.category_name}</a>
        `;
        categoryContainer.appendChild(containerFluid);
    })
}

const displayNews = idNews => {
    console.log(idNews);
}
// const displayNews = (idNews) => {
//     const url = `https://openapi.programming-hero.com/api/news/category/${idNews}`

//     fetch(url)
//         .then(res => res.json())
//         .then(data => showMealDetail(data.data[0]));
// }
// showMealDetail
connectApi();