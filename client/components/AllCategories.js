import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchCategories} from '../store/allCategories'
import AllProducts from './AllProducts'
import { Link } from 'react-router-dom';

class AllCategories extends Component {

    constructor(props) {
      super(props);
    }

    componentDidMount() {
      this.props.fetchData()
    }

    render() {

      return (
        <div className="page-body">
          <div className="section-column">
            <h2>All Categories </h2>
            {this.props.currentUser.isAdmin && <div>
            <Link to="/new-category"> <span className="glyphicon glyphicon-plus">New Category </span></Link>
            <Link to="/new-product"> <span className="glyphicon glyphicon-plus">New Product</span></Link>
            </div>}


          {/* <div id="categories"> */}
            <h5>Select a category to view related products or view all products below.</h5>
            {this.props.allCategories.map(category => {
            return (
              <Link to={`/categories/${category.id}`} key={category.id}>
                    <h4>{category.name}</h4>
              </Link>
            )
          })
        }
        </div>
          {/* </div> */}

          <AllProducts />
      </div>
      )
    }
}


const mapState = ({allCategories, currentUser}) => ({allCategories, currentUser})


const mapDispatch = dispatch => {
  return {
  fetchData: () => {
    dispatch(fetchCategories());
    }
  }
}

export default connect(mapState, mapDispatch)(AllCategories)