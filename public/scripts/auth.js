//Listen For Auth Status Changes

auth.onAuthStateChanged(user => {
    if(user){
        db.collection('users').doc(user.uid).collection('yatch').onSnapshot(snapshot => {
            setupGuides(snapshot.docs);
            setupUI(user);
        },err => {
            console.log(err.message);
        });//Bunlari buraya ekleyerek sadece Login olundugunda gorulmesini sagladik.
    }else{
        setupGuides();
        setupUI();
    }
});

// Yarisci Olusturma
const createRacer = document.querySelector('#createRacer');
auth.onAuthStateChanged(user => {
    if(user){
        createRacer.addEventListener('submit',(e) => {
            e.preventDefault();
        
            db.collection('users').doc(user.uid).collection('racer').add({
                racerName : createRacer['racerName'].value,
                racerLicenceNumber : createRacer['racerLicenceNumber'].value,
                racerClub : createRacer['racerClub'].value,
                racerMobile : createRacer['racerMobile'].value
            }).then(() => {
                console.log('Yarisci Eklendi');
                const modal = document.querySelector('#modal-createCrew');
                M.Modal.getInstance(modal).close();
                window.location.reload();
            })
        })
    }else{
        
    }
})

//Yarisci Goruntuleme
auth.onAuthStateChanged(user => {
    if(user){
        db.collection('users').doc(user.uid).collection('racer').onSnapshot(snapshot => {
            setupRacers(snapshot.docs);
        },err => {
            console.log(err.message);
        });//Bunlari buraya ekleyerek sadece Login olundugunda gorulmesini sagladik.
    }else{
        
    }
});


//Signup

const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();


    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;


    //Sign Up User
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        console.log(cred.user);
    }).then(() => {
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    }).catch((e) =>{
        const signUpError = document.querySelector('#signUpError');
        signUpError.innerHTML = e.message;
    })
});


//Logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();


    console.log("Cikis Yapiyorum!");
    auth.signOut();
    

});

//Login

const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
        
        return auth.signInWithEmailAndPassword(email, password).then(cred => {

            //close Login Modal
            const modal = document.querySelector('#modal-login');
            M.Modal.getInstance(modal).close();
            loginForm.reset();
        })
    }).catch((e) => {
        const loginError = document.querySelector('#loginError');
        loginError.innerHTML = e.message;
    })

    

});