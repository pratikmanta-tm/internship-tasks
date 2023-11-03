// import { useEffect } from 'react';
import addline from '../assets/add-line.svg';
import { useState } from 'react';




export default function Filters( {item, index, setCategories, setPrices, categories, prices} ) {

    

    function checkedFilter(check, fil, i) {

        switch (item.filter) {
            case "Category":
                if (check) {
                    setCategories(new Map(categories).set(fil.toLowerCase(), null));
                } else {
                    const newCategories = new Map(categories);
                    newCategories.delete(fil.toLowerCase());
                    setCategories(newCategories);
                }
                break;
            case "Price":
                if (check){
                    setPrices(new Map(prices).set(item.ranges[i][0], item.ranges[i][1]));
                }
                else {
                    const newPrices = new Map(prices);
                    newPrices.delete(item.ranges[i][0], item.ranges[i][1]);
                    setPrices(newPrices);
                }
                break;
        
            default:
                break;
        }
    }

    const [slide, setSlide] = useState(false);

    return(
      <li key={`filterli${index}`} className='filter-items'> <span> {item.filter.toUpperCase()} <img src={addline} onClick={() => setSlide(!slide)} alt='' height="20px" id={`more-${index}` } /></span> 
        <div key={`lidiv${index}`} className={`sidenav-wrapper ${slide ? 'active' : ''}`} >
          <ul key={`divlist${index}`} className='category-items'>
            {item.items.map((filteritem, index) => (
              <FilterList key={index} item={filteritem} checkedFilter={checkedFilter} i={index} />
            ))}
          </ul>
        </div>
      </li>
    )
}
  
  
function FilterList({item, checkedFilter, i}) {

    return(
        <li> {item} <input type='checkbox' onChange={(e) => checkedFilter(e.target.checked, item, i)} ></input> </li>
    )
}


