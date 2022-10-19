import Link from "next/link";
import { useState } from "react";

export default function Login(){
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");

    const handlerSubmitted = async (e)=>{
        e.preventDefault();

        const ftch = await fetch(`/api/login?user=${user}&password=${pass}`);
        const res = await ftch.json();
        console.log(res);
        if(res.success){
            window.location.href = '/';
        }
    }
    return (
        <form onSubmit={(e)=>handlerSubmitted(e)}>
            <div>
                <label>Cuenta</label>
                <input type="text" onChange={(e)=>setUser(e.target.value.trim().toLowerCase())}/>
            </div>
            <div>
                <label>Contraseña</label>
                <input type="password" onChange={(e)=>setPass(e.target.value)}/>
            </div>
            <div>
                <input type="submit" value="Conectarse" disabled={(user.trim() == "" || pass == "")?true:false}/> o <Link href="/signin">Registrarse</Link>
            </div>
        </form>
    )
}