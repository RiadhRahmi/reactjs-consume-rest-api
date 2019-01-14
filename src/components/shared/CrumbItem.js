import React from 'react'
import {NavLink} from "react-router-dom";


const CrumbItem = ({to, myclass, ...props}) => (
    <li className="breadcrumb-item">
        <NavLink {...props} to={to}>
        </NavLink>
    </li>
)

export default CrumbItem
