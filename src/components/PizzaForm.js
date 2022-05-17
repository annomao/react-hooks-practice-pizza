import React from "react";

function PizzaForm({editPizza,onFormChange,onEditPizza}) {

  const {size,topping,vegetarian} = editPizza

  const handleChange =(e) => {
    if(e.target.type === "radio"){
      onFormChange(e.target.name,e.target.value === "Vegetarian")
    }else{
      onFormChange(e.target.name,e.target.value)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(editPizza)
    fetch(`http://localhost:3001/pizzas/${editPizza.id}`,{
      method:"PATCH",
      headers:{
        "Content-Type": "Application/json"
      },
      body:JSON.stringify(editPizza)
    })
    .then(res => res.json())
    .then(data => onEditPizza(editPizza))
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="col-5">
          <input
            className="form-control"
            type="text"
            name="topping"
            placeholder="Pizza Topping"
            value={topping || ''}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <select className="form-control" name="size" value={size || ''} onChange={handleChange}>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="vegetarian"
              value="Vegetarian"
              onChange={handleChange}
              checked={vegetarian===true}
            />
            <label className="form-check-label">Vegetarian</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="vegetarian"
              value="Not Vegetarian"
              onChange={handleChange}
              checked={vegetarian===false}
            />
            <label className="form-check-label">Not Vegetarian</label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default PizzaForm;
