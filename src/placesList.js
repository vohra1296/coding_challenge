import React, { useEffect, useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Grid from '@material-ui/core/Grid';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, Header, Image, Modal} from 'semantic-ui-react'
import { Divider } from 'semantic-ui-react'

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });



const PlacesList = () =>{

const classes = useStyles();

const [open, setOpen] = useState(false)

const placesDataUrl = 'https://610bb7502b6add0017cb3a35.mockapi.io/api/v1/places'

const [error, setError] = useState(null);
const [isLoaded, setIsLoaded] = useState(false);
const [places, setPlaces] = useState([]);
const [currentPlace, setCurrentPlace] = useState(null)

useEffect(()=>{
    getPlacesData()
},[])

useEffect(()=>{
    console.log(currentPlace)
},[currentPlace])



const getPlacesData = async () =>{

    fetch(placesDataUrl).then(res => res.json())
    .then(
        (result) => {
            setIsLoaded(true);
            console.log(result)
            setPlaces(result); 
        },

        (error) => {
            setIsLoaded(true);
            setError(error);
          }

    )
}

const handleDataModal = (data) =>{
    setCurrentPlace(data)
    setOpen(true)
}

if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
    <>
     <h1 style = {{marginLeft : '-67%', marginTop: '3%'}}>Places Page</h1>
     <TableContainer style = {{marginLeft:'10%',width : '80%'}} component={Paper}>
      <Table className={classes.table} aria-label="caption table">
          <TableHead>
          <TableRow>
            <TableCell>Business ID</TableCell>
            <TableCell align="right">Business Name</TableCell>
            <TableCell align="right">Website</TableCell>
            <TableCell align="right">Address</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {places.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right"> <a  onClick ={()=>handleDataModal(row)}> {row.name}</a></TableCell>
              <TableCell align="right">{row.website_url}</TableCell>
              <TableCell align="right">{row.address}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>


    <Modal
      open={open}
      style = {{marginLeft: '20%'}}
    >
     <Modal.Header><h1 style = {{marginLeft: '30%'}}>Business Details</h1></Modal.Header>

     <Modal.Content >
        <Grid container>
        <Grid item xs={4}>
        {currentPlace != null &&
        <Image size='small' width ={'50%'} src={currentPlace.logo_url}  />}
        </Grid>
        <Grid item xs={8}>
         {currentPlace != null &&
        <Modal.Description>
           <br />
          <Header><h2 style = {{marginLeft: '18%', marginTop: '-10%'}}>{currentPlace.name}</h2></Header>
          <Divider />
          <br />
            <Grid container>
            <Grid item xs={4}>
            <h4>Address :</h4>
            </Grid>
            <Grid item xs={4}>
            <p>{currentPlace.address}</p>
            </Grid>
            </Grid>
            <Divider />
          <br />
            <Grid container>
            <Grid item xs={4}>
            <h4>Website :</h4>
            </Grid>
            <Grid item xs={4}>
            <p>{currentPlace.website_url}</p>
            </Grid>
            </Grid>
           <Divider/>
            <Grid container>
            <Grid item xs={4}>
            <h4>Hours :</h4>
           </Grid>
          <Grid item xs={4}>
                <li>Mon : {currentPlace.hours.Monday}</li><br />
                <li>Tue : {currentPlace.hours.Tuesday}</li><br />
                <li>Wed : {currentPlace.hours.Wednesday}</li><br />
                <li>Thur : {currentPlace.hours.Thursday}</li><br />
                <li>Fri : {currentPlace.hours.Friday}</li><br />
                <li>Sat : {currentPlace.hours.Saturday}</li><br />
                <li>Sun : {currentPlace.hours.Sunday}</li>
            </Grid>
            </Grid>

          
          
        </Modal.Description>}
        <br />
        <Divider />
        <Modal.Actions>
        <Button style= {{backgroundColor: 'green', color : 'white', marginLeft: '80%'}}  onClick={() => setOpen(false)}>
          Close
        </Button>
       
      </Modal.Actions>
      </Grid>
      </Grid>
      </Modal.Content>
    </Modal>
    </>
    );


}

}
  


export default PlacesList