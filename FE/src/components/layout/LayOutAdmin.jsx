import React from 'react'
import { Outlet } from 'react-router-dom'
import HeaderAdmin from '../Admin/HeaderAdmin'

const LayOutAdmin = () => {
    return (
        <>
            <HeaderAdmin />
            <Outlet />
        </>
    )
}

export default LayOutAdmin