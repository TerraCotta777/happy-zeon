import "./styles/main.scss";
import html from "./index.html";

const burger = document.querySelector(".header__hamburger");
const mobileMenu = document.querySelector(".mobile");
const closeMenu = document.querySelector(".mobile__close");
const navLinks = document.querySelectorAll(".mobile .header__mobile-nav *");

const body = document.querySelector("body");
const buyNowBtns = document.querySelectorAll(".buy-now");
const form = document.querySelector(".modal__form");
const closeModal = document.querySelector(".modal__close");
const modalBtns = document.querySelectorAll(".modal__button");
const inputs = document.querySelectorAll(".modal__input");
const modalLoading = document.querySelector(".modal__loading");

const darkSection = document.querySelector(".dark");
const themeBtns = document.querySelectorAll(".dark__mode");

const plans = ["standard", "premium", "lifetime"];

const date = "2022-09-17";

const menuSlide = () => {
  const closeMobileMenu = () => {
    mobileMenu.classList.remove("active");
    navLinks.forEach((link, index) => {
      link.style.animation = "";
    });
  };

  burger.addEventListener("click", () => {
    mobileMenu.classList.add("active");

    navLinks.forEach((link, index) => {
      link.style.animation = `menuFade 0.5s ease forwards ${index / 7 + 0.5}s `;
      link.addEventListener("click", () => {
        mobileMenu;
        closeMobileMenu();
      });
    });
  });

  closeMenu.addEventListener("click", closeMobileMenu);
};

const second = 1000,
  minute = second * 60,
  hour = minute * 60,
  day = hour * 24;

const countDown = new Date(date).getTime(),
  x = setInterval(function () {
    const now = new Date().getTime(),
      distance = countDown - now;

    (document.querySelector(".clock__days").textContent = Math.floor(
      distance / day
    )),
      (document.querySelector(".clock__hours").textContent = Math.floor(
        (distance % day) / hour
      )),
      (document.querySelector(".clock__minutes").textContent = Math.floor(
        (distance % hour) / minute
      )),
      (document.querySelector(".clock__seconds").textContent = Math.floor(
        (distance % minute) / second
      ));
  }, 0);

const closeModalFunc = () => {
  body.classList.remove("modal-open");
  modalBtns.forEach((btn) => {
    btn.classList.remove("active");
  });
};

const modalFunc = () => {
  buyNowBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      body.classList.add("modal-open");
      const clickedPlan = e.target.parentElement.classList[1];
      if (plans.includes(clickedPlan)) {
        modalBtns.forEach((modalBtn) => {
          if (modalBtn.classList.contains(clickedPlan)) {
            modalBtn.classList.add("active");
          }
        });
      } else {
        console.log(modalBtns[2].classList.add("active"));
      }
    });
  });

  modalBtns.forEach((modalBtn) => {
    modalBtn.addEventListener("click", () => {
      modalBtns.forEach((btn) => {
        btn.classList.remove("active");
      });
      modalBtn.classList.add("active");
    });
  });

  closeModal.addEventListener("click", closeModalFunc);
};

const validate = (input) => {
  if (input.placeholder == "email") {
    const mailformat = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (!input.value.match(mailformat)) {
      input.classList.add("error");
      input.nextElementSibling.textContent = "enter valid email address";
      return false;
    } else {
      input.classList.remove("error");
      input.nextElementSibling.textContent = "";
      return true;
    }
  } else if (input.value.trim() === "") {
    input.classList.add("error");
    input.nextElementSibling.textContent = "this field is required*";
    return false;
  } else {
    input.classList.remove("error");
    return true;
  }
};

console.log(themeBtns);

themeBtns.forEach((modeBtn) => {
  modeBtn.addEventListener("click", function (e) {
    if (this.classList.contains("dark__light-mode")) {
      darkSection.classList.remove("dark-mode");
      darkSection.classList.add("light-mode");
      themeBtns[1].classList.remove("active");
      this.classList.add("active");
    } else {
      darkSection.classList.remove("light-mode");
      darkSection.classList.add("dark-mode");
      themeBtns[0].classList.remove("active");
      this.classList.add("active");
    }
  });
});

menuSlide();
modalFunc();
form.addEventListener("submit", (e) => {
  e.preventDefault();
  inputs.forEach((input) => validate(input));
  modalLoading.style.display = "flex";
  setTimeout(() => {
    modalLoading.style.display = "none";
    closeModalFunc();
  }, 2000);
});
