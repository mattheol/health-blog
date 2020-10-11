import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
}));

const Calculator = () =>{
  const classes = useStyles();
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState('');
  const [weightError, setWeightError] = useState(false);
  const [height, setHeight] = useState('');
  const [heightError, setHeightError] = useState(false);
  const [activity, setActivity] = useState('');


  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleWeightChange = (e) => {
    const newWeight = +e.target.value;
    setWeight(e.target.value)
    if(newWeight<1 || newWeight>300){
      setWeightError(true);
      }else if(weightError){
        setWeightError(false);
    }
  }

  const handleHeightChange = (e) => {
    const newHeight = +e.target.value;
    setHeight(e.target.value)
    if(newHeight<1 || newHeight>300){
      setHeightError(true);
      }else if(heightError){
        setHeightError(false);
    }
  }

  const handleActivityChange = (e) => {
    setActivity(e.target.value);
  }

  let disableCalcButton = false;
  if(weightError || heightError || !weight || !height || !gender || !activity){
    disableCalcButton=true;
  }
  return (
    <>
      <h2>Kalkulator kalorii</h2>
      <div style={{display:'flex', flexDirection: 'column', width: '300px'}}>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Płeć</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={gender}
          onChange={handleGenderChange}
        >
          <MenuItem value={'woman'}>Kobieta</MenuItem>
          <MenuItem value={'man'}>Mężczyzna</MenuItem>
        </Select>
      </FormControl>
      <TextField
          className={classes.formControl}
          type="number"
          label="Waga"
          error={weightError}
          id="standard-start-adornment"
          onChange={handleWeightChange}
          value={weight}
          InputProps={{
            endAdornment: <InputAdornment position="end">kg</InputAdornment>,
            inputProps: { 
              min: 1,max: 300
            }
          }
          }
        />
        <TextField
          className={classes.formControl}
          error={heightError}
          type="number"
          label="Wzrost"
          id="standard-start-adornment"
          onChange={handleHeightChange}
          value={height}
          InputProps={{
            endAdornment: <InputAdornment position="end">cm</InputAdornment>,
            inputProps: { 
              min: 1,max: 300
            }
          }
          }
        />
        <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Poziom aktywności fizycznej</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={activity}
          onChange={handleActivityChange}
        >
          <MenuItem value={'none'}>Brak aktywności fizycznej</MenuItem>
          <MenuItem value={'low'}>Mała aktywność fizyczna (trening 1-3 w tygodniu)</MenuItem>
          <MenuItem value={'medium'}>Średnia aktywność fizyczna (trening 3-5 w tygodniu)</MenuItem>
          <MenuItem value={'high'}>Duża aktywność fizyczna (trening codziennie)</MenuItem>
          <MenuItem value={'ultra'}>Bardzo duża aktywność fizyczna (więcej niż 1 trening dziennie)</MenuItem>
        </Select>
      </FormControl>
        <Button className={classes.selectEmpty} variant="contained" color="primary"
        disabled={disableCalcButton}>
          Oblicz
        </Button>
      </div>
      
    </>
  )
} 

export default Calculator