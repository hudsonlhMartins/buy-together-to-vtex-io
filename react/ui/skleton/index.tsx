import React from "react";
import styles from './styles.css'

interface ICardLoadingProps {
    quantity?: number
}
export const SkeletonBuyTogether = ({quantity=3}:ICardLoadingProps)=>{

    return(
        <div className={`${styles['card-skeleton-loading-container']} flex `}>
            {Array.from({ length: quantity }, (_, index) => index + 1).map((_)=>(
                <div className={`${styles['card-skeleton-loading']}`}>

                </div>
            ))}
        </div>
    )
}
