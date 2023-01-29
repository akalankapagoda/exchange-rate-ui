import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { blue } from '@mui/material/colors';
import { bgcolor } from '@mui/system';

import { listSymbols } from '../api/CurrencyConvertAPI';

export default function CurrencyConvert() {
    const [source, setSource] = React.useState('USD');
    const [target, setTarget] = React.useState('USD');
    const [value, setValue] = React.useState('1');
    const [symbols, setSymbols] = React.useState();

    React.useEffect(() => {

        const fetchSymbols = async () => {
            const symbolsResponse = await listSymbols();
            setSymbols(symbolsResponse?.data?.currencies);
        };

        fetchSymbols();

      }, []);

    const handleSourceChange = (event) => {
        setSource(event.target.value);
    };

    const handleTargetChange = (event) => {
        setTarget(event.target.value);
    };

    const choices = [];

    if (symbols) {
        Object.entries(symbols).map(([key, value]) => 
        choices.push(<MenuItem value={{key}}>{key} : {value}</MenuItem>)
    )
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
                        <Typography variant="h4" component="div">
                            Please select the currencies to convert
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth variant="filled">

                            <InputLabel id="demo-simple-select-helper-label">Source Currency</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
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

                            <InputLabel id="demo-simple-select-helper-label">Target Currency</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
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
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Button variant="contained" color="success">
                            Convert
                        </Button>
                    </Grid>
                </Grid>
            </Box>


        </Container>
    );
}