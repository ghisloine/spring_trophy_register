const raceList = document.querySelector('#raceTable');
const raceAll = document.querySelector('#RaceList');
const raceRegisterForm = document.querySelector('#raceRegisterForm');
const skipperSelectionField = document.querySelector('#skipperSelectionField');
const navigatorSelectionField = document.querySelector('#navigatorSelectionField');
const racerSelectionField = document.querySelector('#racerSelectionField');
const yacthSelectionField = document.querySelector('#yacthSelectionField');
const raceRegistrationButton = document.querySelector('.raceRegistrationButton');
const crewSubmisson = document.querySelector('.crewSubmission');
const dekontLoader = document.querySelector('#dekontLoader');



let raceFormID;

auth.onAuthStateChanged(user => {
    if(user){
        db.collection("races").orderBy("raceID", "asc").onSnapshot(snapshot => {
            let html = '';
            snapshot.docs.forEach(doc =>{
                const race = doc.data();
                const li = `
                <tr data-id = ${doc.id}>
                    <td>${race.raceName}</td>
                    <td>${race.start}</td>
                    <td>${race.talimatlar}</td>
                    <td>${race.tarih}</td>
                    <td><button class="btn waves-effect waves-light orange disable" type="submit">Göster</button></td>
                    <td><button class="btn waves-effect waves-light blue modal-trigger" type="submit" data-target='modal-races' onclick ='changeFormID("${doc.id}")'>Katıl</button></td>
                </tr>  
                `;
                html += li;
            })
            raceList.innerHTML = html;
        },err => {
            console.log(err.message);
        });
        //Race Situatuon
        
        //Skipper Rendering
        db.collection('users').doc(user.uid).collection('racer').onSnapshot(snapshot => {
            let html = '';
            snapshot.docs.forEach(doc => {
                const racer = doc.data();
                const option = `
                    <p>
                        <label>
                            <input name='skipper' value='${racer.racerName}' data-id='${doc.id}' type="checkbox" onclick="skipperLock(this)"/>
                            <span>${racer.racerName}</span>
                        </label>
                    </p>
                `;
                html += option;
            });           
            skipperSelectionField.innerHTML = html;
        },err => {
            console.log(err.message);
        });
        //Navigator Rendering
        db.collection('users').doc(user.uid).collection('racer').onSnapshot(snapshot => {
            let html = '';
            snapshot.docs.forEach(doc => {
                const racer = doc.data();
                const option = `
                    <p>
                        <label>
                            <input name='navigator' value='${racer.racerName}' data-id='${doc.id}' type="checkbox" onclick="navigatorLock(this)"/>
                            <span>${racer.racerName}</span>
                        </label>
                    </p>
                `;
                html += option;
            });           
            navigatorSelectionField.innerHTML = html;
        },err => {
            console.log(err.message);
        });
        //Crew Rendering
        db.collection('users').doc(user.uid).collection('racer').onSnapshot(snapshot => {
            let html = '';
            snapshot.docs.forEach(doc => {
                const racer = doc.data();
                const option = `
                    <p>
                        <label>
                            <input name='crew' value='${racer.racerName}' data-id='${doc.id}' type="checkbox"/>
                            <span>${racer.racerName}</span>
                        </label>
                    </p>
                `;
                html += option;
            });           
            racerSelectionField.innerHTML = html;
        },err => {
            console.log(err.message);
            console.log('Siktir Git');
        });

        // Yacth Render
        db.collection('users').doc(user.uid).collection('yatch').onSnapshot(snapshot => {
            let html = '';
            snapshot.docs.forEach(doc => {
                const yatch = doc.data();
                const radioButton = `
                <p>
                <label>
                    <input name='yacth' value='${yatch.yatchName}' data-id='${doc.id}' type="checkbox" onclick="yacthLock(this)" required/>
                    <span class="center-align">${yatch.yatchName}</span>
                </label>
            </p>
                `;
                html += radioButton;
            });
            yacthSelectionField.innerHTML = html;
        });





// Ekibi Onayliyorum

crewSubmisson.addEventListener('click', (e) => {
    e.preventDefault();
    raceRegistrationButton.className = 'btn waves-effect waves-light orange raceRegistrationButton';

    var checkboxes = document.querySelectorAll('input[name="' + 'crew' + '"]:checked');
                Array.prototype.forEach.call(checkboxes, function(el) {
                    db.collection('users').doc(firebase.auth().currentUser.uid).collection('racer').doc(el.getAttribute('data-id')).get().then((doc) => {
                        crewArray.push(doc.data());
                    });
                });
                console.log(crewArray);
});

fileThree.addEventListener('change',(e) => {
    uploadedFileThree = e.target.files[0];
    console.log(uploadedFileThree);

});
// Submit Button
raceRegistrationButton.addEventListener('click', (e) => {
            e.preventDefault();
            //crewArray değeri seçilen yarışçıların data-id değerlerini taşıyor.
            // Crew Listesinde secilen kisileri burda aliyoruz.
            // 
            db.collection('races').doc(raceFormID).collection('racing-teams').add({
                skipper : skipperArray[0],
                navigator : navigatorArray[0],
                crew : crewArray,
                yacth : yacthArray,
                situation : 'waiting'
            }).catch((err) => {
                console.log(err.message);
            });
            M.toast({html: 'Yarışçı Kayıtlarınız Yapıldı!'})

            createPDF(yacthArray, skipperArray, navigatorArray, crewArray);
            
            
            var storageRefThree = firebase.storage().ref(yatchNameField + '/' + uploadedFileThree.name);
            var task = storageRefThree.put(uploadedFileThree);
            task.on('state_changed',
            function progress(snapshot){
                var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                dekontLoader.style.width = percentage + "%";
            },
            function error(err){
                alert(err.message);
            },
            function complete(){
                console.log('Dosya Yuklenmesi Tamamlandi!');
                const modal = document.querySelector('#modal-races');
                M.Modal.getInstance(modal).close();
                M.toast({html: 'Dekont Yüklemeniz Gerçekleşti!'})
                M.toast({html: 'Birazdan Anasayfaya Yönlendirileceksiniz'})
                setTimeout(window.location.replace("/"),5000);
                
            }
            )
            
        });
    }else{
        console.log('Hata');
        
    }
    
});

