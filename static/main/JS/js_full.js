function toggleSection(classname) {
    const section = document.getElementsByClassName(classname)[0];
    if (section.style.display === "none") {
        section.style.display = "block";
    } else {
        section.style.display = "none";
    }
}

function setDate() {
    const dateElement = document.getElementById("data_label");

    const today = new Date();
    const day = today.getDate().toLocaleString("ru-RU").padStart(2, "0");
    const month = (today.getMonth() + 1).toLocaleString("ru-RU").padStart(2, "0");
    const year = today.getFullYear().toLocaleString("ru-RU").replace(/\s/g, "");

    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const weekday = weekdays[today.getDay()];

    const hour = today.getHours().toString().padStart(2, "0");
    const minute = today.getMinutes().toString().padStart(2, "0");
    const second = today.getSeconds().toString().padStart(2, "0");

    dateElement.innerHTML = day + "." + month + "." + year + ", " + weekday + ", " + hour + "-" + minute + "-" + second;
}


function renderCalendar() {
    const block = document.querySelector(".calendar");
    const calendarTitle = block.querySelector(".calendar-title");
    const calendarBody = block.querySelector(".calendar-body");
    const weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
    const today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();
    let day = today.getDate();

    function updateCalendar() {
        // Заголовок календаря
        const monthName = [
            "Январь",
            "Февраль",
            "Март",
            "Апрель",
            "Май",
            "Июнь",
            "Июль",
            "Август",
            "Сентябрь",
            "Октябрь",
            "Ноябрь",
            "Декабрь",
        ];
        calendarTitle.innerHTML = monthName[month] + " " + year;

        // Таблица дней месяца
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        let dayCounter = 1;
        let html = "";
        for (let i = 0; i < 6; i++) {
            html += "<tr>";
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDayOfMonth) {
                    html += "<td></td>";
                } else if (dayCounter > daysInMonth) {
                    html += "<td></td>";
                } else {
                    let className = "";
                    if (weekdays[j] === "Сб" || weekdays[j] === "Вс") {
                        className = "weekend";
                    }
                    if (dayCounter === day && month === today.getMonth() && year === today.getFullYear()) {
                        className += " active";
                    }
                    html += `<td class="${className}" onclick="selectDay(${dayCounter})">${dayCounter}</td>`;
                    dayCounter++;
                }
            }
            html += "</tr>";
        }
        calendarBody.innerHTML = html;
    }

    updateCalendar();

    function prevMonth() {
        month--;
        if (month < 0) {
            year--;
            month = 11;
        }
        updateCalendar();
    }

    function nextMonth() {
        month++;
        if (month > 11) {
            year++;
            month = 0;
        }
        updateCalendar();
    }

    function selectDay(selectedDay) {
        day = selectedDay;
        updateCalendar();
    }

    // Подсвечиваем выходные дни другим цветом
    const weekendCells = calendarBody.querySelectorAll(".weekend");
    for (let i = 0; i < weekendCells.length; i++) {
        const cell = weekendCells[i];
        cell.style.color = "blue";
    }

    // Подсвечиваем текущий день красным цветом
    const activeCell = calendarBody.querySelector(".active");
    if (activeCell) {
        activeCell.style.color = "red";
    }

    // Обработчики кнопок "Предыдущий месяц" и "Следующий месяц"
    const prevButton = block.querySelector(".calendar-prev button");
    const nextButton = block.querySelector(".calendar-next button");
    prevButton.addEventListener("click", prevMonth);
    nextButton.addEventListener("click", nextMonth);
}

renderCalendar();


function task3(elementId) {
    // Получаем родительский элемент, который содержит узлы, которые мы хотим проверить.
    const parentElement = document.getElementById("parent");
    // Получаем список всех дочерних узлов родительского элемента.
    const childNodes = parentElement.childNodes;
    // Фильтруем список дочерних узлов, оставляя только те, которые являются текстовыми узлами и содержат только пробельные символы.
    const whitespaceNodes = Array.from(childNodes).filter(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim() === "");
    // Находим элемент на странице, который мы хотим использовать для вывода результата.
    const element = document.getElementById(elementId);
    // Записываем количество найденных пробельных узлов внутрь элемента, который мы нашли ранее.
    element.innerText = `Количество пробельных узлов: ${whitespaceNodes.length}`;
}


function task4() {
    const table = document.getElementById("table");
    const blocks = table.querySelectorAll(".block");
    const numBlocks = blocks.length;
    let currentIndex = 0;

    setInterval(() => {
        // Создаем новый элемент img и устанавливаем ему случайный src
        const img = document.createElement("img");
        img.src = "https://picsum.photos/200";
        img.style.position = "absolute";

        // Удаляем старое изображение из выбранной ячейки, если оно есть
        const oldImg = blocks[currentIndex].querySelector("img");
        if (oldImg) {
            blocks[currentIndex].removeChild(oldImg);
        }

        // Выбираем случайную ячейку таблицы и добавляем туда новый img
        const randomIndex = Math.floor(Math.random() * numBlocks);
        const selectedBlock = blocks[randomIndex];
        selectedBlock.appendChild(img);

        currentIndex = randomIndex;
    }, 100);
}


