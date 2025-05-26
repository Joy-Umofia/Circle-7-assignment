// importing from gallery.js
import { galleryData } from './gallery.js'

//Edit profile functionality
const editBtn = document.querySelector('.edit-icon')
const modal = document.getElementById('editModal')
const closeBtn = document.getElementById('closeModal')
const newPostModal = document.getElementById('new-post-modal')
const newPostBtn = document.getElementById('new-post-btn')
const newPostForm = document.getElementById('new-post-form')
const galleryContainer = document.querySelector('.gallery')
const closeNewPostBtn = document.getElementById('close-new-post')
const submitNewPostBtn = document.getElementById('submit-new-post-btn')

//display modal when edit icon is clicked
editBtn.addEventListener('click', () => {
  modal.style.display = 'flex'
  editForm.reset()
})

//remove modal from display when the close button is clicked
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none'
  editForm.reset()
})

//if a click happens anywhere on the modal's background while it;s in display, close the modal
window.addEventListener('click', (e) => {
  if (e.target == modal) modal.style.display = 'none'
})

const editForm = document.querySelector('#editForm')
const heading = document.querySelector('.heading-text')
const bio = document.querySelector('.profile-parag')
const profileImg = document.querySelector('.profile-img')

//handle submit even on form and update profile
editForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const newName = document.getElementById('username').value.trim()
  const newBio = document.getElementById('bio').value.trim()
  const imageFile = document.getElementById('profileImage').files[0]

  // Only update the name if a new one was provided
  if (newName) {
    heading.textContent = newName
  }

  // Only update the bio if a new one was provided
  if (newBio) {
    bio.textContent = newBio
  }

  // Only update the profile image if a new file was selected
  if (imageFile) {
    const reader = new FileReader()
    reader.onload = function (e) {
      profileImg.src = e.target.result
    }
    reader.readAsDataURL(imageFile)

    imageFile.style.borderRadius = '18px'
  }

  // Close the modal
  modal.style.display = 'none'
})

//display new post modal when new post button is clicked
newPostBtn.addEventListener('click', (e) => {
  e.preventDefault()
  newPostForm.reset()
  newPostModal.style.display = 'flex'
})

//remove new post modal from display when the close button is clicked

closeNewPostBtn.addEventListener('click', (e) => {
  e.preventDefault()
  newPostForm.reset()
  newPostModal.style.display = 'none'
})

//if a click happens anywhere on the modal's background while it is in display, close the modal
window.addEventListener('click', (e) => {
  if (e.target == newPostModal) newPostModal.style.display = 'none'
})

//handle submit event on new post form and add new post to gallery

newPostForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const newPostCaption = document.getElementById('postCaption').value.trim()
  const newPostImage = document.getElementById('postImage').files[0]

  if (newPostCaption === '') {
    alert('Please enter a caption for your post.')
    submitNewPostBtn.ariaDisabled = true
    submitNewPostBtn.style.cursor = 'not-allowed'
    return
  }

  // Only update the post if a new one was provided
  if (newPostCaption && newPostImage) {
    const reader = new FileReader()
    reader.onload = function (e) {
      const newPostHTML = `
        <div class="gallery-item">
          <img src="${e.target.result}" alt="${newPostCaption}" class="gallery-image" />
          <div class="gallery-caption">
            <span>${newPostCaption}</span>
            <svg class="heart-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z">
            </path>
          </svg>
          </div>
        </div>
      `
      galleryContainer.innerHTML += newPostHTML
    }

    reader.readAsDataURL(newPostImage)
  }
  // Close the modal
  newPostModal.style.display = 'none'
})

// Code to close modal when the Escape key is pressed

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' || event.key === 27) {
    modal.style.display = 'none'
    newPostModal.style.display = 'none'
  }
})

// dynamically displaying each gallery in the browser. the moment the window loads it shows our images
window.addEventListener('DOMContentLoaded', function () {
  let gallery = galleryData
    .map((item) => {
      // destructured each item
      const { img, title, icon } = item
      return `<div class="gallery-item">
        <img src=${img} alt=${title} class="gallery-image" />
        <div class="gallery-caption">
          <span>${title}</span>
          ${icon}
        </div>
      </div> `
    })
    .join('')

  galleryContainer.innerHTML = gallery

  // making the heart icon clickable and changing its color when clicked
  // selecting the heart icon class
  const heartIcon = document.getElementsByClassName('heart-icon')
  // I'm looping through each heart icon abd adding an event listener to it
  Array.from(heartIcon).forEach((icon) => {
    icon.addEventListener('click', () => {
      icon.classList.toggle('active')
      
    })
  })
})
