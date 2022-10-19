import { useState } from "react"

import Link from 'next/link'

export default function SignIn() {
    const [name, setName] = useState("");
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [confirmPass, setComfirmPass] = useState("");
    const [email, setEmail] = useState("");

    const handlerSubmitted = async (e)=>{
        e.preventDefault();
        const ftch = await fetch(`/api/signin?name=${name}&password=${pass}&user=${user}&email=${email}`);
        const res = await ftch.json();
        console.log(res);

        if(res.success){
            window.location.href = '/'
        }
    }

    return (
        <form onSubmit={(e)=>handlerSubmitted(e)}>
            <div>
                <label>Nombre Completo</label>
                <input type="text" onChange={(e)=> setName(e.target.value)}/>
            </div>
            <div>
                <label>Cuenta</label>
                <input type="text" onChange={(e)=> setUser(e.target.value.toLowerCase())}/>
            </div>
            <div>
                <label>Contraseña</label>
                <input type="password" onChange={(e)=> setPass(e.target.value)}/>
            </div>
            <div>
                <label>Confirmar Contraseña</label>
                <input type="password" onChange={(e)=> setComfirmPass(e.target.value)}/>
            </div>
            <div>
                <label>email</label>
                <input type="text" onChange={(e)=> setEmail(e.target.value)}/>
            </div>
            <div>
                <input type="submit" value="Registrarse" /> o <Link href="/login">Conectarse</Link>
            </div>
        </form>
    )
}