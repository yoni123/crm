import React from 'react';
import { Grid, Input, makeStyles, Typography } from '@material-ui/core';
import { GridFormProps } from '../interfaces/popOver';

const useStyle = makeStyles({
  underline: {
    borderBottom: "2px solid rgba(255, 255, 255, 0.85)",
    "&:hover": {
      borderBottom: "2px solid rgba(255, 255, 255, 0.85)",
    }
  }
});

export const GridForm: React.FC<GridFormProps> = ({ inputKey, value, inputChange, textColor }) => {
  const capitalized = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
  const classes = useStyle();
  const text = {
    color: textColor
  }

  return (
    <Grid item xs={12} justify="space-between" container alignItems="center">
      <Typography component="span" style={text}>{capitalized(inputKey)}:</Typography>
      <Input
        onChange={(e) => inputChange(inputKey, e.target.value)}
        classes={{ underline: classes.underline }}
        value={value}
        style={text}
        color="secondary"
      />
    </Grid>
  )
}
