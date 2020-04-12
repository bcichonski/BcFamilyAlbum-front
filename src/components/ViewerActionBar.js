import React, { Component } from 'react'
import MenuOpenIcon from '@material-ui/icons/MenuOpen'
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Container from '@material-ui/core/Container'

class ViewerActionBar extends Component {
    render() {
        return (
            <Container className='viewer-action-bar-wrapper'>
                <BottomNavigation component='span' className='viewer-action-bar'>
                    <BottomNavigationAction label='one' icon={<MenuOpenIcon/>}></BottomNavigationAction>
                    <BottomNavigationAction label='one' icon={<MenuOpenIcon/>}></BottomNavigationAction>
                    <BottomNavigationAction label='one' icon={<MenuOpenIcon/>}></BottomNavigationAction>
                </BottomNavigation>
            </Container>
        )
    }
}

export default ViewerActionBar