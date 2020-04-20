import React, { Component } from 'react'
//import MenuOpenIcon from '@material-ui/icons/MenuOpen'
import RotateRightIcon from '@material-ui/icons/RotateRight'
import Container from '@material-ui/core/Container'
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton'
import PropTypes from 'prop-types'

class ViewerActionBar extends Component {
    render() {
        return (
            <Container className='viewer-action-bar-wrapper'>
                <Container component='span' className='viewer-action-bar'>
                    <IconButton aria-label="delete" onClick={this.props.onDelete}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="rotate" onClick={this.props.onRotate}>
                        <RotateRightIcon />
                    </IconButton>
                    {/*<IconButton aria-label="rename" onClick={() => {
                        this.setState({
                            visible: false
                        })
                    }}>
                        <MenuOpenIcon />
                </IconButton>*/}
                </Container>
            </Container>
        )
    }
}

ViewerActionBar.propTypes = {
    onDelete: PropTypes.func,
    onRotate: PropTypes.func
}

export default ViewerActionBar