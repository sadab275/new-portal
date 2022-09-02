const connectApi = () => {
    const url = "https://openapi.programming-hero.com/api/news/categories"
    fetch(url)
        .then(res => res.json())
        .then(data => showCategory(data.data.news_category));
}

const showCategory = categories => {
    const categoryContainer = document.getElementById("categoryContainer");
    categories.forEach(category => {
        const containerFluid = document.createElement("div");
        containerFluid.classList.add("container-fluid");
        containerFluid.innerHTML = `
        <a class="nav-link">${category.category_name}</a>
        `;
        categoryContainer.appendChild(containerFluid);
    })


}
connectApi();