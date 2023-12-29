import { useState } from "react";
import { Box, Grid, IconButton, Stack, Typography } from '@mui/material'
import CPSidebar from './CPAction/CPsidebar'
import MenuIcon from '@mui/icons-material/Menu';

import { styled } from "@mui/material";
import { ReactComponent as ReloadIcon } from '../../../../assets/icons/reload.svg'
import ChargerAvailable from "./CPAction/chargerAvailable";
import TriggerMessage from "./CPAction/triggerMessage";
import GetDiagnostics from "./CPAction/getDiagnostics";
import SendLocalList from "./CPAction/sendLocalList";



export default function CPAction() {
    const [optionIndex, setOptionIndex] = useState(0)
    const onOptionChanged = (e) => {
        setOptionIndex(e.index)
    }
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: 'primary.grey',
                    p: 2
                }}>
                <Stack direction={'column'} sx={{ ml: 2 }}>
                    <Typography variant='body1' sx={{ color: 'secondary.contrastText' }}>CP Action</Typography>
                    <Stack direction={'row'} sx={{alignItems:'center'}} spacing={1}>
                        <Typography sx={{ color: 'secondary.greytext', fontSize: 12 }}>Last synced</Typography>
                        <Typography sx={{ color: 'success.main', fontSize: 12 }}>4 minutes ago</Typography>
                        <ReloadIcon style={{ cursor: 'pointer' }} />
                    </Stack>
                </Stack>
            </Box>
            <Stack direction={"row"}>
                    <CPSidebar onChanged={onOptionChanged} />
                    <Box sx={{px:{xs:1,md:6},py:{xs:1,md:3},flexGrow:1}}>
                        {
                            optionIndex === 0 ? <ChargerAvailable/> : optionIndex === 1 ? <TriggerMessage/> : optionIndex === 2 ? <GetDiagnostics/> : optionIndex === 3 ? <SendLocalList/> : <GetDiagnostics/>
                        }
                    </Box>
            </Stack>
        </>
    )
}