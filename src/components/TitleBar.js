import React from 'react'
import Container from '@material-ui/core/Container'
import PropTypes from 'prop-types'
import useFitText from "use-fit-text";

function TitleBar(props) {
    const { fontSize, ref } = useFitText({ maxFontSize: 500, minFontSize: 50 });

    return (
        <Container className='title-bar-wrapper'>
            <span className='title-bar' style={{ fontSize, maxHeight:'8vmin' }} ref={ref}>
                {props.title}
            </span>
        </Container>
    )
}

TitleBar.propTypes = {
    title: PropTypes.string
}

export default TitleBar