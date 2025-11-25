window.showToast = (message, type = "success") => {
  const container = document.getElementById("toast-container")

  const toast = document.createElement("div")
  toast.className = `toast toast-${type}`
  toast.textContent = message

  container.appendChild(toast)

  setTimeout(() => {
    toast.classList.add("hide")
  }, 1500)

  setTimeout(() => {
    toast.remove()
  }, 2000)
}

document.addEventListener("DOMContentLoaded", () => {
  const flash = document.querySelector(".flash-server")
  if (flash) {
    showToast(flash.dataset.message, flash.dataset.type)
    flash.remove()
  }
})
