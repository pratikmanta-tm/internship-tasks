import { useEffect } from "react";

export default function PageButton({ setFinalProducts, products, page, setPage, itemNos }) {
    let pageStart = (page - 1) * itemNos;
    let pageEnd = pageStart + itemNos;
    let n = products.length;
  
    useEffect(() => {
      setFinalProducts(products.slice(pageStart, pageEnd));
    }, [page, itemNos, products, setFinalProducts, pageStart, pageEnd]);

    useEffect(() => {
        if (n <= itemNos) {
            setPage(1);
        }
    }, [itemNos, products, n])
  
    return (
      <div id="page-number-wrapper">
        {n > itemNos && <Buttons n={Math.ceil(n / itemNos)} setPage={setPage} page={page} />}
      </div>
    );
  }

function Buttons( {n, setPage, page} ) {

    let buttons = [];
    for(let i = 1; i <= n ; i++) 
    buttons.push(i);

    function handleClick(i) {
        setPage(i);
    }

    return (
        <>
        {buttons.map((i) => (
            <button value={i} className="page-button" onClick={() => {handleClick(i)}} style={{color: i === page ? 'red' : '#164196'}} > {i} </button>
        ))}
        </>
    )

}