const list = document.getElementById('myList1');
let ul = document.querySelector('#myList ul');
let liCount = ul.children.length;

function createLi() {
    let li = document.createElement('li');
    let content = prompt('Введите содержимое пункта списка', '');
    if (content === null) {
        return;
    }
    li.textContent = content;
    ul.appendChild(li);
    li.onclick = function (event) {
        if (event.target.tagName !== 'LI') {
            return;
        }
        let result = confirm(`Вы уверены, что хотите удалить пункт списка "${event.target.textContent}"?`);
        if (result) {
            event.target.remove();
        }
    };
    liCount++;
}

function deleteLi() {
    let liList = ul.querySelectorAll('li');
    if (liList.length === 0) {
        alert('Список пуст!');
        return;
    }
    let liToDelete = prompt(`Введите номер пункта списка (от 1 до ${liList.length})`, '');
    if (liToDelete === null) {
        return;
    }
    liToDelete = parseInt(liToDelete);
    if (isNaN(liToDelete) || liToDelete <= 0 || liToDelete > liList.length) {
        alert(`Некорректный номер пункта списка! Введите число от 1 до ${liList.length}.`);
        return;
    }
    let result = confirm(`Вы уверены, что хотите удалить пункт списка "${liList[liToDelete - 1].textContent}"?`);
    if (result) {
        liList[liToDelete - 1].remove();
        liCount--;
    }
}

let listVisible = false


function task6(id) {
    var x = document.getElementById(id);

    if (x.style.display === "none") {
        x.style.display = "flex";
    } else {
        x.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    let images = [
        "https://picsum.photos/id/231/200/300",
        "https://picsum.photos/id/232/200/300",
        "https://picsum.photos/id/233/200/300"
    ];

    let currentImageIndex = 0;

    let imageElements = document.querySelectorAll("#myArray img");

    imageElements.forEach(function (imageElement) {
        imageElement.addEventListener("mouseover", function () {
            currentImageIndex++;

            if (currentImageIndex >= images.length) {
                currentImageIndex = 0;
            }

            imageElement.src = images[currentImageIndex];
        });
    });
});


function task7() {
    let menuItems = document.querySelectorAll("#menu li");
    let itemsLeft = menuItems.length;
    const menu = document.getElementById("menu");
    const lastMessage = document.querySelector("#menu + p");
    if (lastMessage) {
        menu.parentNode.removeChild(lastMessage);
    }

    if (itemsLeft < 5) {
        const numToAdd = 5 - itemsLeft;
        for (let i = 0; i < numToAdd; i++) {
            const newItem = document.createElement("li");
            newItem.textContent = "Click";
            menu.appendChild(newItem);
        }
    }
    const message = document.createElement("p");
    menuItems = document.querySelectorAll("#menu li");
    itemsLeft = menuItems.length;
    message.textContent = "Uuuuuuppppsssss";
    message.style.display = "none";
    menu.parentNode.appendChild(message);

    menuItems.forEach((menuItem) => {
        menuItem.addEventListener("click", () => {
            menuItem.classList.add("fade-out");
            setTimeout(() => {
                menu.removeChild(menuItem);
                itemsLeft--;
                if (itemsLeft === 0) {
                    message.style.display = "block";
                } else {
                    message.style.display = "none";
                }
            }, 1000); // 1000 ms matches the fade-out animation duration
        });
    });
}

function task8() {
    const image = document.getElementById("smooth-image");
    image.style.opacity = 1;
    let fadeTimeout;

    function fadeIn() {
        clearTimeout(fadeTimeout);
        let opacity = parseFloat(image.style.opacity);
        if (opacity < 1) {
            opacity += 0.1;
            image.style.opacity = opacity;
            fadeTimeout = setTimeout(fadeIn, 30);
        }
    }

    function fadeOut() {
        clearTimeout(fadeTimeout);
        let opacity = parseFloat(image.style.opacity);
        if (opacity > 0.5) {
            opacity -= 0.1;
            image.style.opacity = opacity;
            fadeTimeout = setTimeout(fadeOut, 30);
        }
    }

    image.addEventListener("mouseover", fadeOut);
    image.addEventListener("mouseout", fadeIn);
}


const form = document.querySelector('#registration-form');
const emailInput = document.querySelector('#email');
const emailError = document.querySelector('#email-error');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

form.addEventListener('submit', function (event) {
    if (!emailRegex.test(emailInput.value)) {
        event.preventDefault();
        emailError.textContent = 'Please enter a valid email address.';
    } else {
        emailError.textContent = '';
    }
});

function validateEmail() {
    var email = document.getElementById("email");
    var emailPattern = /^\w{2,}@\w{2,}\.\w{2,4}$/;

    if (!emailPattern.test(email.value)) {
        document.getElementById("emailError").innerHTML = "Enter a valid email address (example@ex.com)";
        email.classList.add("error");
    } else {
        document.getElementById("emailError").innerHTML = "";
        email.classList.remove("error");
    }

    const submitBtn = document.getElementById("task10-submit-button");
    submitBtn.disabled = validateSubmit()
}


