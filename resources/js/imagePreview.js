console.log("imagePreview loaded");
document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("image-input");
    const preview = document.getElementById("image-preview");

    input.addEventListener("change", event => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = e => {
            preview.src = e.target.result;
            preview.style.display = "block";
        };
        reader.readAsDataURL(file);
    });
});
