const contactMeWindow = document.getElementById("contact-me");
const contactMeBtnUpper = document.getElementById("contact-me-button");
const contactMeForm = document.getElementById("contact-me-form");
const portfolioBtns = document.querySelectorAll(".portfolio-button a");
const portfolioCards = document.querySelectorAll(".portfolio-card-parent");

//onclick
contactMeBtnUpper.onclick = () => {
  contactMeWindow.scrollIntoView();
};

//eventListeners
portfolioBtns.forEach((el) => {
  el.addEventListener("click", (event) => {
    show(event);
  });
});

function show(event) {
  if (event.currentTarget.classList.contains("All")) {
    portfolioCards.forEach((card) => {
      card.hidden = false;
    });
  } else {
    for (let card of portfolioCards) {
      if (
        !card.classList.contains(event.currentTarget.className.split(" ")[0])
      ) {
        card.hidden = true;
      } else {
        card.hidden = false;
      }
    }
  }
}

//formSend
contactMeForm.addEventListener("submit", formSend);

function formSend(e) {
  const nameInput = document.getElementById("name_input");
  const emailInput = document.getElementById("email_input");
  const emailText = document.getElementById("email_text");

    emailInput.addEventListener('focus', () => {
        formRemoveError(emailInput)})
    emailInput.addEventListener('blur', () => {
        console.log(emailInput.value)
        if (emailInput.value.trim() === '') return; 
        formValidate()})
    nameInput.addEventListener('focus', () => {
        formRemoveError(nameInput)})
    nameInput.addEventListener('blur', () => {
      if (nameInput.value.trim() === '') return; 
        formValidate()})


  e.preventDefault();
  const error = formValidate();

  if (error === 0) {
    window.open(
      `mailto:sidewipe@yandex.ru?subject=${nameInput.value}&body=${emailText.value}`
    );
  }

  // let formData = new FormData(form)
  //     if (error === 0) {
  //         contactMeForm.classList.add("_sending")
  //         let response = await fetch('senmail.php', {
  //             method: 'POST',
  //             body: formData
  //         })
  //         if (response.ok) {
  //             let result = await response.json()
  //             alert(result.message)
  //             contactMeForm.reset()
  //             contactMeForm.classList.remove("_sending")
  //         } else {
  //             alert("error")
  //         }
  //     }  else {
  //        //alert
  //    }
}

function formValidate() {
  let formReq = document.querySelectorAll("._req");
  let error = 0;

  for (let input of formReq) {
    formRemoveError(input);
    if (input.classList.contains("_email")) {
      if (emailTest(input)) {
        formAddError(input);
        error++;
      }
    } else if (input.value.trim() === "") {
      formAddError(input);
      error++;
    }
  }
  return error;
}

function formAddError(input) {
  input.classList.add("_error");
}
function formRemoveError(input) {
  input.classList.remove("_error");
}

function emailTest(input) {
  return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}
