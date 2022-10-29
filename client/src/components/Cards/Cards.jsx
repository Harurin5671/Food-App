import React from 'react';
import Card from '../Card/Card';
import img from '../../image/fondo-comida-saludable-dibujado-mano_23-2148149083.jpg';
import style from './Cards.module.css';

export default function Cards({data}) {

  return (
    <div>
      {
        data && data.map(r => (
          <div key={r.id}>
            <Card 
             title={r.title}
             diets={
               r.createDb
                 ? r.diets.map((d) => <p className={style.diet} key={d.name}>{d.name}</p>)
                 : r.diets.map((d) => <p className={style.diet} key={d}>{d}</p>)
             }
             image={r.image ? r.image : img}
             id={r.id}
            />
          </div>
        ))
      }
    </div>
  )
}
