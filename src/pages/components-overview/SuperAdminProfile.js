import React, { useState,useEffect } from 'react'
import { Grid, Typography, IconButton, TextField, Tooltip } from '@mui/material';
import facebook from '../../assets/images/icons/facebook.svg';
import twitter from '../../assets/images/icons/twitter.svg';
import google from '../../assets/images/icons/google.svg';
import { PencilSquare } from '../../../node_modules/react-bootstrap-icons/dist/index';
import MainCard from 'components/MainCard';
import '../../assets/css/superAdminProfile.css';
import ComponentSkeleton from './ComponentSkeleton';
import { getFromSessionStorage } from 'storageservices/storageUtils';
import {getSuperAdminProfile} from 'apiservices/Api';

export const SuperAdminProfile = () => {
    
    const userProfile=getFromSessionStorage("userDetails")
    const userImage=getFromSessionStorage("s_image")
const [profile,setProfile]=useState('');
useEffect(() => {
    getSuperAdminProfile(userProfile&&userProfile.id)
    .then((response) => {
        const data = response.data;
        if (data) {
            setProfile(data)
            console.log('successfully fetched');
        }else {
            console.log('error');
           
          }
    })
    .catch((error) => {
        // Handle any errors
        console.error(error);
        
      });
    },[])
  return (
    <ComponentSkeleton>
        <h3>My Profile</h3>
    <Grid container spacing={3}>
    <Grid item xs={12}>
      <MainCard>
        <button >
          <Tooltip title="Edit profile">
            <PencilSquare id="editProfIcon" />
          </Tooltip>
        </button>

        <Grid container xs={12} sm={12} md={12} lg={12}>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <Grid item xs={12} sm={12} md={3} lg={12}>
              <img src={`data:image/png;base64,${userImage}`} alt="img" id="profilepic" />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={12} mt={3}>
              <Typography variant="h5" id="profDetails">
                {profile&&profile.name}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={12} mt={3}>
              <Typography variant="h6" id="profDetailsDesc">
              {profile&&profile.description}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={12} mt={3}>
              <Grid container justifyContent="center">
                <IconButton href="https://www.google.com/">
                  <img src={google} alt="google"></img>
                </IconButton>
                <IconButton href="https://www.facebook.com/">
                  <img src={facebook} alt="facebook"></img>
                </IconButton>
                <IconButton href="https://twitter.com/i/flow/login">
                  <img src={twitter} alt="twitter"></img>
                </IconButton>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={8} md={8} lg={8} id="secColProf">
            <table id="secTable">
              <tr>
                <td>
                  <TextField
                    id="outlined-readonly-prof"
                    label="Registration No"
                    defaultValue={profile ? `TV${profile.id}` : ""}
                    color="secondary"
                    multiline
                    fullWidth
                    focused
                    InputProps={{
                      readOnly: true
                    }}
                  />
                </td>
              </tr>
              <br></br>
              <tr>
                <td>
                  <TextField
                    id="outlined-readonly-prof"
                    label="Address"
                    defaultValue={profile && profile.location}
                    color="secondary"
                    multiline
                    fullWidth
                    focused
                    InputProps={{
                      readOnly: true
                    }}
                  />
                </td>
              </tr>
              <br></br>
              <tr>
                <td>
                  <TextField
                    id="outlined-readonly-prof"
                    label="Email-ID"
                    defaultValue={profile && profile.email}
                    color="secondary"
                    multiline
                    fullWidth
                    focused
                    InputProps={{
                      readOnly: true
                    }}
                     
                  />
                </td>
              </tr>
              <br></br>
              <tr>
                <td>
                  <TextField
                    id="outlined-readonly-prof"
                    label="contact number"
                    defaultValue={profile && profile.mobileNumber}
                    color="secondary"
                    multiline
                    fullWidth
                    focused
                    InputProps={{
                      readOnly: true
                    }}
                  />
                </td>
              </tr>
            </table>
          </Grid>
        </Grid>
      </MainCard>
    </Grid>
    <Grid item xs={12}>
      <h3>Templates</h3>
      <MainCard>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={4} md={3} lg={2}>
            {/* <CustomShadowBox shadow={theme.customShadows.z1} label="z1" color="inherit" /> */}
          </Grid>
        </Grid>
      </MainCard>
    </Grid>
  </Grid>
</ComponentSkeleton>
  )
}
