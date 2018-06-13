import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const Filter = (props) => {

        let showCurrentDate = () => {
            console.log(moment());

        };
        return (
            < div>
                <button onClick={showCurrentDate}>Day</button>
                <button>Month</button>
                <button>Year</button>
            </div>
        )
            ;
    }
;

Filter.propTypes = {};
Filter.defaultProps = {};

export default Filter;
