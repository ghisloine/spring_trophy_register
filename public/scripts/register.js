const createSail = document.querySelector('#create-sail');
const fileOne = document.querySelector('#fileOne');
const fileTwo = document.querySelector('#fileTwo');
const ircLoader = document.querySelector('#ircLoader');
const adverLoader = document.querySelector('#adverLoader');
const uploadFiles = document.querySelector('#uploadFiles');

var uploadedFileOne;
var uploadedFileTwo;

//File Upload
fileOne.addEventListener('change',(e) => {
    uploadedFileOne = e.target.files[0];
    var storageRefOne = firebase.storage().ref(createSail['yatch-name'].value + '/' + uploadedFileOne.name);
            var task = storageRefOne.put(uploadedFileOne);
            task.on('state_changed',
            function progress(snapshot){
                var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                ircLoader.style.width = percentage + "%";
                document.querySelector('#registerFormSubmit').classList.add('disabled');
            },
            function error(err){
                alert(err.message);
            },
            function complete(){
                console.log('File One Completed!');
                var Toast = '<span>IRC Belgesi Eklenmiştir</span>';
                M.toast({html: Toast});
                document.querySelector('#registerFormSubmit').classList.remove('disabled');

            }
            );
    console.log(uploadedFileOne);
})

fileTwo.addEventListener('change',(e) => {
    uploadedFileTwo = e.target.files[0];
    var storageRefTwo = firebase.storage().ref(createSail['yatch-name'].value + '/' + uploadedFileTwo.name);
            var task2 = storageRefTwo.put(uploadedFileTwo);
            task2.on('state_changed',
            function progress(snapshot){
                var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                adverLoader.style.width = percentage + "%";
                document.querySelector('#registerFormSubmit').classList.add('disabled');

            },
            function error(err){
                alert(err.message);
            },
            function complete(){
                console.log('File Two Completed');
                var Toast = '<span>Reklam Belgesi Eklenmiştir</span>';
                M.toast({html: Toast});
                document.querySelector('#registerFormSubmit').classList.remove('disabled');

            }
            );
    console.log(uploadedFileTwo);

})


auth.onAuthStateChanged(user => {
    if(user){
        createSail.addEventListener('submit', (e) =>{
            e.preventDefault();
            db.collection('users').doc(user.uid).collection('yatch').add({
                eventName : createSail['first-name'].value,
                yatchName : createSail['yatch-name'].value,
                portAndCountry : createSail['port-and-country'].value,
                sailNumber : createSail['sail-number'].value,
                ircRating : createSail['irc-rating'].value,
                irc0 : createSail['irc-0'].value,
                irc1 : createSail['irc-1'].value,
                irc2 : createSail['irc-2'].value,
                irc3 : createSail['irc-3'].value,
                irc4 : createSail['irc-4'].value,
                irc5 : createSail['irc-5'].value,
                nonIrcRating : createSail['non-irc-rating'].value,
                yearOfConstruction : createSail['year-of-construction'].value,
                overallLength : createSail['overall-length'].value,
                spinnaker : createSail['spinnaker'].value,
                foldingPropeller : createSail['folding-propeller'].value,
                dateOfIssue : createSail['date-of-issue'].value,
                hullColor : createSail['hull-color'].value,
                rigType : createSail['rig-type'].value,
                hullMaterial : createSail['hull-material'].value,
                marinaPonton : createSail['marina-ponton'].value,
                advertisement : createSail['advertisement'].value,
                yatchOwnerName : createSail['yatchOwnerName'].value,
                address : createSail['address'].value,
                telephone : createSail['telephone'].value,
                mobile : createSail['mobile'].value,
                mail : createSail['mail'].value
            }).then(() => {

            });
            var Toast2= '<span>Ana Sayfaya Yönlendiriliyorsunuz!...</span>';
            M.toast({html : Toast2});
            setTimeout(function(){ window.location.replace('/') }, 5000);

        });
    }else{
        setupGuides([]);
        setupUI();
    }
});
