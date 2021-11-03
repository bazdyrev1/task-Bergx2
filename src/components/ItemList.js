import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { itemsFetchData, getLoadingItems } from "../actions/items";

class ItemList extends Component {
  componentDidMount() {
    this.props.getIsLoading();
    this.props.fetchData("http://5af1eee530f9490014ead8c4.mockapi.io/items");
  }

  handleItems(items, itemId) {
    return items.reduce((accFiltereditems, filteredItems) => {
      if (filteredItems.parent_id === itemId) {
        const children = this.handleItems(items, filteredItems.id)

        if (children.length) {
          filteredItems.children = children
        }
        accFiltereditems.push(filteredItems)
      }

      return accFiltereditems
    }, [])

  };

  render() {
    const copiedItems = JSON.stringify(this.props.items);
    const result = this.handleItems(JSON.parse(copiedItems), 0);

    if (this.props.isErrorloading) {
      return (
        <span>An error occurred during data loading</span>
      );
    }

    return (
      <div>
        <div>
          {this.props.isLoading ? (
            <span>Loading...</span>
          ) : (
            <ul>
              {this.props.items.map((item) => (
                <li key={item.id}>
                  {item.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <ul>
            {result.map((nestedOne) => (
              <li key={nestedOne.id}>
                <span>{nestedOne.label}</span>

                <ul>
                  {(nestedOne.children || []).map((nestedTwo) => (
                    <li key={nestedTwo.id}>
                      <span>{nestedTwo.label}</span>

                      <ul>
                        {(nestedTwo.children || []).map((nestedThree) => (
                          <li key={nestedThree.id}>
                            <span>{nestedThree.label}</span>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

ItemList.propTypes = {
  fetchData: PropTypes.func.isRequired,
  getIsLoading: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isErrorloading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return state.items;
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(itemsFetchData(url)),
    getIsLoading: () => dispatch(getLoadingItems()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
