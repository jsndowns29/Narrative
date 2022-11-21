import React from 'react';
import { useNavigate } from 'react-router';
import { parseDate } from '../helpers/helpers';

export default function BuyOrderTile({buyOrder}) {

    const navigate = useNavigate();

    const tile = <div className="buyorder-tile">
        <div className="buyorder-tile-content-wrapper">
            <div className="buyorder-tile-grid">
                <div>
                    <p className="title gray-text">Order Name</p>
                    <br/>
                    <p>{buyOrder.name}</p>
                </div>
                <div>
                    <p className="title gray-text">Date Created</p>
                    <br/>
                    <p>{parseDate(buyOrder)}</p>
                </div>
                <div>
                    <p className="title gray-text">Budget</p>
                    <br/>
                    <p>{"$"+buyOrder.budget}</p>
                </div>
                <div>
                    <button className="details-button" onClick={()=>{navigate('/buyorder/details/'+buyOrder.id); window.location.reload()}}>details</button> 
                </div>
               
                </div>

        </div>
    </div>;

    return (
        <div>
            {tile}
        </div>
    )
}
