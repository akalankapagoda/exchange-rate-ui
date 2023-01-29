import * as React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';

import { listSymbols, convertCurrency } from '../api/CurrencyConvertAPI';

export default function CurrencyConvert() {
    const [source, setSource] = React.useState('USD');
    const [target, setTarget] = React.useState('USD');
    const [value, setValue] = React.useState('1');
    const [result, setResult] = React.useState();
    const [symbols, setSymbols] = React.useState();
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });

    React.useEffect(() => {

        const fetchSymbols = async () => {
            try {
                const symbolsResponse = await listSymbols();
                setSymbols(symbolsResponse?.data?.currencies);
            } catch (e) {
                setSnackbarOpen(true);
                console.log(e);
            }

        };

        fetchSymbols();

    }, []);

    const handleSourceChange = (event) => {
        setSource(event.target.value);
        setResult();
    };

    const handleTargetChange = (event) => {
        setTarget(event.target.value);
        setResult();
    };

    const handleValueChange = (event) => {
        setValue(event.target.value);
        setResult();
    }

    const handleOnConvert = () => {

        const convert = async () => {
            try {
                const convertResponse = await convertCurrency(source, target, value);
                setResult(convertResponse?.data.value);
            } catch (e) {
                setSnackbarOpen(true);
                console.log(e);
            }
        };
        
        convert();

    }

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setSnackbarOpen(false);
      };

    const choices = [];

    if (symbols) {
        Object.entries(symbols).map(([key, value]) =>
            choices.push(<MenuItem key={key} value={key}>{key} : {value}</MenuItem>)
        )
    }

    let resultComponent;

    if (result) {
        resultComponent = 
            <Grid item xs={12}>
                <Button variant="outlined">Converted value : {result}</Button>
            </Grid>;
    }

    return (
        <Container fixed>
            <Box
                sx={{
                    boxShadow: 1,
                    borderRadius: 2,
                    p: 2,
                    maxWidth: 800,
                    minHeight: 300
                }}
            >
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12}>
                        <Button variant="contained" startIcon={<FontAwesomeIcon icon={faInfo} beat />}>
                            Please select the currencies to convert
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth variant="filled">

                            <InputLabel id="source-simple-select-helper-label">Source Currency</InputLabel>
                            <Select
                                labelId="source-simple-select-label"
                                id="source-simple-select"
                                value={source}
                                label="Source Currency"
                                onChange={handleSourceChange}
                            >
                                {choices}
                            </Select>

                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth variant="filled">

                            <InputLabel id="target-simple-select-helper-label">Target Currency</InputLabel>
                            <Select
                                labelId="target-simple-select-label"
                                id="target-simple-select"
                                value={target}
                                label="Target Currency"
                                onChange={handleTargetChange}
                            >
                                {choices}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            id="standard-number"
                            label="Amount"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="filled"
                            defaultValue={1}
                            onChange={handleValueChange}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Button variant="contained" color="success" onClick={handleOnConvert}>
                            Convert
                        </Button>
                    </Grid>
                    {resultComponent}
                </Grid>
            </Box>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
                    An Error Occured! Please try again later!
                </Alert>
            </Snackbar>

        </Container>
    );
}