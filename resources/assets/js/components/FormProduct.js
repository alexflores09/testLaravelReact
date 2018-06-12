import React, { Component } from 'react';

class FormProduct extends Component{
    constructor(props){
        super(props);
        this.state = {
            newProduct: {
                id : this.props.product.id || 0,
                title: this.props.product.title || '',
                description: this.props.product.description || '',
                price: this.props.product.price || '',
                availability: this.props.product.availability || false,
            }
        };

        this.handleInput = this.handleInput.bind(this);
        this.handleNewProduct = this.handleNewProduct.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentWillReceiveProps(newProps){
        this.setState({
            newProduct: {
                id: newProps.product.id || 0,
                title: newProps.product.title || '',
                description: newProps.product.description || '',
                price: newProps.product.price || '',
                availability: newProps.product.availability || false
            }
        });
    }

    handleInput(key, e) {

        /*Duplicating and updating the state */
        const state = Object.assign({}, this.state.newProduct);
        state[key] = e.target.value;
        this.setState({newProduct: state });
    }

    handleCheckbox(key, e) {

        /*Duplicating and updating the state */
        const state = Object.assign({}, this.state.newProduct);
        state[key] = e.target.checked;
        this.setState({newProduct: state });
    }

    handleNewProduct(){
        this.props.onNew();
    }

    handleSubmit(e) {
        //preventDefault prevents page reload
        e.preventDefault();
        /*A call back to the onAdd props. The current
         *state is passed as a param
         */
        this.props.onAdd(this.state.newProduct);
    }

    handleDelete(){
        this.props.onDelete();
    }

    render(){
        return (
            <div className="card">
                <div className="card-header">
                    <h2>
                        Producto
                        <button type="button" className="btn btn-info float-right" onClick={this.handleNewProduct}>Agregar</button>
                    </h2>
                </div>
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="title">Título</label>
                            <input type="text" className="form-control" id="title"
                                   value={this.state.newProduct.title}
                                   onChange={(e)=>this.handleInput('title',e)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Descripción</label>
                            <textarea id="description" className="form-control"
                                      value={this.state.newProduct.description}
                                      onChange={(e)=>this.handleInput('description',e)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Precio</label>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">Q</div>
                                </div>
                                <input type="number" className="form-control" id="price"
                                       value={this.state.newProduct.price}
                                       onChange={(e)=>this.handleInput('price',e)} />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="custom-control custom-checkbox mr-sm-2">
                                <input type="checkbox" className="custom-control-input" id="availability"
                                       checked={this.state.newProduct.availability}
                                       onChange={(e)=>this.handleCheckbox('availability',e)} />
                                    <label className="custom-control-label" htmlFor="availability">
                                        Disponible
                                    </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-success">Guardar</button>
                            <button type="button" className={this.state.newProduct.id ? 'btn btn-danger' : 'btn btn-danger d-none'}
                            onClick={this.handleDelete}>Delete</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default FormProduct;