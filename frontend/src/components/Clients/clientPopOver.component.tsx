import React, { useState, useEffect } from 'react';
import { Modal, Card, Button, CardActions, CardContent, Grid, Input, IconButton } from '@material-ui/core';
import { observer } from "mobx-react";
import { CancelPresentationOutlined } from '@material-ui/icons';
import { useStore } from '../../stores/stores';
import { useClientsStyle } from '../../styles/style';
import { clientKeysType } from '../../interfaces/popOver';
import { GridForm } from '../GridForm';
import UpdateButton from '../UpdateButton';

const ClientPopOver: React.FC = observer(() => {
  const { popOverStore } = useStore();
  const popOverClient = popOverStore.client;
  const [client, setClient] = useState({
    firstName: popOverClient ? popOverClient!.firstName : '',
    lastName: popOverClient ? popOverClient!.lastName : '',
    country: popOverClient ? popOverClient!.country : ''
  });

  const classes = useClientsStyle();
  const keys: string[] = ['firstName', 'lastName', 'country'];
  const BackdropComponent = () => (
    <div className={classes.backDrop} onClick={popOverStore.closePopOver}></div>
  )

  const inputChanged = (key: string, value: string) => {
    const updatedClient = { ...client };
    updatedClient[key as clientKeysType] = value;
    setClient(updatedClient)
  }

  useEffect(() => {
    setClient({
      firstName: popOverClient ? popOverClient!.firstName : '',
      lastName: popOverClient ? popOverClient!.lastName : '',
      country: popOverClient ? popOverClient!.country : ''
    })
  }, [popOverClient])

  const update = () => {
    popOverClient!.update(client.firstName, client.lastName, client.country)
    popOverStore.closePopOver()
  }
  return (
    <Modal
      BackdropComponent={BackdropComponent}
      className={classes.modal}
      open={popOverStore.isOpen}>
      <Card className={classes.paper}>
        <CardContent className={classes.cardContext}>
          <IconButton size="small" color="secondary" onClick={() => popOverStore.closePopOver()}>
            <CancelPresentationOutlined />
          </IconButton>
          <Grid container direction="row" spacing={2}
            justify="space-around"
            alignItems="center">
            {keys.map((d: string) => (
              <GridForm textColor={"white"} key={d} inputKey={d} value={client[d as clientKeysType]} inputChange={inputChanged} />
            ))}
          </Grid>
        </CardContent>

        <CardActions>
          <UpdateButton onClick={update} text={"Update"} />
        </CardActions>
      </Card>
    </Modal>
  )
});

export default ClientPopOver;