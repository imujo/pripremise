import fetchProgress from 'fetch-progress';
import emailjs from 'emailjs-com';
const {REACT_APP_IP,REACT_APP_EMAILJS_SERVICE_ID, REACT_APP_EMAILJS_TEMPLATE_ID, REACT_APP_EMAILJS_USER_ID} = process.env


// CAPITALIZE
export function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);
}


// GET MATURE
export const getMature = (sortOrder, setmatureList, setmatureLoaded) => {
    fetch(`${REACT_APP_IP}/mature/${sortOrder}`, {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }}
        )
        .then(res => res.json())
        .then(data => setmatureList(data))
        .then(setmatureLoaded(true))
        .catch(err => {console.log(err); setmatureLoaded(false)})
}


// ITERATE MATURA
export const iterateMatura = (predmet) => {
    fetch(`${REACT_APP_IP}/iterate/${predmet}`,{
        method: 'post',
        headers: {'Content-Type':'application/json'}
    })
}


// CHECK IF ERROR IN CARD
export const checkRazinaError = (isselected, dvijerazine, razinaA, razinaB) => {
    if (isselected === 1 && ((razinaA === true || razinaB === true ) || dvijerazine===false)){
        return false
    }else if(isselected===1){
        return true
    }
}

// SEND REQUEST
export const sendRequest = (data, predmet, years, dvijerazine, razinaA, razinaB, setrequest) => {
    data.push({
        predmet: predmet,
        years: years,
        dvijerazine: dvijerazine,
        razinaA: razinaA,
        razinaB: razinaB,
    })
    setrequest(data)
}

// ARRAY OF OBJECT TO OBJECT OF OBJECTS
export const arrayObjectsToObjectObjects = (arrayObjects) => {
    let objectObjects = {};
    for (var i = 0; i < arrayObjects.length; i++) {
        objectObjects[arrayObjects[i].predmet] = {
            dvijerazine: arrayObjects[i].dvijerazine,
            razinaA: arrayObjects[i].razinaA,
            razinaB: arrayObjects[i].razinaB,
            years: arrayObjects[i].years
        };
    }
    return objectObjects
}


// REQUEST DOWNLOAD
export const requestDownload = (objectObjects, setprocessing, setpercentage, setdownloaded) => {
    fetch(`${REACT_APP_IP}/matured`,{
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(objectObjects)
    })
    .then(
        fetchProgress({
            onProgress(progress){
                setprocessing(0)
                setpercentage(progress.percentage)
            }
        })
    )
    .then((res)=>res.blob())
    .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Mature.zip');
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        setpercentage(0)
        setdownloaded(1)
        setTimeout(function(){ setdownloaded(0) }, 5000);
      });
}

// SEND EMAIL
export const sendEmail = (e, setsent, setnotsent) => {
    e.preventDefault();

    emailjs.sendForm(REACT_APP_EMAILJS_SERVICE_ID, REACT_APP_EMAILJS_TEMPLATE_ID , e.target, REACT_APP_EMAILJS_USER_ID)
    .then(() => {
        setsent(1)
        setTimeout(function(){ setsent(0) }, 4000);
    }, (error) => {
        console.log(error)
        setnotsent(1)
        setTimeout(function(){ setnotsent(0) }, 4000);
    });
    e.target.reset()
}