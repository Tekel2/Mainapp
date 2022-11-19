

export  function getProfileFromWithSearchedText(profile, locality){
    const url = 'http://192.168.43.217:8000/api/profile/?search='+ profile + ' ' + locality
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.log(error))
}

export  function getProfileDetailWithid(idprofile){
    const url = 'http://192.168.43.217:8000/api/'+ idprofile
    //alert('id profile: ' + idprofile)
    return fetch(url)
        .then((response) => response.json())
        
        .catch((error) => console.log(error+'44444444444'))

}
export function profileregister(username_txt, email_txt, password_txt){
    return fetch('http://192.168.43.217:8000/api/register/', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username_txt,
            email: email_txt,
            password: password_txt
        })

        // .then((response) => response.json())
        
        // .catch((error) => console.log(error+'44444444444'))
    }).then((response) => response.json())
    .then((responseJson) =>{
        console.log(responseJson)
    } )
    .catch((error) => console.log(error+'tekeu Capsule'))
}

export function profilelogin(username_txt, password_txt){
    console.log(username_txt)
    console.log(password_txt)

    try{
        return fetch('http://192.168.43.217:8000/api/login/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username_txt,
                password: password_txt
            })
            
        }).then((response) => response.json())
        .then((responseJson) =>{
            console.log(responseJson)
        } )
    }catch(error) {
        console.log(error+'tekeu Capsule')
    } 
}

export function postNoteOfProfile(idPRofile, note, nbreAvis){
    
}