import React from 'react';
import { Grid, TextField, Button, Typography } from '@mui/material';
import useSmartContract from './useSmartContract';

export default function SmartContractForm() {
  const { errorMessage, defaultAccount, connectButtonText, provider, signer, contract, contractVal, connectToWallet, handlerForm, getMessage } = useSmartContract();
  return (
    <Grid item container xs={12} justifyContent='center'>
      <Grid item xs={12}>
        <Typography component={'h1'} fontWeight={700} fontSize={20} color='InfoText' m={4}>
          Welcome To Web3
        </Typography>
        <Button variant='contained' color='info' onClick={connectToWallet}>
          {connectButtonText}
        </Button>
        <Typography component={'p'} m={4}>
          Address:{defaultAccount}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <form onSubmit={handlerForm}>
          <Grid item xs={12}>
            <TextField label='message' type='text' id='message' variant='outlined' fullWidth name='message' />
          </Grid>
          <Grid item m={4}>
            <Button type='submit' variant='contained' color='primary'>
              Update Message
            </Button>
            <Button variant='contained' color='secondary' onClick={getMessage} sx={{ margin: '0rem 1rem' }}>
              Get Message
            </Button>
          </Grid>

          {contractVal}
          {errorMessage}
        </form>
      </Grid>
    </Grid>
  );
}
