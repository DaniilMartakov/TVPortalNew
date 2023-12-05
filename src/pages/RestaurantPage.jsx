import React, { useEffect, useState } from 'react'
import { FooterNavigation } from '../components/Footer_navigation/FooterNavigation'
import { Container } from 'react-bootstrap'
import './stylePage/Restaurant.css'
import OneCard from '../components/Menu_card/OneCard'
import { useDispatch, useSelector } from 'react-redux'
import { getBarThunk } from '../redux/actions/infoAction'
import { getBasketThunk } from '../redux/actions/basketAction'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMartiniGlass, faMugHot, faUtensils, faWineGlass } from '@fortawesome/free-solid-svg-icons'
import { Navigate } from 'react-router-dom'

export default function RestaurantPage() {
    const allBar = useSelector((store) => store.info);
    const basket = useSelector((store) => store?.basket);
    const room = useSelector((store) => store?.user?.data?.room);

    const [openRest, setOpenRest] = useState(false);
    const [openBar, setBarRest] = useState(false);
    const [openVine, setVineRest] = useState(false);
    const [openTea, setTeaRest] = useState(false);
    const [open , setOpen] = useState(false);
    const [filter, setFilter] = useState();
    const dispatch = useDispatch();

    const menu = allBar?.cards;
    const category = allBar?.categories;
    const restCard= menu?.rest_card;
    const barCard= menu?.bar_card;
    const vineCard= menu?.vine_card;
    const teaCard= menu?.tea_card;
    const allCard = restCard?.concat(barCard)?.concat(vineCard)?.concat(teaCard);
    
    const restCategory = category?.rest_card_categories;
    const barCategory = category?.bar_card_categories;
    const vineCategory = category?.vine_card_categories;
    const teaCategory = category?.tea_card_categories;



  const data = {
    info: {
        action: 'menu_bar' ,
    },
  };
  const getBasket = {
    info: {
      action: 'get_basket_contents',
      room: room
    }
  }
  
  useEffect(()=> {
    dispatch(getBarThunk(data))
    dispatch(getBasketThunk(getBasket))
  },[basket?.length]);

  const clickRestCard = () => {
    setOpenRest((openRest) => !openRest)
    setBarRest(false)
    setTeaRest(false)
    setVineRest(false)
  }
  const clickBarCard = () => {
    setBarRest((openBar) => !openBar)
    setTeaRest(false)
    setVineRest(false)
    setOpenRest(false)
  }
  const clickVineCard = () => {
    setVineRest((openVine) => !openVine)
    setBarRest(false)
    setOpenRest(false)
    setTeaRest(false)
  }
  const clickTeaCard = () => {
    setTeaRest((openTea) => !openTea)
    setBarRest(false)
    setVineRest(false)
    setOpenRest(false)
  }
  const handleClick = (e) => {
    const result = allCard?.filter((i) => i.category === e.name);
    setFilter(result)
    setOpen(true)
}


if(!room){
  return <Navigate to='/' /> 
}

    return (
    <>
    <Container>
      <div>
        <h1 className='menu-name'>РЕСТОРАН</h1> 
      </div>
      <div className='category-rest'>
          <div className='one-category-rest' onClick={clickRestCard}>
            <FontAwesomeIcon  icon={faUtensils} style={{fontSize: '30px'}} />
            <h4 className='type-name'>Меню Ресторана</h4>
          </div>
          <div className='one-category-rest' onClick={clickBarCard}>
            <FontAwesomeIcon icon={faMartiniGlass} style={{fontSize: '30px'}}/>
            <h4 className='type-name'>Барная карта</h4>
          </div>
          <div className='one-category-rest' onClick={clickVineCard}>
            <FontAwesomeIcon icon={faWineGlass} style={{fontSize: '30px'}}/>
            <h4 className='type-name'>Винная карта</h4>
          </div>
          <div className='one-category-rest' onClick={clickTeaCard}>
            <FontAwesomeIcon icon={faMugHot} style={{fontSize: '30px'}}/>
            <h4 className='type-name'>Чайная карта</h4>
          </div>
      </div>
            {openRest ? (<div onClick={clickRestCard} className='name-category-rest'>
              {restCategory.map((e) =><p onClick={()=>handleClick(e)} className='name-title-rest' key={e.id}>{e.name}</p>)}
            </div>) : ''}
            {openBar ? ( <div  onClick={clickBarCard} className='name-category-rest'>
              {barCategory.map((e) =><p onClick={()=>handleClick(e)} className='name-title-rest' key={e.id}>{e.name}</p>)}
            </div>) : ''}
            {openVine ? ( <div  onClick={clickVineCard} className='name-category-rest'>
                {vineCategory.map((e) =><p onClick={()=>handleClick(e)} className='name-title-rest' key={e.id}>{e.name}</p>)}
            </div>) : ''}
            {openTea ? ( <div  onClick={clickTeaCard} className='name-category-rest' >
                {teaCategory.map((e) =><p onClick={()=>handleClick(e)} className='name-title-rest' key={e.id}>{e.name}</p>)}
            </div>) : ''}
      <div className='div-card-rest'>
          <p className='p-card-rest'>{!open ? 'ВСЕ МЕНЮ' : filter?.length === 0 ? 'ТОВАРЫ ОТСУТСТВУЮТ' : filter[0]?.category }</p>
      </div>
        {!open ? (
          <div className='menu-container'>
            {allCard?.map((el) =>
              <OneCard el={el} key={el.id}/>
            )}
          </div>
        ) : (
          <div className='menu-container'>
            {filter?.map((el) =>
              <OneCard  el={el} key={el.id}/>
            )}
          </div>
        )}
    </Container>
    <FooterNavigation />
    </>
  )
}
