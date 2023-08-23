function StarterFunction() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://fakestoreapi.com/products");
  xhr.send();

  xhr.onload = () => {
    if (xhr.status === 200) {
      const products = JSON.parse(xhr.response);
      const table = document.querySelector("table");

      const formatData = products.map((product) => ({
        id: product.id,
        image: product.image,
        title: product.title,
        price: product.price,
        category: product.category,
      }));

      for (const row of formatData) {
        const tr = document.createElement("tr");

        for (const column in row) {
          const td = document.createElement("td");

          if (column === "image") {
            const img = document.createElement("img");

            img.src = row[column];
            img.className = "img-fluid rounded img-thumbnail fiximg";
            td.appendChild(img);
          } else {
            td.textContent = row[column];
          }

          tr.appendChild(td);
        }

        table.appendChild(tr);
      }
    } else {
      console.log(xhr.status);
    }
  };
}

function navbarStarter() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://fakestoreapi.com/products/categories");
  xhr.send();

  xhr.onload = () => {
    if (xhr.status === 200) {
      const nav = document.querySelector("#navbar-nav");
      const navData = JSON.parse(xhr.response);

      for (const navEle of navData) {
        const link = document.createElement("a");
        link.href = "index.html?filter=" + navEle;
        link.innerText = navEle;
        link.className = "nav-link";
        nav.appendChild(link);
      }
    } else {
      console.log(xhr.status);
    }
  };
}

document.addEventListener("DOMContentLoaded", function () {
  navbarStarter();
  StarterFunction();

  const url = window.location.href;
  const params = new URLSearchParams(url);

  const filterVal = params.get("filter");

  console.log(filterVal);
});
