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
    toggleSpinner(true);
    fetch(url)
        .then(res => res.json())
        .then(data => showNews(data.data));
}
// console.log
const showNews = (news) => {
    // console.log(news[0]);
    const newsDiv = document.getElementById("newsContainer");

    newsDiv.innerHTML = ``;
    news.forEach(newss => {

        const newsBox = document.createElement("div");
        newsBox.classList.add("row");
        newsBox.classList.add("border");
        newsBox.classList.add("border-dark");
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
                    <div class = "d-flex justify-content-between container">
                        <div>
                            <img src="${newss.author.img}" class="img-thumbnail rounded-circle" style = "width: 50px; height: 50px" alt="...">
                            <span>${newss.author.name}</span>
                        </div>
                        <div class="mt-2">
                            <i class="fa fa-eye" aria-hidden="true">${" " + newss.total_view}</i>
                        </div>
                        <div>
                            <button onclick = "detailsNews('${newss._id}')" type="button" class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#newsDetailsModal">Show More</button>
                            
                        </div>
                    </div>
                        
                    </div>
        `
        newsDiv.appendChild(newsBox);

    });
    toggleSpinner(false);
}

const detailsNews = (news_id) => {
    // console.log(news_id);
    const url = ` https://openapi.programming-hero.com/api/news/${news_id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => modalNews(data.data));
}
const modalNews = daily => {
    console.log(daily[0].image_url);
    const getModalTitle = document.getElementById("exampleModalLabel");
    getModalTitle.innerText = daily[0].title;
    const descrip = document.getElementById("description");
    descrip.innerText = daily[0].details;

    const authorName = document.getElementById("authorName");
    const a = (daily[0].author.name != "" && daily[0].author.name != null) ? daily[0].author.name : "No data found";
    authorName.innerText = a;
    const getImg = document.getElementById("imgGet");
    getImg.innerHTML = `
    <img class="img-fluid" src="${daily[0].image_url}" alt=""></img>
    `
}
{/* <img src="${daily[0].image_url}" alt=""></img> */ }

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById("spinner");
    if (isLoading == true) {
        loaderSection.classList.remove("d-none");
    }
    else {
        loaderSection.classList.add("d-none");
    }
}
connectApi();