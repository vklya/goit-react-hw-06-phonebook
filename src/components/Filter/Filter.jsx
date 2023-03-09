import css from './filter.module.scss';
import PropTypes from 'prop-types';

const Filter = ({ value, onChange }) => (
    <label>
        Find contacts by name {' '}
        <input type="text" value={value} onChange={onChange} className={css.filter} />
    </label>
)

Filter.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
};

export default Filter;