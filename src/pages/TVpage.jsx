import React, { useEffect, useState } from 'react'
import { FooterNavigation } from '../components/Footer_navigation/FooterNavigation'
import { Container } from 'react-bootstrap'
import ReactPlayer from 'react-player';
import './stylePage/TV.css'
import TvOneCard from '../components/Tv_One_Card/TvOneCard';
import Search from '../components/Tv_One_Card/Search';
import { useDispatch, useSelector } from 'react-redux';
import { getFilmThunk } from '../redux/actions/infoAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm } from "@fortawesome/free-solid-svg-icons";



export default function TVpage() {
    const allFilms = useSelector((store) => store?.info)
    const dispatch = useDispatch()
    const category = allFilms?.categories
    const film = allFilms?.films

    const [url, setUrl] =useState()
    const [filter , setFilter] = useState()
    const [open , setOpen] = useState(false)
    const [activeIndex, setActiveIndex] = useState(null);
    const [filteredItems, setFilteredItems] = useState(film);
    const [open1 , setOpen1] = useState(false)
    const [openPlayer , setOpenPlayer] = useState(false)



    const data = {
      info: {
        action: 'get_films'
      }
    }

      useEffect(()=> {
        dispatch(getFilmThunk(data))
      },[])


    // после нажатия происходит скрол в начало страницы
    const clickHandler = (el) => {
      window.scrollTo(0, 0);
      setUrl(el.videoUrl)
      setOpenPlayer(true)
    }

    //фильтрация по категории
    const handleClick = (e , index) => {
      const result = film.filter((i) => i.category === e.category);
      setFilter(result)
      setOpen(true)
      setActiveIndex(index)
      setOpen1(false)
      setOpenPlayer(false)
    }

    // динамический поиск по названию
    const handleSearch = (searchTerm) => {
      const filtered = film?.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredItems(filtered);
      setOpen1(true)
      setActiveIndex(null)
      setOpenPlayer(false)
      setOpen(false)
    };


  return (
    <>
    <Container>
    <div>
      <h1 className='tv-name'>ТЕЛЕВИДЕНИЕ</h1>
    </div>
        <div className='category-film'>
              {category?.length > 0 ? 
                (category?.map((e , index) => <div onClick={()=>handleClick(e , index)}  className={index === activeIndex ? "category-name-film--active" : "category-name-film"} key={e.id}>
                  <FontAwesomeIcon icon={faFilm} style={{fontSize: '30px'}}/>
                  <p className='p-category-films'>
                    {e.category}
                  </p>
                </div>)) : ""
              }
      </div>
      <Search  handleSearch={handleSearch}/>
        {openPlayer ? (
          <ReactPlayer 
            url={url}
            width="100%"
            height="100%"
            style={{
                clipPath: 'inset(0 0 5% 0 round  5px 5px 5px 5px)',
                marginTop: '20px'
            }}
              controls
            />
        ) : ''}
      <div className='div-card-film'>
        <p className='p-card-film'>{open ? filter[0]?.category : 'Все фильмы'}</p>
      </div>
      {!open1 ? (!open ? (
        <div className='grid-films' >
          {film?.map((el) => 
            <div onClick={()=>clickHandler(el)}  key={el.id} >
              <TvOneCard film={el}/>
            </div>
          )}
        </div>
      ):(
        <div className='grid-films' >
          {filter?.map((el) => 
            <div onClick={()=>clickHandler(el)}  key={el.id}>
              <TvOneCard film={el} />
            </div>
          )}
        </div>
      )) : (
      <div className='grid-films' >
          {filteredItems?.map((el) => 
            <div onClick={()=>clickHandler(el)} key={el.id}>
              <TvOneCard film={el} />
            </div>
          )}
        </div>
      )}
    </Container>
    <FooterNavigation/>
    </>
  )
}