function validatePasswords() {
    var password = document.getElementById("password");
    var confirmPassword = document.getElementById("confirm-password");

    if (password.value !== confirmPassword.value) {
        document.getElementById("passwordError").innerHTML = "Passwords do not match";
        password.classList.add("error");
        confirmPassword.classList.add("error");
    } else {
        document.getElementById("passwordError").innerHTML = "";
        password.classList.remove("error");
        confirmPassword.classList.remove("error");
    }

    const submitBtn = document.getElementById("task10-submit-button");
    submitBtn.disabled = validateSubmit()
}

function validatePhone() {
    var phone = document.getElementById("phone");
    var phonePattern = /^\+[0-9]{11}$/;

    if (!phonePattern.test(phone.value)) {
        document.getElementById("phoneError").innerHTML = "Enter a valid phone number (+71234567890)";
        phone.classList.add("error");
    } else {
        document.getElementById("phoneError").innerHTML = "";
        phone.classList.remove("error");
    }

    const submitBtn = document.getElementById("task10-submit-button");
    submitBtn.disabled = validateSubmit()
}

function validateDate() {
    var date = document.getElementById("date");
    var datePattern = /^\d{2}[.]\d{2}[.]\d{4}$/;

    if (!datePattern.test(date.value)) {
        document.getElementById("dateError").innerHTML = "Enter a valid date (dd.mm.yyyy)";
        date.classList.add("error");
    } else {
        document.getElementById("dateError").innerHTML = "";
        date.classList.remove("error");
    }

    const submitBtn = document.getElementById("task10-submit-button");
    submitBtn.disabled = validateSubmit()
}

function validateSubmit() {
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm-password");
    const phone = document.getElementById("phone");
    const date = document.getElementById("date");
    const email = document.getElementById("email");

    const name = document.getElementById("full-name");
    const faculty = document.getElementById("faculty");
    const department = document.getElementById("department");

    const phonePattern = /^\+[0-9]{11}$/;
    const datePattern = /^\d{2}[.]\d{2}[.]\d{4}$/;
    const emailPattern = /^\w{2,}@\w{2,}\.\w{2,4}$/;

    const passwordCond = password.value === confirmPassword.value
    const phoneCond = phonePattern.test(phone.value)
    const dataCond = datePattern.test(date.value)
    const emailCond = emailPattern.test(email.value)

    // const nameCond = !isBlank(name.textContent)
    // const facultyCond = !isBlank(faculty.textContent)
    // const departmentCond = !isBlank(department.textContent)

    // && nameCond && facultyCond && departmentCond
    return !(passwordCond && phoneCond && dataCond && emailCond)
}

function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}


// Получаем таблицу и первую строку
const table = document.getElementById('myTable');

function addCell() {
    // Получаем номер строки и номер ячейки от пользователя
    const rowNumber = parseInt(prompt('Введите номер строки:'), 10);
    const cellNumber = parseInt(prompt('Введите номер ячейки:'), 10);

    // Получаем нужную строку
    const row = document.querySelector(`#myTable tr:nth-child(${rowNumber})`);

    // Создаем новую ячейку и добавляем ее в строку
    const newCell = row.insertCell(cellNumber - 1); // -1, чтобы индексация начиналась с 0
    newCell.textContent = 'Новая ячейка';
}

// Функция удаления ячейки
function deleteCell() {
    // Получаем номер строки и номер ячейки от пользователя
    const rowNumber = parseInt(prompt('Введите номер строки:'), 10);
    const cellNumber = parseInt(prompt('Введите номер ячейки:'), 10);

    // Получаем нужную строку
    const row = document.querySelector(`#myTable tr:nth-child(${rowNumber})`);

    // Удаляем нужную ячейку из строки
    const cell = row.cells[cellNumber - 1]; // -1, чтобы индексация начиналась с 0
    row.deleteCell(cell.cellIndex);
}

function addRow() {
    // Создаем новую строку и добавляем ее в конец таблицы
    const newRow = table.insertRow(-1);

    // Создаем две ячейки и добавляем их в строку
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);

    // Задаем текст ячеек
    cell1.innerHTML = 'Новая ячейка 1';
    cell2.innerHTML = 'Новая ячейка 2';
}


const img1 = "task8.jpg";
const img2 = "https://picsum.photos/200";
const img3 = "https://picsum.photos/200";

// Функция для смены изображения при наведении курсора мыши
function changeImage() {
    // Получаем ссылку на изображение
    const img = event.target;

    // Сменяем изображение
    if (img.src.includes(img1)) {
        img.src = img2;
    } else if (img.src.includes(img2)) {
        img.src = img3;
    } else {
        img.src = img1;
    }
}

// Функция для возвращения изображения к первоначальному состоянию при уходе курсора мыши
function restoreImage() {
    // Получаем ссылку на изображение
    const img = event.target;

    // Возвращаем изображение к первоначальному состоянию
    img.src = img1;
}
