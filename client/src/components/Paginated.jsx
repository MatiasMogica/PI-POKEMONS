import React from "react";
import styles from './styles/Paginated.module.css'

export default function Paginated({pokesPerPage, allpokes, paginated}){
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(allpokes/pokesPerPage); i++) {
        pageNumbers.push(i)       
    }

    return(
        <div className={styles.pagination_cointainer}>
                {
                    pageNumbers && pageNumbers.map(number => (
                        <div key={number} onClick={() => paginated(number)} className={styles.pagination}>
                            <span>
                            {number}
                            </span>
                        </div>
                    ))
                }
        </div>
    )
    //     <div className={styles.pagination_cointainer}>
    //   {pageNumbers?.map((num) => (
    //     num !== currentPage ?
    //     <div key={num} onClick={()=>paginated(num)} className={styles.pagination}>
    //       <span>
    //         {num} 
    //       </span>
    //     </div>
        

}