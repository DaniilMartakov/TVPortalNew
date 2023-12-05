import {Form, Button} from "react-bootstrap";
// import {useAddToHomescreenPrompt} from "../interface/IBeforeInstallPromptEvent.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignIn, faDownload} from "@fortawesome/free-solid-svg-icons";
import {getString} from "../languages/Languages";
import axios from 'axios'
import { useState } from "react";
import { getUser } from "../redux/actions/authActions.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function LoginPage() {
    const [inputValue, setInputValue] = useState('введите каюту...');
    // const [prompt, promptToInstall] = useAddToHomescreenPrompt();
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    
    const data = {
        info: {
            action: 'auth' ,
            room : inputValue
        },
    };
    
    
    const sendData = async () => {
        await axios.post('https://базара.net/index.php?route=/react/controller', data )
        .then((response) =>{
            if(response.data.success === true){
                dispatch(getUser(response.data))
                navigate('/main')
            }else alert('Такой комнаты не существует!')
        })
        .catch (console.error());
        };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendData();
    };
    

    return (
        <>
        <div className={'mt-4'} style={{width: '100%', display: "flex", flexDirection: "column", alignItems: "center"}}>
            <div className={'rounded-circle mb-1'} style={{width: '120px', position: "relative", top: '4.2rem', backgroundColor: '#06BEE1'}}> {/*shadow-sm*/}
                <img className={'p-3'} src={'./icons/ship.png'} alt="ship" style={{width: '120px', height:'120px', }}/>
            </div>
        </div>
            <div style={{backgroundColor: '#03256C'}} className={'shadow-lg rounded-3 mx-3 pt-2 shadow-lg'}>
                <div className={'shadow-lg rounded-2 mt-2 p-3'} style={{backgroundColor: '#06BEE1'}}>
                <Form onSubmit={handleSubmit}>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <Form.Label className={'mt-4 pt-2'} style={{fontWeight: 'bold', fontSize: '22px', color: 'black'}}>
                            {getString('Authorization')}
                        </Form.Label>
                        <button className={"link-btn mt-4 mb-1 rounded-circle p-2"} aria-label="Download" 
                                style={{backgroundColor: '#03256C', borderColor: 'rgb(255 123 37 / 0%)', color: 'white'}}>
                            <FontAwesomeIcon icon={faDownload} size={'xl'} width={'26px'}/>
                        </button>
                    </div>
                    <Form.Group controlId="formBasicEmail" className={'mt-4'}>
                        <Form.Label className={'mb-1'} >Введите каюту</Form.Label>
                        <Form.Control type="text" placeholder={inputValue} onChange={handleInputChange} style={{backgroundColor: '' ,borderColor: 'black'}} />
                    </Form.Group>
                    <Button className={'mt-5 mb-2'} type="submit"
                            style={{backgroundColor: '#03256C', width: '100%', color: 'white', borderColor: 'rgb(255 123 37 / 0%)', height: '100%' ,                                  fontSize: '18px', display: 'flex', justifyContent: "center"}}>
                        <div className={'mx-1'}>{getString('Enter')}</div>
                        <FontAwesomeIcon className={'mx-1'} size='xl' icon={faSignIn}/>
                    </Button>
                </Form>
                </div>
            </div>
        </>
    )
}