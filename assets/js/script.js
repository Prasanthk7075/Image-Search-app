const api_key = "RzA-ZgcMDIhgKg2lrIZDoFZ6WRRgB32nSG8b_50CCfE"

const formEle = document.querySelector('form')
const inputEle = document.getElementById("search-bar")
const ImageSearch = document.querySelector(".main-container")
const showMore = document.getElementById("show-more")

let inputData = "";
let page = 1;

async function searchImages() {
    inputData = inputEle.value;
    const url = `https://api.unsplash.com/search/photos?page=${ page }&query=${ inputData }&client_id=${ api_key }`
    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;

    if (page === 1) {
        ImageSearch.innerHTML = "";
    }

    results.map((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        ImageSearch.appendChild(imageWrapper);
    });

    page++;
    if (page > 1) {
        showMore.style.display = 'block';
    }
}

formEle.addEventListener('submit', (e) => {
    e.preventDefault();
    page = 1;
    searchImages()
})
showMore.addEventListener('click', () => {
    searchImages()
})