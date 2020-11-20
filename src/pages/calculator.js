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
  const [result, setResult] = useState(<h5 style={{marginTop: '30px'}}>Twój wynik pojawi się tutaj</h5>);
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState('');
  const [weightError, setWeightError] = useState(false);
  const [height, setHeight] = useState('');
  const [heightError, setHeightError] = useState(false);
  const [age, setAge] = useState('');
  const [ageError, setAgeError] = useState(false);
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

  const handleAgeChange = (e) => {
    const newAge = +e.target.value;
    setAge(e.target.value)
    if(newAge<1 || newAge>150){
      setAgeError(true);
      }else if(ageError){
        setAgeError(false);
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

  const handleCalcClick = () => {
    let bmr,palFactor;
    if(gender ==='woman'){
      bmr = 10 * (+weight) + 6.25 * (+height) + -5*(+age) + -161
    } else{
      bmr = 10 * (+weight) + 6.25 * (+height) + -5*(+age) + 5
    }
    switch(activity){
      case 'none': palFactor = 1.4;break;
      case 'low':palFactor = 1.65;break;
      case 'medium':palFactor = 1.85;break;
      case 'high':palFactor = 2.1;break;
      case 'ultra': palFactor = 2.4;break;
    }
    console.log(bmr*palFactor);
    setResult( 
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '30px'}}>
          <div>
              Powinieneś przyjmować
          </div>
          <div style={{fontSize: '24px'}}>    <b style={{color: '#3f51b5'}}>{Math.round(bmr*palFactor)}</b>
          </div>
          <div><b>kcal/dzień</b></div>
          <div style={{marginTop: '20px'}}>
              Twoje BMR wynosi
          </div>
          <div style={{fontSize: '24px'}}>
              <b style={{color: '#3f51b5'}}>{Math.round(bmr)}</b>
          </div>
          <div><b>kcal/dzień</b></div>
        </div>
    )
  }

  let disableCalcButton = false;
  if(weightError || heightError || ageError || !weight || !height || !gender || !activity || !age){
    disableCalcButton=true;
  }
  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <div style={{ marginTop:'50px',   boxShadow: '0px 0px 3px 0px rgba(0, 0, 0, 0.4)', maxWidth: '600px', padding: '5px 20px 30px 15px' }}>
      <h3 style={{textAlign: 'center' }}>Kalkulator kalorii</h3>
      <div style={{display:'flex', justifyContent: 'center',}}>
            <div style={{display:'flex'}}>
              <div style={{display:'flex', flexDirection: 'column', width: '300px'}}>
              <FormControl className={classes.formControl} required>
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
                  label="Wiek"
                  error={ageError}
                  id="standard-start-adornment"
                  onChange={handleAgeChange}
                  required
                  value={age}
                  InputProps={{
                    inputProps: { 
                      min: 1,max: 150
                    }
                  }
                  }
                />
              <TextField
                  className={classes.formControl}
                  type="number"
                  label="Waga"
                  error={weightError}
                  id="standard-start-adornment"
                  onChange={handleWeightChange}
                  required
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
                  required
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
                <FormControl className={classes.formControl} required>
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
                disabled={disableCalcButton}
                onClick={handleCalcClick}>
                  Oblicz
                </Button>
              </div>
              <div style={{marginLeft: '60px', minWidth: '200px'}}>
                {result}
              </div>
            </div>

          </div>
    </div>
    </div>
    
    
  )
} 

export default Calculator