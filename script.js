const form = document.querySelector(".form");
form.addEventListener("submit", (event) => {
    // Предотвращает действие браузера по умолчанию. В данном случае — отправку формы
    // https://learn.javascript.ru/default-browser-action
    event.preventDefault();
    // Здесь твой код
    const name = document.querySelector("#name");
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

    const button = document.querySelector("#button");
    const clear = document.querySelector("#clear");
    const notification = document.querySelector(".notification-wrapper");
    const notificationText = document.querySelector(".notification-text");

    function showNotification() {
        notification.classList.remove("hidden");
        setTimeout(() => {
            notification.classList.add("hidden");
        }, 5000)
    }


    button.addEventListener('click', function() {
        fetch(`https://polinashneider.space/user`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer: HannaDaunar'
                },
                body: JSON.stringify({
                    "name": name.value,
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
    })

    clear.addEventListener('click', function() {
        form.reset();
    })
});