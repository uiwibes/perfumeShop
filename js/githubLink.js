document.addEventListener("DOMContentLoaded", function () {
    alert(window.location.hostname);
    if (window.location.hostname === "uiwibes.github.io") {
      document.querySelectorAll("a").forEach(link => {
        link.href = "/perfumeShop/" + link.getAttribute("href");
      });
    }
});
