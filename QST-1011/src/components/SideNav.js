

import filterdata from '../filters.json';
import Filters from './Filters';


export default function SideNav( {categories, prices, setCategories, setPrices} ) {

    return(
      <aside>
        <div className="sidenav-container">
          <div className="sidenav">
            <ul className="sidenav-list">
              {filterdata.map((item, index) => (
                <Filters key={index} item={item} index={index} setCategories={setCategories} setPrices={setPrices} categories={categories} prices={prices} />
              ))}
            </ul>
          </div>
        </div>
      </aside>
    );
}
  
  
