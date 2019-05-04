import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { WithApolloClient } from 'react-apollo';
import { register } from './gql';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: 'auto',
    backgroundColor: theme.palette.primary.main
  },
  completeAvatar: {
    margin: theme.spacing.unit,
    backgroundColor: '#2ecc71'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  logo: {
    marginTop: theme.spacing.unit * 6,
    marginLeft: 'auto',
    marginRight: 'auto'
  }
});

interface RegisterProps {
  classes: any;
}

type ApolloRegisterProps = WithApolloClient<RegisterProps>;

const Register: React.FunctionComponent<ApolloRegisterProps> = props => {
  interface State {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    complete: boolean;
    errors: [];
  }
  const { classes } = props;
  const [registerInfo, setRegisterInfo] = useState<State>({
    complete: false
  } as State);

  const renderPage = () => {
    if (registerInfo.complete) {
      return (
        <div>
          <Avatar className={classes.completeAvatar}>
            <DoneOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registration Complete!
          </Typography>
        </div>
      );
    } else {
      return (
        <div>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                id="email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={e => {
                  setRegisterInfo({ ...registerInfo, email: e.target.value });
                }}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input
                id="username"
                name="username"
                autoComplete="username"
                onChange={e => {
                  setRegisterInfo({
                    ...registerInfo,
                    username: e.target.value
                  });
                }}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={e => {
                  setRegisterInfo({
                    ...registerInfo,
                    password: e.target.value
                  });
                }}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="confirmPassword">
                Confirm Password
              </InputLabel>
              <Input
                name="confirmPassword"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
                onChange={e => {
                  setRegisterInfo({
                    ...registerInfo,
                    confirmPassword: e.target.value
                  });
                }}
              />
            </FormControl>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={async e => {
                e.stopPropagation();
                if (registerInfo.password !== registerInfo.confirmPassword) {
                  alert('Passwords do no match, try again');
                } else {
                  setRegisterInfo({ ...registerInfo, complete: true });
                  try {
                    const { client } = props;
                    const data = await register(
                      registerInfo.username,
                      registerInfo.email,
                      registerInfo.password,
                      registerInfo.confirmPassword,
                      client
                    );

                    registerInfo.errors = data['error'];
                    registerInfo.complete = true;
                    console.log(registerInfo);
                  } catch (e) {
                    console.log(e);
                  }
                }
              }}
            >
              Register
            </Button>
          </form>
        </div>
      );
    }
  };

  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}> {renderPage()}</Paper>
    </main>
  );
};

Register.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles as any)(Register);
