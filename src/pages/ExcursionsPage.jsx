import React, { useEffect } from 'react'
import { FooterNavigation } from '../components/Footer_navigation/FooterNavigation'
import CardExcursions from '../components/CardExcursions/CardExcursions'
import './stylePage/Excursion.css'
import { useDispatch, useSelector } from 'react-redux'
import { getExcThunk } from '../redux/actions/infoAction'
import { NavLink } from 'react-router-dom'
export default function ExcursionsPage() {
  const allExcursions = useSelector(store => store.info);


  const dispatch = useDispatch();
  const data = {
    info: {
      action: "get_excursions"
    }
  }

  useEffect(() => {
          dispatch(getExcThunk(data))
          window.scrollTo(0, 0)
      }, []);
    

    return (
    <>
        <div className='one-card-excursions'>
            <div>
                <h1 className='title-excursion'>ЭКСКУРСИИ</h1>
            </div>
              {allExcursions?.length > 0 ? (allExcursions.map((el) => 
              <NavLink to={`/ex/excursions${el?.city_id}`} key={el?.city_id}>
                <CardExcursions   item={el}/> 
              </NavLink>
              )) : (<div>Loading...</div>)}
        </div>
    <FooterNavigation/>
    </>
  )
}
