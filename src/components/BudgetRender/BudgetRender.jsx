import React from 'react';
import './BudgetRender.css';


const BudgetRender = ()=>{
    return (
        <div className="BudgetRender">
         <img className="BudgetRender-img" src="/iconBudgetRender.png" alt ="budget picture" />
         <span className="BudgetRender-span">100 грн/</span><span className="BudgetRender-span">1500 грн</span>
       
            </div>
    )
}

export default BudgetRender;