import {useState} from "react";
import * as React from "react";
import {InputText} from "../../../shared/components/ui/inputText.tsx";
import {Button} from "../../../shared/components/ui/button.tsx";
import {useAuth} from "../hook/useAuth.ts";
import {Link, useNavigate} from "react-router-dom";

export function LoginPage() {
    //to store the email and password input values
    const [email, setEmail] = useState('')
    const[password, setPassword] = useState('')


    const [error, setError] = useState('')

    // to prevent the user to click the login button multiple times while the request is being processed
    const [isSubmitting, setIsSubmitting] = useState(false)
    const {signIn} = useAuth()
    const navigate = useNavigate()

    async function handleSubmit(event: React.FormEvent){
        event.preventDefault() // to stop the page from refreshing when the form is submitted
        setError('')
        setIsSubmitting(true)

        try{
            //if the email and password are correct, create the session and redirect to the homepage
            await signIn({email, password})
            navigate('/')
        }catch{
            setError('Invalid email or password')
        }finally{
            setIsSubmitting(false)
        }
    }

    return(
        <div className="flex flex-col gap-5">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <InputText label={'Email'} name={'email'} placeholder={'email@example.com'} value={email} onChange={(e) =>setEmail(e.target.value)}/>
                <InputText label={'Password'} name={'password'} placeholder={'********'} value={password} onChange={(e) =>setPassword(e.target.value)}/>
                <Button text={isSubmitting ? 'Iniciando sesión...' : 'Iniciar sesión'} type="submit"></Button>
            </form>
            {error && <p className="text-accent-text text-sm">{error}</p>}
            <p>
                ¿No tienes cuenta? <Link to="/register" className="text-accent-button">Regístrate</Link>
            </p>
        </div>

    )
}