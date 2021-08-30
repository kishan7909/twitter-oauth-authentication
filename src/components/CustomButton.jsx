import React from 'react'
import { Button } from '@material-ui/core'

const CustomButton = ({ handleClickOpen, handleLoadData }) => {
    return (
        <>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Open popup
            </Button>
            <Button id="loadmoreButton" variant="contained" color="primary" onClick={handleLoadData} hidden={true} style={{ display: "contents" }}>
                Load more button
            </Button>
        </>
    )
}

export default CustomButton