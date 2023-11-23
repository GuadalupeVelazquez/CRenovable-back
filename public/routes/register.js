document.getElementById('aca va el id del formulario').addEventListener('submit', async(e)=>{
    e.preventDefault();
    console.log(e.targer.children.user.value);

    const res =await fetch('http://localhost:4000/register', {
    method: "POST",
    headers:{
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        user: e.target.children.user.value,
        email: e.target.children.email.value,
        password: e.target.children.password.value
    })
    })
    if(!res.ok) return;
    const resJson = await res.json();
    if(resJson.redirect){
        window.location.href = resJson.redirect;
    }
})