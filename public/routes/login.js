document.getElementById('id de formulario login').addEventListener('submit', async(e)=>{
    e.preventDefault();
    const user = e.target.children.user.value;
    const password = e.target.childer.password.value;

    const res = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user, password
        })
    });
    if(!res.ok) return;
    const resJson = await res.json();
    if(resJson.redirect){
        window.location.href = resJson.redirect;
    }
})