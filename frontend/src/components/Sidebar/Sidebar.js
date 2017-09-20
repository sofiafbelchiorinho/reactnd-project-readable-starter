import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { fetchCategories, setCurrentCategory } from '../../actions/categoryActions'
import './Sidebar.css';

class Sidebar extends Component {

  componentWillMount(){
    this.props.fetchCategories()
    .then(response => console.log(response));
  }

  setCategory = (category) => {
    this.props.setCurrentCategory(category)
  }

  render() {
    const { categories, setCurrentCategory } = this.props

    return (
      <div className="Sidebar">
        <ul>
          {
            categories.map((category, index) => {
              return <li key={index}><Link onClick={() => this.setCategory(category)} to={`/category/${category.path}`}>{category.name}</Link></li>;
            })
          }
        </ul>
      </div>
    );
  }
}


function mapStateToProps ({categories}) {  
  return {
    categories: categories.items
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setCurrentCategory: (data) => dispatch(setCurrentCategory(data)),
    fetchCategories: (data) => dispatch(fetchCategories(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar)
