import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class GroceryList extends Component {
    constructor() {
        super();
        this.state = { foods: [], inputText: '' };
    }

    // Describes the way the UI will look given a certain state.
    render() {
        console.log(this.state);
        const { inputText, foods } = this.state;

        return (
            <div>
                <button onClick={this.handleClearAllButtonClick.bind(this)} disabled={!foods.length}>Clear All</button>
                <button onClick={this.handleClearCheckedButtonClick.bind(this)} disabled={!foods.filter((food) => food.isChecked).length}>Clear Checked</button>
                <br/>
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
        });
    }

    handleClearAllButtonClick() {
        this.setState({
            foods: []
        });
    }

    handleClearCheckedButtonClick() {
        const { foods } = this.state;
        this.setState({
            foods: foods.filter((food) => !food.isChecked)
        })
    }
}

function GroceryListFoods ({ foods, handleCheckChange }) {
    if (!foods.length) return <p>You have no food. You will starve.</p>;
    return (
        <ul>
            {foods.map((food, i) => {
                return (
                    <li key={i} style={{textDecoration: food.isChecked ? "line-through" : "none"}}>
                        <input type="checkbox" checked={food.isChecked} onChange={(event) => handleCheckChange(event, i)} />{ food.name }
                    </li>
                );
            })}
        </ul>
    );
}

ReactDOM.render(
    <div>
        <GroceryList placeholder="example food"/>
    </div>, document.getElementById('grocery-list')
);
