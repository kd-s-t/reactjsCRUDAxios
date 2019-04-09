import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      name: '',
      address: '',
      users: [],
      new_id: '',
      new_name: '',
      new_address: '',
      create_json: [],
      read_json: [],
      update_json: [],
      delete_json: [],
    }

    this.create = this.create.bind(this)
    this.read = this.read.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)

  }

  componentDidMount() {
    this.read()
  }

  create(e) {
    e.preventDefault()

    var formData = new FormData()
    formData.append('name', this.state.name);
    formData.append('address', this.state.address);

    axios.post('http://127.0.0.1:5000/users/create', formData).then(function (response) {
      this.read()
      this.setState(() => {
        return {create_json: response.data}
      })
    }.bind(this)).catch(function (error) {
      // handle error
      console.log(error)
    }).then(function () {
      // always executed
    });
  }

  read(e) {
    axios.get('http://127.0.0.1:5000/users').then(function (response) {
      this.setState(() => {
        return {users: response.data.users}
      })
      this.setState(() => {
        return {read_json: response.data}
      })
    }.bind(this)).catch(function (error) {
      // handle error
    }).then(function () {
      // always executed
    });
  }

  selectToUpdate(user) {
    this.setState({new_id: user.id})
    this.setState({new_name: user.name})
    this.setState({new_address: user.address})
  }

  update(e) {
    e.preventDefault()

    var formData = new FormData()
    formData.append('name', this.state.new_name);
    formData.append('address', this.state.new_address);

    axios.post('http://127.0.0.1:5000/users/'+this.state.new_id+'/update', formData).then(function (response) {
      this.read()
      this.setState(() => {
        return {update_json: response.data}
      })
    }.bind(this)).catch(function (error) {
      // handle error
      console.log(error)
    }).then(function () {
      // always executed
    });
  }

  delete(key, user_id) {
    axios.get('http://127.0.0.1:5000/users/'+user_id+'/delete').then(function (response) {
      this.state.users.splice(key, 1);
      this.setState({users: this.state.users})
      this.setState(() => {
        return {delete_json: response.data}
      })
    }.bind(this)).catch(function (error) {
      // handle error
    }).then(function () {
      // always executed
    });
  }

  render() {
    
    const { users, create_json, read_json, update_json, delete_json } = this.state

    var readUsers = users.map((user, key) =>
        <tr key={key}>
          <th scope="row">{user.id}</th>
          <td>{user.name}</td>
          <td>{user.address}</td>
          <td>{user.created}</td>
          <td><button type="button" className="btn btn-danger" onClick={() => this.selectToUpdate(user)}>Update</button></td>
        </tr>
    );

    var deleteUsers = users.map((user, key) =>
        <tr key={key}>
          <th scope="row">{user.id}</th>
          <td>{user.name}</td>
          <td>{user.address}</td>
          <td>{user.created}</td>
          <td><button type="button" className="btn btn-danger" onClick={() => this.delete(key, user.id)}>Delete</button></td>
        </tr>
    );

    return (
      <div className="App">
        <div className="row" style={{textAlign: 'left'}}>
          <div className="col-sm">
            <h1>Create User</h1>
          </div>
          <div className="col-sm">
            <h1>Read User</h1>
          </div>
          <div className="col-sm">
            <h1>Update User</h1>
          </div>
          <div className="col-sm">
            <h1>Delete User</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-sm">
            <form onSubmit={this.create}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" value={this.state.name} 
                  onChange={(e) => this.setState({name: e.target.value})}
                  className="form-control" placeholder="Any name.."/>
              </div>
              <div className="form-group">
                <label>Address</label>
                <input type="text" value={this.state.address} 
                  onChange={(e) => this.setState({address: e.target.value})}
                  className="form-control" placeholder="Apartment, studio, or floor"/>
              </div>
              <button type="submit" className="btn btn-primary">Create</button>
            </form> 
          </div>
          <div className="col-sm">   
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {readUsers}
              </tbody>
            </table>
          </div>
          <div className="col-sm">
            <form onSubmit={this.update}>
              <div className="form-group">
                <label>ID</label> <br/>
                <input type="text" value={this.state.new_id} className="form-control" disabled/>
              </div>
              <div className="form-group">
                <label>Name</label>
                <input type="text" value={this.state.new_name} 
                  onChange={(e) => this.setState({new_name: e.target.value})}
                  className="form-control" placeholder="Any name.."/>
              </div>
              <div className="form-group">
                <label>Address</label>
                <input type="text" value={this.state.new_address} 
                  onChange={(e) => this.setState({new_address: e.target.value})}
                  className="form-control" placeholder="Apartment, studio, or floor"/>
              </div>
              <button type="submit" className="btn btn-primary" >Update</button>
            </form> 
          </div>
          <div className="col-sm">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Created</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {deleteUsers}
              </tbody>
            </table>
          </div>
        </div>
        <div className="row">
          <div className="col-sm">
          {JSON.stringify(create_json)}
          </div>
          <div className="col-sm">
          {JSON.stringify(read_json)}
          </div>
          <div className="col-sm">
          {JSON.stringify(update_json)}
          </div>
          <div className="col-sm">
          {JSON.stringify(delete_json)}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
