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

// const displayNews = idNews => {
//     console.log(idNews);
// }
const displayNews = (idNews) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${idNews}`

    fetch(url)
        .then(res => res.json())
        .then(data => showNews(data.data));
}
// console.log
const showNews = (news) => {
    console.log(news[0]);
    const newsDiv = document.getElementById("newsContainer");
    newsDiv.innerHTML = ``;
    news.forEach(newss => {

        const newsBox = document.createElement("div");
        newsBox.classList.add("row");
        newsBox.innerHTML = `
        <div class="col-md-4">
                        <img src="${newss.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${newss.title}</h5>
                            <p class="card-text">${newss.details.slice(0, 300) + "..."}</p>
                            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
        `
        newsDiv.appendChild(newsBox);
    })
}
connectApi();