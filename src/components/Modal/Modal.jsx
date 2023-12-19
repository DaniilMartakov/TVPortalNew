import React from 'react'
import './modal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'

export default function Modal({active , setActive , item , count , name}) {
    const desc = item.description
    const price = item?.price * count

  return (
    <div className={active ? 'modalka active' : 'modalka'} onClick={() => setActive(false)}>
        <div className={active ? "modal__content active" : "modal__content"} onClick={e => e.stopPropagation()}>
            <div className="modal__title">
            <div >
                Товар добавлен в корзину
            </div>
            <div onClick={() => setActive(false)} style={{backgroundColor: '#03256C', width: '40px' , height: '40px' , borderRadius: '10px', display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
            <FontAwesomeIcon  style={{color:'#e5f4fb' }} icon={faX} />
            </div>
            </div>
            <hr style={{borderColor: 'black'}} />
            <div className="modal__text">
                <p className='modalka-title'>
                {name}
                </p>
                <br />
                <div className='modal-description'>
                {desc ? 
                    desc
                    : 
                    '' }
                    </div>
                <br />
                {count ? `Колличество: ${count}`: '' }
                <br />
                {price ? `Общая сумма: ${price}руб.`:'' }
            </div>
        </div>
    </div>
  )
}
