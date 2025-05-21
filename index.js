//Edit profile functionality
const editBtn = document.querySelector(".edit-icon");
const modal = document.getElementById("editModal");
const closeBtn = document.getElementById("closeModal");

//display modal when edit icon is clicked
editBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

//remove modal from display when the close button is clicked
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

//if a click happens anywhere on the modal's background while it;s in display, close the modal
window.addEventListener("click", (e) => {
  if (e.target == modal) modal.style.display = "none";
});

const editForm = document.querySelector("#editForm");
const heading = document.querySelector(".heading-text");
const bio = document.querySelector(".profile-parag");
const profileImg = document.querySelector(".profile-img");

//handle submit even on form and update profile
editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newName = document.getElementById("username").value.trim();
  const newBio = document.getElementById("bio").value.trim();
  const imageFile = document.getElementById("profileImage").files[0];

  // Only update the name if a new one was provided
  if (newName !== "") {
    heading.textContent = newName;
  }

  // Only update the bio if a new one was provided
  if (newBio !== "") {
    bio.textContent = newBio;
  }

  // Only update the profile image if a new file was selected
  if (imageFile) {
    const reader = new FileReader();
    reader.onload = function (e) {
      profileImg.src = e.target.result;
    };
    reader.readAsDataURL(imageFile);
  }

  // Close the modal
  modal.style.display = "none";
});
