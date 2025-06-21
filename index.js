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