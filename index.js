// Chuyển các tab trong phần skills
function showSkills(tabId) {
  const allSkills = document.querySelectorAll(
    ".main_skills-content-right-item"
  );
  allSkills.forEach((skill) => {
    skill.classList.remove("active");
  });
  const selectedTab = document.getElementById(tabId);
  if (selectedTab) {
    selectedTab.classList.add("active");
  }

  const buttons = document.querySelectorAll(
    ".main_skills-content-left-button button"
  );
  buttons.forEach((btn) => btn.classList.remove("choosen"));

  const clickedBtn = Array.from(buttons).find((btn) =>
    btn.getAttribute("onclick").includes(tabId)
  );
  if (clickedBtn) clickedBtn.classList.add("choosen");
}

const infor = document.querySelector(".main_infor");
const imgBox = document.querySelector(".main_infor-content-img");

infor.addEventListener("mouseenter", () => {
  imgBox.classList.add("active-img");
});

infor.addEventListener("mouseleave", () => {
  imgBox.classList.remove("active-img");
});

// Cuộn lên đầu trang
const scrollToTopButton = document.getElementById("scroll_to_top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    scrollToTopButton.style.display = "block";
  } else {
    scrollToTopButton.style.display = "none";
  }
});

scrollToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Highlight với tab đã chọn trên navbar
const navbarItems = document.querySelectorAll(".navbar__menu-item");
const active = document.querySelector(".activeNavbar");

navbarItems.forEach((item) => {
  item.addEventListener("click", () => {
    navbarItems.forEach((remain)=> {
      remain.classList.remove("activeNavbar");
    })
    item.classList.add("activeNavbar");
  });
});

// Ngôn ngữ
const vieLang = document.getElementById("vie-language");
const usaLang = document.getElementById("usa-language");

vieLang.addEventListener("click", () => {
  vieLang.classList.add("hidden");
  usaLang.classList.remove("hidden");
});

usaLang.addEventListener("click", () => {
  usaLang.classList.add("hidden");
  vieLang.classList.remove("hidden");
});

// Giao diện sáng / tối
const lightMode = document.getElementById("light-mode");
const darkMode = document.getElementById("dark-mode");

lightMode.addEventListener("click", () => {
  lightMode.classList.add("hidden");
  darkMode.classList.remove("hidden");
  document.body.classList.add("dark-theme");
});

darkMode.addEventListener("click", () => {
  darkMode.classList.add("hidden");
  lightMode.classList.remove("hidden");
  document.body.classList.remove("dark-theme");
});

/* Chuyển tiếp slide trong dự án */
const pages = document.querySelectorAll(".main_projects-content");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentPage = 0;

function showPage(index) {
  pages.forEach((page, i)=>{
    page.classList.toggle("active", i===index)
  })

  prevBtn.style.display = index === 0 ? "none" : "block";
  nextBtn.style.display = index === pages.length - 1 ? "none" : "block";
}

prevBtn.addEventListener("click", ()=> {
  if (currentPage>0) {
    currentPage--;
    showPage(currentPage);
  }
})

nextBtn.addEventListener("click", ()=> {
  if (currentPage< pages.length -1) {
    currentPage++;
    showPage(currentPage);
  }
})

showPage(currentPage); 

// Lướt đến phần nào thì navbar cũng highlight phần đó
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar__menu-item");

window.addEventListener("scroll", () => {
  let current = null;
  console.log(window.pageYOffset);
  
  // Nếu đang ở đầu trang (ví dụ < 100px), coi là "home"
  if (window.pageYOffset < 1600) {
    current = "home";
  } else {
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });
  }

  // reset + apply active
  navLinks.forEach((link) => {
    link.classList.remove("activeNavbar");
    if (current && link.getAttribute("href").includes(current)) {
      link.classList.add("activeNavbar");
    }
  });
});

// Hiển thị các công nghệ sử dụng bằng next và prev
const nextTechBtn = document.getElementById("next-tech");
const prevTechBtn = document.getElementById("prev-tech");
const techItems = document.querySelector(".long-list");

nextTechBtn.addEventListener("click", () => {
  techItems.style.transform = "translateX(-100%)";
})

prevTechBtn.addEventListener("click", () => {
  techItems.style.transform = "translateX(0)";
});

// Gửi tin nhắn ở contact
const sendBtn = document.getElementById("send")
const successBtn = document.querySelector(".main_contact-content-form-input-success");

sendBtn.addEventListener("click", (e) => {
  e.preventDefault();
  successBtn.style.display = "flex";
  sendBtn.style.display = "none";
  setTimeout(() => {
    successBtn.style.display = "none";
    sendBtn.style.display = "block";
  }, 2000);
})