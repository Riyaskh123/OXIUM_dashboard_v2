import React, { useEffect } from 'react';
import LastSynced from "../../../layout/LastSynced";
import StyledTable from "../../../ui/styledTable";
import { Box } from "@mui/material";
import { tableHeaderReplace } from '../../../utils/tableHeaderReplace';
import StyledSearchField from '../../../ui/styledSearchField';
import RightDrawer from '../../../ui/RightDrawer';
import Filter from '../filter';
import { searchAndFilter } from '../../../utils/search';
import { useState } from 'react';

const tableHeader = [
  "CPID",
  "Date",
  "Command",
  "Payload Data",
  "Unique ID"
];

export default function AllChargerLogs({ data, allLogs, updateData, setPageNo, totalCount }) {
  const [filterValue, setFilterValue] = useState('')
  const [searchData, setSearchData] = useState('')
  const AllLogsData = tableHeaderReplace(data, ['CPID', 'createdAt', 'messageType', 'payload', '_id'], tableHeader)

  useEffect(() => {
    if(filterValue !== ''){
      const search = searchAndFilter(allLogs,filterValue);
      const allData = tableHeaderReplace(search, ['CPID', 'createdAt', 'messageType', 'payload', '_id'], tableHeader)
      setSearchData(allData)
    }else{
      setSearchData('')
    }
  }, [filterValue])
  

  return (
    <>

      <LastSynced heading="Charger Logs" reloadHandle={updateData} >
      <StyledSearchField placeholder={'Search'} onChange={(e) => {
                    setFilterValue(e.target.value)
                }} />
                <RightDrawer>
                    <Filter onSubmited={updateData} />
                </RightDrawer>
      </LastSynced>
      <Box sx={{ p: 3 }}>
        <StyledTable
          showActionCell={false}
          headers={tableHeader}
          data={searchData ? searchData : AllLogsData}
          setPageNo={setPageNo}
          totalCount={totalCount}
        />
      </Box>


    </>
  )
}
