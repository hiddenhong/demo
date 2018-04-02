import React, { Component } from 'react';
class Iframe extends Component {
/*  static propTypes = {

  }*/

  static defaultProps = {
    position: 'static',
    width: '100%',
    // height: (document.documentElement.clientHeight - 50 - 60) + 'px'
    height: (document.documentElement.clientHeight - 50 - 33) + 'px'
  }

  constructor(props) {
    super(props);

    this.state = {
      height: null
    }
  }


  shouldComponentUpdate(nextProps) {
    return this.props.url !== nextProps.url;
  }

  /* handleFitIframe() {
    let doc = this.iframe.contentDocument;
    let body = doc.body,
        html = doc.documentElement;

    let height = Math.max( body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight );

    this.setState({height: height});
  }

  componentDidMount() {
    const iframe = this.iframe;
    iframe.addEventListener('load', this.handleFitIframe.bind(this))
  }*/

  render() {
    const { url, width, height, position } = this.props;
    return (
      <iframe ref={(node) => { this.iframe = node }} src={url} frameBorder="0" style={{ position: position, width: width, height:height }}/>
    )
  }
}

/* var Iframe = React.createClass({
    displayName: "React-Iframe",

    propTypes: {
        url: React.PropTypes.string.isRequired,
        width: React.PropTypes.string,
        height: React.PropTypes.string
    },

    getDefaultProps: function getDefaultProps() {
        return {
            height: "100%",
            width: "100%",
            position: "fixed"
        };
    },

    shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
        return this.props.url !== nextProps.url;
    },

    render: function render() {
        return React.createElement("iframe", { ref: "iframe",
            frameBorder: "0",
            src: this.props.url,
            style: { position: this.props.position, height: this.props.height, width: this.props.width },
            height: this.props.height, width: this.props.width });
    }
});*/

export default Iframe