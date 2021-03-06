import React from "react";
import Select from "react-select";

class UserSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedUser: null
        };
    }

    handleChange = selectedUser => {
        this.setState({ selectedUser });
        this.props.handleReceiverSelect(selectedUser)
    };

    render() {
        const { selectedUser } = this.state;
        return (
            <Select
                options={this.props.users}
                value={selectedUser}
                onChange={this.handleChange}
                onInputChange={this.props.findUsers}
                style={{width: "6vw"}}
            />
        );
    }
}

export default UserSelect;
