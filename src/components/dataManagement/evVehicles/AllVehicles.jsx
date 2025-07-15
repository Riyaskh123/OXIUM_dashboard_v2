import React, { useState } from "react";
import StyledTable from "../../../ui/styledTable";
import LastSynced from "../../../layout/LastSynced";
import { Box, Dialog, Stack, Typography } from "@mui/material";
import StyledSearchField from "../../../ui/styledSearchField";
import { tableHeaderReplace } from "../../../utils/tableHeaderReplace";
import { deleteVehicle } from "../../../services/vehicleAPI";
import { toast } from "react-toastify";
import AddVehicles from "./AddVehicles";
import { ReactComponent as Close } from "../../../assets/icons/close-icon-large.svg";
import { Transition } from "../../../utils/DialogAnimation";
import { useAuth } from "../../../core/auth/AuthContext";
import { permissions } from "../../../core/routes/permissions";

const tableHeader = [
  "Company Name",
  "Model name",
  "Charger Type",
  "Number of Ports",
];

const EditVehicle = ({data, open, onClose, ...props }) => {
  return (
    <Dialog open={open} maxWidth='sm' fullWidth TransitionComponent={Transition}>
      <Stack direction={'row'} sx={{ p: 2, backgroundColor: 'primary.main', justifyContent: 'space-between', borderBottom: 'solid 1px #fff3' }}>
        <Typography sx={{ color: 'secondary.contrastText' }}>Edit Vehicle</Typography>
        <Close style={{ cursor: 'pointer' }} onClick={onClose} />
      </Stack>
      <AddVehicles editStatus={true} vehicleData={data} onClose={onClose} />
    </Dialog>
  )
}

export default function AllVehicles({ data, setPageNo, totalCount, setSearchQuery, updateData, ...props }) {
  const [selectData, setSelectedData] = useState();
  const [editOpen, setEditOpen] = useState(false);
  const VehicleData = tableHeaderReplace(data, ['brand', 'modelName', 'charger_types', 'number_of_ports'], tableHeader)
  const { userCan } = useAuth()
  const tableActionClick = (e) => {
    if (e.action === "Edit") {
      setSelectedData(e.data)
      setEditOpen(true);
    }
    else if (e.action === "Delete") {
      deleteVEHICLE(e.data)
    }
  }

  const deleteVEHICLE = (data) => {
    deleteVehicle(data._id).then((res) => {
      toast.success("vehicle Deleted successfully");
      updateData && updateData()
    }).catch((error) => {
      toast.error("Unable to Delete");
    })
  }

  const handleSearch = (value)=>{
    setSearchQuery(value)
}

  return (
    <>
      <EditVehicle open={editOpen} data={selectData} onClose={(() => { setEditOpen(false); updateData && updateData() })} />
      <LastSynced heading="EV Vehicles" reloadHandle={updateData} >
        <StyledSearchField
          placeholder={"Search"}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
      </LastSynced>
      <Box sx={{ p: 3 }}>
        <StyledTable headers={tableHeader} 
        data={VehicleData} 
        setPageNo={setPageNo}
        totalCount={totalCount}
        onActionClick={tableActionClick} 
        showActionCell={userCan(permissions.evVehicle.modify)}
        actions={["Edit", "Delete"]} />
      </Box>
    </>
  );
}