skipperArray = [];
navigatorArray = [];
crewArray = [];
yacthArray = [];
var raceName;
//Kullanim Kosullarini Onayliyorum
function kullanimKosullari(){
    crewSubmisson.className = 'btn waves-effect waves-light blue crewSubmission';
}
var yatchNameField;
//Yatch Register
function yacthLock(el){   
    
    var ckName = document.getElementsByName(el.name);
        for (var i = 0, c; c = ckName[i]; i++) {
         c.disabled = !(!el.checked || c === el);
        }
        if(el.checked){
            db.collection('users').doc(firebase.auth().currentUser.uid).collection('yatch').doc(el.getAttribute('data-id')).get().then((doc) =>{
                yacthArray.push(doc.data());
                yatchNameField = yacthArray[0].yatchName
            });
           
        }else{
            console.log('Hata');
            yacthArray.pop();
        }
}
//Skipper CheckBox
function skipperLock(el){   
    var ckName = document.getElementsByName(el.name);
        for (var i = 0, c; c = ckName[i]; i++) {
        c.disabled = !(!el.checked || c === el);
        }
        raceFormID = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute('data-id');
        if(el.checked){
            db.collection('users').doc(firebase.auth().currentUser.uid).collection('racer').doc(el.getAttribute('data-id')).get().then((doc) =>{
                skipperArray.push(doc.data());
            });
            console.log(skipperArray);
        }else{
            /*db.collection('races').doc(raceFormID).collection('racing-teams').delete(
                db.collection('users').doc(firebase.auth().currentUser.uid).collection('racer').doc(el.getAttribute('data-id'))
            );*/
            skipperArray.pop();
            console.log(skipperArray);
        }
        db.collection('races').doc(raceFormID).get().then((doc) => {
            raceName = doc.data().raceName;
            console.log(raceName);
        })
    }
// Navigator CheckBox
function navigatorLock(el){   
    
    var ckName = document.getElementsByName(el.name);
        for (var i = 0, c; c = ckName[i]; i++) {
            c.disabled = !(!el.checked || c === el);
            }
            let raceFormID = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute('data-id');
            if(el.checked){
                db.collection('users').doc(firebase.auth().currentUser.uid).collection('racer').doc(el.getAttribute('data-id')).get().then((doc) =>{
                    navigatorArray.push(doc.data());
                });
                console.log(navigatorArray);
            }else{
                /*db.collection('races').doc(raceFormID).collection('racing-teams').delete(
                    db.collection('users').doc(firebase.auth().currentUser.uid).collection('racer').doc(el.getAttribute('data-id'))
                );*/
                navigatorArray.pop();
                console.log(navigatorArray);
            }

        }

function changeFormID(id){
    raceRegisterForm.setAttribute('data-id',id);
}
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
  
  });

  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    let options = {

    };
    var instances = M.FormSelect.init(elems, options);
  });