import React,{useState,useEffect} from "react";
import Header from "./Header";
import PizzaForm from "./PizzaForm";
import PizzaList from "./PizzaList";

function App() {
  const [pizzas,setPizzas] = useState([])
  const [editPizza,setEditPizza] = useState({})

  useEffect(()=>{
    fetch("http://localhost:3001/pizzas")
    .then(res => res.json())
    .then(data => setPizzas(data))
  },[])

  function handleFormChange(name,value){
    setEditPizza({
      ...editPizza,
      [name]: value
    })
  }

  function handleEdit(editedPizza){
    const newPizzaList = pizzas.map(pizza => {
      if(editedPizza.id === pizza.id){
        return editedPizza
      }else{
        return pizza
      }
    })
    setPizzas(newPizzaList)
  }
  
  return (
    <>
      <Header />
      <PizzaForm 
      editPizza={editPizza} 
      onFormChange={handleFormChange} 
      onEditPizza={handleEdit}
      />
      <PizzaList pizzas={pizzas} setPizza={setEditPizza}/>
    </>
  );
}

export default App;
