import React, { PureComponent } from 'react';
import Dropzone from 'react-dropzone'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './FileInput.styl';

function getLabelText(files) {
  const names = [];
  Object.keys(files).forEach((index) => {
    files[index].name && names.push(files[index].name);
  });
  return names.join(',');
}
export default class FileInput extends PureComponent {
  static propTypes = {
    /** allow specific types of files */
    accept: PropTypes.string,
    /** space delimited list of additional class names */
    className: PropTypes.string,
    /** text which will be displayed on the file input */
    label: PropTypes.string,
    /** maximum file size */
    maxSize: PropTypes.number,
    /** By default, you can upload only one file. Set this parameter to 'true', if you want to upload multiple files */
    multiple: PropTypes.bool,
    /** callback function that fires after file select */
    onChange: PropTypes.func
  };

  static defaultProps = {
    accept: '',
    label: 'Загрузите файл',
    maxSize: Infinity,
    multiple: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      files: null
    };
  }

  handleDropFile = (files) => {
    const { multiple, onChange } = this.props;
    const uploadedContent = multiple ? files : [files[0]];
    if (onChange && typeof onChange === 'function') {
      onChange(uploadedContent);
    }
    this.setState({
      files: uploadedContent
    });
  }

  handleReset = () =>  {
    this.props.input.onChange(null);
    this.setState({
      files: null
    });
  }
  render() {
    const { className } = this.props;
    const innerText = this.state.files ? getLabelText(this.state.files) : this.props.label
    return (
      <div className={classNames([
        "FileInput",
        className
      ])}>
        <Dropzone
          className={classNames({
            "FileInput__field": true,
            "FileInput__field--active": this.state.file !== null || this.hasFile,
          })}
          accept={this.props.accept}
          maxSize={this.props.maxSize}
          onDrop={ this.handleDropFile }
          multiple={true}
        >
          <p className="FileInput__innerText" title={ innerText }>{ innerText }</p>
          { (this.state.files) &&
            <span className="FileInput__reset" onClick={this.handleReset}></span>
          }
        </Dropzone>
      </div>
    )
  }
}