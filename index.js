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

// ===================== NGÔN NGỮ =====================
const vieLang = document.getElementById("vie-language");
const usaLang = document.getElementById("usa-language");

async function setLanguage(lang) {
  try {
    const res = await fetch(`./lang/${lang}.json`);
    const translations = await res.json();

    // 1️⃣ Dịch text trong thẻ
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (translations[key]) el.textContent = translations[key];
    });

    // 2️⃣ Dịch placeholder
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (translations[key]) el.placeholder = translations[key];
    });

    // 3️⃣ Dịch title (nếu có)
    document.querySelectorAll("[data-i18n-title]").forEach((el) => {
      const key = el.getAttribute("data-i18n-title");
      if (translations[key]) el.title = translations[key];
    });

    // 4️⃣ Dịch alt ảnh (nếu có)
    document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
      const key = el.getAttribute("data-i18n-alt");
      if (translations[key]) el.alt = translations[key];
    });

    // 5️⃣ Lưu ngôn ngữ hiện tại
    localStorage.setItem("lang", lang);

    // 6️⃣ Hiển thị cờ tương ứng
    if (lang === "vi") {
      vieLang.classList.remove("hidden");
      usaLang.classList.add("hidden");
    } else {
      vieLang.classList.add("hidden");
      usaLang.classList.remove("hidden");
    }
  } catch (err) {
    console.error("Không thể tải file ngôn ngữ:", err);
  }
}

// Sự kiện click đổi cờ
usaLang.addEventListener("click", () => setLanguage("vi"));
vieLang.addEventListener("click", () => setLanguage("en"));

// Tự động khôi phục ngôn ngữ đã lưu
const savedLang = localStorage.getItem("lang") || "en";
setLanguage(savedLang);


// Giao diện sáng / tối
const lightMode = document.getElementById("light-mode");
const darkMode = document.getElementById("dark-mode");
const modalDownloadCV = document.querySelector(".modal-downloadcv")


lightMode.addEventListener("click", () => {
  lightMode.classList.add("hidden");
  darkMode.classList.remove("hidden");
  document.body.classList.add("dark-theme");
  modalDownloadCV.classList.add("dark-theme");
});

darkMode.addEventListener("click", () => {
  darkMode.classList.add("hidden");
  lightMode.classList.remove("hidden");
  document.body.classList.remove("dark-theme");
  modalDownloadCV.classList.remove("dark-theme");
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
const nextTechBtns = document.querySelectorAll(".next-tech");
const prevTechBtns = document.querySelectorAll(".prev-tech");

// Object để lưu trạng thái scroll của từng project
const techScrollStates = {};

nextTechBtns.forEach((nextBtn, index) => {
  const techContainer = nextBtn.closest('.main_projects-content-detail-description-techs');
  const techItems = techContainer.querySelector(".long-list");
  const container = techContainer.querySelector('.long-list-container');
  
  // Khởi tạo state cho project này
  if (!techScrollStates[index]) {
    techScrollStates[index] = { currentPosition: 0 };
  }

  nextBtn.addEventListener("click", () => {
    // Sử dụng scrollWidth để lấy chiều rộng thực của toàn bộ list
    const totalWidth = techItems.scrollWidth;
    const containerWidth = container.offsetWidth;
    const maxScroll = (totalWidth - containerWidth);
    const step = containerWidth * 1; // Mỗi lần di chuyển 100% container width
    
    let newPosition = techScrollStates[index].currentPosition + step;
    
    // Đảm bảo không vượt quá giới hạn
    if (newPosition > maxScroll) {
      newPosition = maxScroll;
    }
    
    // Chỉ di chuyển nếu có thể di chuyển
    if (newPosition > techScrollStates[index].currentPosition) {
      techScrollStates[index].currentPosition = newPosition;
      techItems.style.transform = `translateX(-${newPosition+5}px)`;
      console.log(`Project ${index + 3}: Moved ${newPosition}px (${((newPosition/totalWidth)*100).toFixed(1)}%)`);
    }
  });
});

prevTechBtns.forEach((prevBtn, index) => {
  const techContainer = prevBtn.closest('.main_projects-content-detail-description-techs');
  const techItems = techContainer.querySelector(".long-list");
  const container = techContainer.querySelector('.long-list-container');
  
  prevBtn.addEventListener("click", () => {
    const containerWidth = container.offsetWidth;
    const step = containerWidth * 1; // Mỗi lần di chuyển 100% container width (giống next)
    
    let newPosition = techScrollStates[index].currentPosition - step;
    
    // Đảm bảo không nhỏ hơn 0
    if (newPosition < 0) {
      newPosition = 0;
    }
    
    // Chỉ di chuyển nếu có thể di chuyển
    if (newPosition < techScrollStates[index].currentPosition) {
      techScrollStates[index].currentPosition = newPosition;
      
      if (newPosition === 0) {
        techItems.style.transform = "translateX(0)";
        console.log(`Project ${index + 3}: Reset to start`);
      } else {
        techItems.style.transform = `translateX(-${newPosition}px)`;
        console.log(`Project ${index + 3}: Moved back to ${newPosition}px`);
      }
    }
  });
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

document.getElementById("shareBtn").addEventListener("click", async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: document.title,
        text: "For the best experience, please view on laptop.",
        url: location.href
      });
    } catch (err) {
      console.log("Share canceled");
    }
  } else {
    // fallback mở Facebook
    const url = encodeURIComponent(location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
  }
});

// Modal DownloadCV
const downloadcvButton = document.querySelector(".header__banner-button-downloadcv")
const modalDownloadCVOverlay = document.querySelector(".modal-downloadcv-overlay")
const modalDownloadCVClose = document.querySelector(".modal-downloadcv-close")

downloadcvButton.addEventListener('click', ()=> {
  modalDownloadCV.classList.remove("hidden");
  modalDownloadCVOverlay.classList.remove("hidden");
  // document.body.style.overflow = "hidden";
})

modalDownloadCVClose.addEventListener("click", ()=> {
  modalDownloadCV.classList.add("hidden");
  modalDownloadCVOverlay.classList.add("hidden");
})

modalDownloadCVOverlay.addEventListener("click", ()=> {
  modalDownloadCV.classList.add("hidden");
  modalDownloadCVOverlay.classList.add("hidden");
})
