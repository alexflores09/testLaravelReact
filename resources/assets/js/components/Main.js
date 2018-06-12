import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Product from "./Product";
import FormProduct from "./FormProduct";

/* Main Component */
class Main extends Component {

    constructor() {

        super();
        //Initialize the state in the constructor
        this.state = {
            products: [],
            currentProduct: null
        }

        this.handleAddProduct = this.handleAddProduct.bind(this);
        this.handleNewProduct = this.handleNewProduct.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    /*componentDidMount() is a lifecycle method
     * that gets called after the component is rendered
     */
    componentDidMount() {
        /* fetch API in action */
        fetch('/api/products')
            .then(response => {
                return response.json();
            })
            .then(products => {
                //Fetched product is stored in the state
                this.setState({ products });
            });
    }

    renderProducts() {
        return this.state.products.map(product => {
            return (
                /* When using list you need to specify a key
                 * attribute that is unique for each list item
                */
                <li className="list-group-item"
                    key={product.id}
                    onClick={()=>this.handleClick(product)}>
                    { product.title }
                </li>
            );
        })
    }

    handleClick(product) {
        //handleClick is used to set the state
        this.setState({currentProduct:product});

    }

    handleNewProduct(){
        this.setState({currentProduct:null});
    }

    handleDelete() {
        console.log("si esta llegando aca")
        const currentProduct = this.state.currentProduct;
        fetch( 'api/products/' + this.state.currentProduct.id,
            { method: 'delete' })
            .then(response => {
                /* Duplicate the array and filter out the item to be deleted */
                const array = this.state.products.filter(function(item) {
                    return item !== currentProduct
                });

                this.setState({ products: array, currentProduct: null});

            });
    }

    handleAddProduct(product) {

        if(product.id){
            const currentProduct = this.state.currentProduct;
            product.price = Number(product.price);
            fetch( 'api/products/' + product.id, {
                method:'put',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(product)
            })
                .then(response => {
                    return response.json();
                }).then( data => {
                /* Updating the state */
                const array = this.state.products.filter(function(item) {
                    return item !== currentProduct
                })
                this.setState((prevState)=> ({
                    products: array.concat(product),
                    currentProduct : product
                }))
            })
        }
        else{
            product.price = Number(product.price);
            fetch( 'api/products/', {
                method:'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(product)
            })
                .then(response => {
                    return response.json();
                })
                .then( data => {
                    this.setState((prevState)=> ({
                        products: prevState.products.concat(data),
                        currentProduct : data
                    }))
                })
        }

    }

    render() {
        /* Some css code has been removed for brevity */
        return (
            <div className="row">
                <div className="col-lg-4">
                    <div className="card">
                        <div className="card-header">
                            Todos los productos
                        </div>
                        <ul className="list-group list-group-flush">
                            { this.renderProducts() }
                        </ul>
                    </div>
                </div>
                <div className="col-lg-5 offset-lg-1">
                    <Product product={this.state.currentProduct} />
                    <FormProduct product={this.state.currentProduct || {}} onNew={this.handleNewProduct}
                                 onAdd={this.handleAddProduct} onDelete={this.handleDelete}/>
                </div>
            </div>
        );
    }
}

export default Main;

/* The if statement is required so as to Render the component on pages that have a div with an ID of "root";
*/

if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}