import { useState } from "react"
import AddButton from "../components/AddButton"
import ChartFormDialog from "../components/ChartFormDialog"
import SearchAppBar from "../components/SearchAppBar"
import PaperTableChart from "../components/PaperTableChart"

function ChartsNavigationPage(){
  const [filterText, setFilterText] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  const [chartsCreated, setChartsCreated] = useState([])

  return(
      <>
        <SearchAppBar setFilterText={setFilterText}/>
        <ChartFormDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          chartsCreated={chartsCreated}
          setChartsCreated={setChartsCreated}
        />
        {chartsCreated.length > 0 &&
           chartsCreated
              .filter(chart => chart.chartName.toLowerCase().includes(filterText))
              .map((chart, index) => (
                <PaperTableChart
                  key={index}
                  chart={chart}
                  chartsCreated={chartsCreated}
                  setChartsCreated={setChartsCreated}
                />
          ))
        }
        <AddButton handleClick={() => setOpenDialog(true)}/>
      </>
  )
}

export default ChartsNavigationPage