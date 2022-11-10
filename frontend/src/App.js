import { useState, useEffect } from "react"
import { Box } from '@mui/material'
import axios from 'axios'

function App() {
  const [file, setFile] = useState(null)
  const [imageList, setImageList] = useState([])
  const [listUpdated, setListUpdated] = useState(false)

  const selectedHandler = ({ target }) => setFile(target.files[0])

  const sendHandler = () => {
    if (!file) {
      alert('you must upload a file')
      return
    }

    const formData = new FormData()
    formData.append('image', file)

    axios.post('http://localhost:8000/images/post', formData)
      .then(response => {
        setListUpdated(true)
        response.text()
        console.log(response)
      })
      .catch(error => {
        console.error(error)
      })
      .finally(() => {
        document.getElementById('fileInput').value = null
        setFile(null)
      })
  }

  const getData = async () => {
    await axios.get('http://localhost:8000/images/get')
      .then(response => setImageList(response.data))
      .catch(error => {
        console.error(error)
      })
  }

  useEffect(() => {
    getData()
    setListUpdated(false)
  }, [listUpdated])

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
      <div className="container" style={{ display: 'flex', flexWrap: 'wrap' }}>
        {imageList &&
          imageList.map(image => (
            <div className="card p-2" >
              <img src={'http://localhost:8000/' + image} alt='...' className="card-img-top" style={{ height: '320px', width: '300px' }} />
            </div>
          ))
        }
      </div>
    </>
  );
}

export default App;
