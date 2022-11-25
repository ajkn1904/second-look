import React from 'react';
import axios from 'axios';

export default class AllBuyers extends React.Component {
    state = {
        buyers: []
      }

      componentDidMount() {
        axios.get('http://localhost:5000/buyers')
          .then(res => {
            const buyers = res.data;
            this.setState({ buyers });
          })
      }
      render() {
        return (
            <div className='p-5 sm:p-5 md:p-8 lg:p-14 my-5'>
                <h2 className='text-2xl my-4 font-bold text-center'>ALL BUYERS</h2>
                <div className="overflow-x-auto">
                    <table className="table w-full">
    
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Make Admin</th>
                                <th>Delete</th>
    
                            </tr>
                        </thead>
                        <tbody>
    
                            {this.state.buyers &&
                                this.state.buyers?.map((buyer, i) => <tr key={buyer._id} className="hover">
                                    <th>{[i + 1]}</th>
                                        <td>{buyer.name}</td>
                                        <td>{buyer.email}</td>
                                        <td><button className='btn btn-success'>Pay</button></td>
                                        <td><button className='btn btn-error'>Delete</button></td>
                                </tr>
    
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };
  }