import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery, useTheme } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { requestTwitterAuth } from '../actions/twitter'
import { getDataList, getTwitterInit_API, setCallbackURLDataAPI } from '../apis/auth'
import { useSelector } from 'react-redux'
import DataTables from '../components/DataTables'
import CustomButton from '../components/CustomButton'

var popWindow

const Home = () => {
    const dispatch = useDispatch()
    const loading = useSelector((state) => state.auth.loading)
    const tableColumns = useSelector((state) => state.auth.tableColumns)
    const tableData = useSelector((state) => state.auth.tableData)
    const [openTwitterDialog, setOpenTwitterDialog] = useState(false)
    const [isSetURL, setIsSetURL] = useState(false)
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));


    const handleClickOpen = () => {
        setOpenTwitterDialog(true);
    };

    const handleClose = () => {
        setOpenTwitterDialog(false);
    };

    const handleLoadData = () => {
        dispatch(requestTwitterAuth())
    }

    useEffect(() => {
        handleLoadData()
    }, [])

    // useEffect(() => {
    //     if (isSetURL) {
    //         var loadButton = window.opener.document.getElementById("loadmoreButton");
    //         loadButton.click()
    //         setIsSetURL(false)
    //         window.close()
    //     }
    // }, [isSetURL])

    if (window.location.search) {
        let searchParams = window.location.search
        let checkparams = new URLSearchParams(window.location.search)
        let oauth_token = null
        let oauth_verifier = null
        oauth_token = checkparams.get("oauth_token").toString()
        oauth_verifier = checkparams.get("oauth_verifier").toString()
        if (oauth_token && oauth_verifier) {
            setCallbackURLDataAPI(searchParams)
            // window.location.reload()
        }
        oauth_token = null
        oauth_verifier = null
        window.close()
    }

    return (
        <>
            <Container fluid="true" style={{ marginTop: "20px" }}>
                <CustomButton handleClickOpen={handleClickOpen} handleLoadData={handleLoadData} />
                <Dialog
                    fullWidth={"sm"}
                    fullScreen={fullScreen}
                    open={openTwitterDialog}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">Sign In With Twitter</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Table List
                        </DialogContentText>
                        <div className="button-container">
                            <Button variant="contained" size="small" color="primary" onClick={() => { handleClose(); dispatch(requestTwitterAuth(true)) }}>
                                Twitter
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
                <DataTables rowsData={tableData} />
            </Container>
        </>
    )
}

export default Home