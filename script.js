const form = document.querySelector(".form");
const firstName = document.querySelector("#name");
const secondName = document.querySelector("#secondName");
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");
const checkbox = document.querySelector("#agree");

function controlCheckbox() {
    if (checkbox.checked) {
        return true;
    } else {
        return false;
    }
}

const notification = document.querySelector(".notification-wrapper");
const notificationText = document.querySelector(".notification-text");

function showNotification() {
    notification.classList.remove("hidden");
    setTimeout(() => {
        notification.classList.add("hidden");
    }, 5000)
}

form.addEventListener("submit", (event) => {
    // Предотвращает действие браузера по умолчанию. В данном случае — отправку формы
    // https://learn.javascript.ru/default-browser-action
    event.preventDefault();
    // Здесь твой код

    fetch(`https://polinashneider.space/user`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer: HannaDaunar'
            },
            body: JSON.stringify({
                "name": firstName.value,
                "secondName": secondName.value,
                "phone": phone.value,
                "email": email.value,
                "agree": controlCheckbox()
            })
        })
        .then((result) => {
            return result.json();
        })
        .then((data) => {
            notificationText.textContent = Object.values(data);
            form.reset();
            showNotification();

        })
        .catch((error) => {
            notificationText.textContent = Object.values(error);
            showNotification();
        })

});