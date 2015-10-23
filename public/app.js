import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class GroceryList extends Component {
    constructor() {
        super();
        this.state = { foods: [], inputText: '' };
    }

    // Describes the way the UI will look given a certain state.
    render() {
        const { inputText, foods } = this.state;

        return (
            <div>
                <input type="text" value={inputText} placeholder={this.props.placeholder} onChange={(event) => this.handleTextChange(event)} />
                <button onClick={this.handleAddButtonClick.bind(this)} disabled={!inputText}>Add</button>
                <span>{` ${foods.filter((food) => food.isChecked).length} of ${foods.length}`}</span>
                <GroceryListFoods foods={foods} handleCheckChange={this.handleCheckChange.bind(this)} />
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
        if (!this.state.inputText) return;
        this.setState({
            foods: this.state.foods.concat({isChecked: false, name: this.state.inputText}),
            inputText: ''
        });
    }

    handleCheckChange(event, index) {
        const { foods } = this.state;
        const currentFood = Object.assign({}, foods[index], { isChecked: !foods[index].isChecked});
        this.setState({
            foods: foods.slice(0, index).concat(currentFood).concat(foods.slice(index + 1))
        })
    }
}

function GroceryListFoods ({ foods, handleCheckChange }) {
    return (
        <ul>
            {foods.map((food, i) => {
                return (
                    <li key={i} style={{textDecoration: food.isChecked ? "line-through" : "none"}}>
                        <input type="checkbox" onChange={(event) => handleCheckChange(event, i)} />{ food.name }
                    </li>
                );
            })}
        </ul>
    );
}

ReactDOM.render(
    <div>
        <GroceryList placeholder=""/>
        <GroceryList placeholder="example food"/>
    </div>, document.getElementById('grocery-list')
);
