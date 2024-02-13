import { signInWithGoogle, checkuser, signOutUser, getPfp, uploadImgAndGetURL } from "./firebase.js";

// handle Form Submit
document.getElementById('studentForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    handleFormSubmit();

    // TODO: construct this object & send it to firebase
    // const values = {
    //     index: {
    //         general: {
    //             class: classVal,
    //             div: div_val,
    //             name: name,
    //             aboutPic: photo,
    //             roll: rollNo,
    //             wikiURL: url
    //         }
    //     }
    // }
    // console.log(values);
});

//  login button
const signInButton = document.getElementById("google-signin-button");
signInButton.addEventListener("click", signInWithGoogle);

// logout button
const logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener("click", signOutUser);

// profile image
const profileImage = document.getElementById("pfp");

// next button 
const nextButton = document.getElementById("next_button");
nextButton.addEventListener("click", () => {
    const userExists = checkuser();

    if (userExists) {
        stopHighlightLogin();
    } else {
        showSigninPrompt();
        startHighlightLogin(); 
    }
})


// highight login button
function startHighlightLogin() {
    signInButton.classList.add("highlight-animation");
    document.body.scrollIntoView({behavior: "smooth", block: "start"});
}
function stopHighlightLogin() {
    signInButton.classList.remove("highlight-animation"); // creates no error if the class isn't present
}

// handle form submit function
async function handleFormSubmit() {
    const url = document.getElementById('url').value;
    const name = document.getElementById('name').value;
    const rollNo = document.getElementById('rollNo').value;
    const classVal = document.getElementById('class').value;
    const div_val = document.getElementById('div').value;
    const aboutPhoto = document.getElementById('photo').files[0];
    
    if(!url || !name || !rollNo || !classVal || !div_val || !aboutPhoto) {
        return null; // stop the function, ui response is already sent in index.html
    }

    const aboutPhotoURL = await uploadImgAndGetURL(aboutPhoto.name, aboutPhoto);

    if (!aboutPhotoURL) {
        return null; // break the function!
    }

    const values = {
        index: {
            general: {
                class: classVal,
                div: div_val,
                name: name,
                aboutPic: aboutPhotoURL,
                roll: rollNo,
                wikiURL: url
            }
        }
    }
    return values
}

// function to switch login / logout buttons
export function switchButtons() {
    const userExists = checkuser();
    let googleImage = getPfp();
    googleImage = googleImage ? googleImage : "https://placehold.co/24x24";
    if (userExists) {
        signInButton.style.display = "none"; // hide signin button
        logoutButton.style.display = "flex"; // show logout button
        profileImage.src = googleImage;
    } else {
        signInButton.style.display = "block"; // show signin button
        logoutButton.style.display = "none"; // hide logout button
    }
}


// Function to show the toast

function showSigninPrompt() {
    const toast = document.getElementById('signinPromptToast');
    // console.log(toast);
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
}

export function showLogoutToast() {
    const toast = document.getElementById('logoutToast');
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
}

export function showLoginToast(name) {
    const toast = document.getElementById('loginToast');
    const toastMessage = document.getElementById('login_toast_message');
    toastMessage.innerHTML = `Hi there! ${name}`;
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
}







// show image preview
document.getElementById('photo').addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function() {
            document.getElementById('previewImage').src = reader.result;
            document.getElementById('photoPreview').style.display = 'block';
        }
        reader.readAsDataURL(file);
    }
});









// //  <------------- FOR TESTING ------------->
// const butt = document.getElementById("butt");
// butt.addEventListener("click", checkuser);

