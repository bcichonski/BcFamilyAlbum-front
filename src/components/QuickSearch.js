import React from 'react';
import PropTypes from 'prop-types'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import SearchIcon from '@material-ui/icons/Search'

function QuickSearch(props) {
    return (
        <TextField
        id="qsearch"
        value={props.searchPhrase}
        onChange={(event) => props.onChange(event.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    )
}

QuickSearch.propTypes = {
    searchPhrase : PropTypes.string,
    onChange : PropTypes.func,
  }

QuickSearch.defaultProps = {
    searchPhrase: ''
}

export default QuickSearch