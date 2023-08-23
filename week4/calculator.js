document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("form_calculator")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      addListItem();
    });
});

function addListItem() {
  clearList();
  const inputNumber = document.getElementById("number");
  const list = document.getElementById("list");
  const inputValue = inputNumber.value; // แก้ไขชื่อตัวแปรเป็น inputValue

  var arrayList = calculator(inputValue);

  for (let i = 0; i < arrayList.length; i++) {
    (function (index) {
      setTimeout(function () {
        // Create a new list item
        var listItem = document.createElement("li");
        listItem.textContent = arrayList[i]; // แก้ไขใช้ inputValue แทน value
        listItem.classList.add("list-item");
        list.appendChild(listItem);
      }, 150 * index);
    })(i);
  }

  // Clear the input field
  inputNumber.value = "";
}

function calculator(number) {
  const result = [];

  for (let i = 0; i <= 24; i++) {
    result.push(`${number} x ${i} = ` + number * i);
  }

  return result;
}

function clearList() {
  const list = document.getElementById("list");
  list.innerHTML = "";
}
