import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setCurrency } from "../../actions/cartActions";
import ReactDOM from "react-dom";
import { LOAD_CURRENCIES } from "../../GraphQL/Queries";
import { Query } from "@apollo/client/react/components";
import currArrowUp from "./Vectorcurr.svg";
import currArrowDown from "./Vectordown.svg";

class Currency extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isCurrClicked: false,
    };
    this.handleCurrClick = this.handleCurrClick.bind(this);
    this.signSymbol = this.signSymbol.bind(this);
  }

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside, true);
  }

  handleCurrClose() {
    this.setState({ isCurrClicked: false });
  }

  handleCurrClick() {
    this.setState({ isCurrClicked: !this.state.isCurrClicked });
  }

  handleClickOutside = (event) => {
    const domNode = ReactDOM.findDOMNode(this);

    if (!domNode || !domNode.contains(event.target)) {
      this.handleCurrClose();
    }
  };

  signSymbol(s) {
    if (s === "USD") {
      return "$";
    } else if (s === "GBP") {
      return "£";
    } else if (s === "AUD") {
      return "$";
    } else if (s === "JPY") {
      return "¥";
    } else {
      return "₽";
    }
  }
  render() {
    const { setCurrency } = this.props;
    const curr = (
      <Query query={LOAD_CURRENCIES}>
        {({ loading, data }) => {
          if (loading) return "";
          return data.currencies.map((c) => (
            <p key={c} onClick={() => setCurrency(c)}>{`${this.signSymbol(c)} ${c}` }</p>
          ));
        }}
      </Query>
    );

    return (
      <div>
        <div className="currency-group" onClick={this.handleCurrClick}>
          <p className="currency">$</p>
          <img
            src={this.state.isCurrClicked ? currArrowDown : currArrowUp}
            alt="currency"
          />
        </div>
        {this.state.isCurrClicked && (
          <div className="currency-dropdown">{curr}</div>
        )}
      </div>
    );
  }
}

Currency.propTypes = {
  setCurrency: PropTypes.func,
};

export default connect(null, { setCurrency })(Currency);
