document.addEventListener("DOMContentLoaded", function () {
    // alert(window.location.host);
    if (window.location.host === "uiwibes.github.io") {
      document.querySelectorAll("a").forEach(link => {
        link.href = "/perfumeShop/" + link.getAttribute("href");
      });
    }
});
