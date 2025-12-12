console.log("User menu script loaded");
document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("userMenuToggle");
    const dropdown = document.getElementById("userMenuDropdown");
    if (toggle && dropdown) {
        toggle.addEventListener("click", () => {
            dropdown.classList.toggle("hidden");
        });
        document.addEventListener("click", (e) => {
            if (!dropdown.contains(e.target) && !toggle.contains(e.target)) {
                dropdown.classList.add("hidden");
            }
        });
    }
});
