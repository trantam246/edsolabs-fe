import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useState } from "react";

export default function SelectDate(props) {

    const { getSelect } = props;

    const [time, setTime] = useState('Today');

    const handleChange = (event) => {
        setTime(event.target.value);
    };

    getSelect(time)

    return (
        <div>
            <FormControl variant="outlined" style={{width: '150px'}}>
                <Select
                    native
                    value={time}
                    onChange={handleChange}
                    inputProps={{
                        id: "outlined-age-native-simple"
                    }}>
    
                    <option value='Today'>Today</option>
                    <option value='Yesterday'>Yesterday</option>
                    <option value='This week'>This week</option>
                    <option value='Last week'>Last week</option>
                    <option value='This month'>This month</option>
                    <option value='Last month'>Last month</option>
                    <option value='Date range'>Date range</option>
                </Select>
            </FormControl>
        </div>
    );
}
