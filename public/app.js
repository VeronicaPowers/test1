import React from 'react';
import ReactDOM from 'react-dom';

class GroceryList extends React.Component {
    constructor() {
        super();
        this.state = { foods: [], inputText: '' };
    }

    // Describes the way the UI will look given a certain state.
    render() {
        return (
            <div>
                <input type="text" value={this.state.inputText} onChange={(event) => this.handleTextChange(event)} />
                <button onClick={this.handleAddButtonClick.bind(this)} disabled={this.state.inputText === ''}>Add</button>
                <ul>
                    {this.state.foods.map((food, i) => {
                        return (
                            <li key={i} style={{textDecoration: food.isChecked ? "line-through" : "none"}}>
                                <input type="checkbox" onChange={(event) => this.handleCheckChange(event, i)} />{ food.name }
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }

    // Event handlers are used to update the state.
    handleTextChange(event) {
        this.setState({
            inputText: event.target.value
        });
    }

    handleAddButtonClick() {
        if (this.state.inputText !== '') {
            this.setState({
                foods: this.state.foods.concat({isChecked: false, name: this.state.inputText}),
                inputText: ''
            });
        }
    }

    handleCheckChange(event, index) {
        const currentFood = Object.assign({}, this.state.foods[index], { isChecked: !this.state.foods[index].isChecked});
        this.setState({
            foods: this.state.foods.slice(0, index).concat(currentFood).concat(this.state.foods.slice(index + 1))
        })
    }
}

ReactDOM.render(
    <GroceryList/>, document.getElementById('grocery-list')
);
