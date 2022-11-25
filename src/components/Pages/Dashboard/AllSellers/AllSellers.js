import axios from 'axios';
import React from 'react';

export default class AllSellers extends React.Component {
    state = {
        sellers: []
      }

      componentDidMount() {
        axios.get('http://localhost:5000/sellers')
          .then(res => {
            const sellers = res.data;
            this.setState({ sellers });
          })
      }
      render() {
        return (
            <div className='p-5 sm:p-5 md:p-8 lg:p-14 my-5'>
                <h2 className='text-2xl my-4 font-bold text-center'>ALL SELLERS</h2>
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
    
                            {this.state.sellers &&
                                this.state.sellers?.map((seller, i) => <tr key={seller._id} className="hover">
                                    <th>{[i + 1]}</th>
                                        <td>{seller.name}</td>
                                        <td>{seller.email}</td>
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