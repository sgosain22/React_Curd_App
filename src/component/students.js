import React, { useState } from "react";
import "../component/student.css"

const Student = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    stuName: "",
    emailId: "",
    cityName: ""
  });

  // const [fullName, setFullName] = useState("");
  // const [stuName, setStuName] = useState("");
  // const [emailId, setEmailId] = useState("");
  // const [cityName, setCityName] = useState("");

  const [items, setItems] = useState([]);

  const [toggleUpdate, setToggelUpdate] = useState(true);

  const [isEditItem, setIsEditItem] = useState(null);

  const [nowShow, dontShow] = useState(true);


  const AddItem = (e) => {
    e.preventDefault();

    if (!formData) {
      alert("Please fill all the Details.");
      

    } else if (formData && !toggleUpdate) {
        
      setItems(
        items.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: formData };
          }
          return elem;
        })
      );
      setToggelUpdate(true);

      setFormData({
        fullName: "",
        stuName: "",
        emailId: "",
        cityName: ""
      });

      setIsEditItem(null);
    } else {
      const allFormData = {
        id: new Date().getTime().toString(),
        name: formData,
      };
      setItems([...items, allFormData]);
      setFormData({
        fullName: "",
        stuName: "",
        emailId: "",
        cityName: ""
      });
    //   console.log(setFormData)
            
    }
    dontShow(true);
  };

  // Hide Add Button

  const hideAdd = () => {
      if(!formData){
        dontShow(true);
      }else{
        dontShow(false)
      }
  }

  // Delete Items

  const deleteItem = (index) => {
    const updatedItems = items.filter((elem) => {
      return index !== elem.id;
    });
    setItems(updatedItems);
  };

  // Edit Items

  const editItem = (id) => {
    let newEditItem = items.find((elem) => {
      return elem.id === id;
    });
    console.log(newEditItem);

    setToggelUpdate(false);

    setFormData(newEditItem.name);

    setIsEditItem(id);
  };



  return (
    <>
      <div className="fullForm">
        <div className="main">
          <h1>--Student Form--</h1>
        </div>

        <div>
          <form id="myForm">
            <label>Full Name:</label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />

            <label>Student Code:</label>
            <input
              id="stuName"
              type="text"
              name="stuName"
              value={formData.stuName}
              onChange={(e) =>
                setFormData({ ...formData, stuName: e.target.value })
              }
            />

            <label>Email ID:</label>
            <input
              id="emailId"
              type="text"
              name="emailId"
              value={formData.emailId}
              onChange={(e) =>
                setFormData({ ...formData, emailId: e.target.value })
              }
            />

            <label>City:</label>
            <input
              id="cityName"
              type="text"
              name="cityName"
              value={formData.cityName}
              onChange={(e) =>{
                setFormData({ ...formData, cityName: e.target.value })
                hideAdd()
              }}
            />

            {toggleUpdate ? (
              <button  disabled={nowShow} type="submit" title="addItem" onClick={AddItem}>
                Add
              </button>
            ) : (
              <button type="button" title="updateItem" onClick={AddItem}>
                Update
              </button>
            )}
          </form>
        <div className="showItemsBox">
          <div className="showItems">
            <table>
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Student Code</th>
                  <th>Email ID</th>
                  <th>City</th>
                </tr>
              </thead>
              <tbody>
                {items.map((elem) => {
                  return (
                    <tr key={elem.id}>
                      <td>{elem.name.fullName}</td>
                      <td>{elem.name.stuName}</td>
                      <td>{elem.name.emailId}</td>
                      <td>{elem.name.cityName}</td>
                      <td>
                        <button onClick={() => editItem(elem.id)}>Edit</button>
                      </td>
                      <td>
                        <button onClick={() => deleteItem(elem.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Student;
