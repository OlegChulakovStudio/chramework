import React, { PureComponent } from 'react';
import Dropzone from 'react-dropzone'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './FileInput.styl';

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
    console.log(files,typeof files);
    const uploadedContent = multiple ? files : [files[0]];
    if (onChange && typeof onChange === 'function') {
      onChange(uploadedContent);
    }
    this.setState({
      files: uploadedContent
    });
    console.log('current state', this.state);
  }

  handleReset = () =>  {
    this.props.input.onChange(null);
    this.setState({
      files: null
    });
  }
  render() {
    const { className } = this.props;
    const innerText = this.state.files > 1 ? this.state.files : this.props.label
    return (
      <div className={classNames([
        "file-input",
        className
      ])}>
        <Dropzone
          className={classNames({
            "file-input__field": true,
            "file-input__field--active": this.state.file !== null || this.hasFile,
          })}
          accept={this.props.accept}
          maxSize={this.props.maxSize}
          onDrop={ this.handleDropFile }
          multiple={true}
        >
          <p>{ innerText }</p>
          { (this.state.files) &&
            <span className="file-input__reset" onClick={this.handleReset}></span>
          }
        </Dropzone>
      </div>
    )
  }
}