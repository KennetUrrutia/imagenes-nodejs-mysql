import { useState } from "react";

function App() {
  const [file, setFile] = useState(null)

  const selectedHandler = ({ target }) => {
    setFile(target.files[0])
  }

  const sendHandler = () => {
    if(!file) {
      alert('you must upload a file')
      return
    }

    const formData = new FormData()
    formData.append('image', file)

    fetch('http://localhost:8000/images/post', {
      method: 'POST',
      body: formData,
    })
    .then( response => {
      response.text()
      console.log(response)
    })
    .catch( error => {
      console.error(error)
    })
    .finally(() => {
      document.getElementById('fileInput').value = null
      setFile(null)
    })
  }
  
  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#!">Image App</a>
        </div>
      </nav>
      <div className="container mt-5">
        <div className="card p-3">
          <div className="row">
            <div className="col-10">
              <input id="fileInput" className="form-control" type="file" onChange={selectedHandler} />
            </div>
            <div className="col-2">
              <button
                type="button"
                className="btn btn-primary col-12"
                onClick={sendHandler}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
