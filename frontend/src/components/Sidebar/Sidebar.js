import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetSortingOrder } from '../../actions/postActions';
import { fetchCategories, setCurrentCategory } from '../../actions/categoryActions'
import './Sidebar.css';

class Sidebar extends Component {

  componentWillMount(){
    this.props.fetchCategories()
    .then(response => console.log(response));
  }

  setCategory = (category) => {
    this.props.setCurrentCategory(category)
    if(!category){
      this.props.resetSortingOrder();
    }
  }

  render() {
    const { categories, category, setCurrentCategory } = this.props

    return (
      <div className="Sidebar">
        <h4>categories</h4>
        <ul>
          {
            categories.map((c, index) => {
              return <li className={ category && category.name === c.name ? 'active' : ''} key={index}><Link onClick={() => this.setCategory(c)} to={`/category/${c.path}`}>{c.name}</Link></li>;
            })
          }
          <li className={ category === null ? 'active' : ''} key="all"><Link onClick={() => this.setCategory(null)} to='/'>all</Link></li>
        </ul>
      </div>
    );
  }
}


function mapStateToProps ({categories}) {  
  return {
    categories: categories.items,
    category: categories.category
  }
}

function mapDispatchToProps (dispatch) {
  return {
    resetSortingOrder: () => dispatch(resetSortingOrder()),
    setCurrentCategory: (data) => dispatch(setCurrentCategory(data)),
    fetchCategories: (data) => dispatch(fetchCategories(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar)
