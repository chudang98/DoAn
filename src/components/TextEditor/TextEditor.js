import React, { useState, forwardRef, useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill-with-table';
import 'react-quill-with-table/dist/quill.snow.css';
import 'react-quill-with-table/dist/quill.bubble.css';
import { makeStyles } from '@material-ui/styles';
import _ from 'lodash';
import { uploadFile } from '@/services/BaseService';
import axios from '@/utils/axios.js';
// import ImageResize from './src/ImageResize';

import styles from './TextEditor.css';

const useStyles = makeStyles({
  textEditor: {
    '& .ql-editor': {
      height: '600px',
      width: '650px',
      lineHeight: 1.5,
    },
    '& .ql-font-times-new-roman, & .ql-font span[data-value="times-new-roman"]::before': {
      fontFamily: "'Times New Roman', Times, serif",
      fontSize: '16px',
    },
    '& .ql-font-arial, & .ql-font span[data-value="arial"]::before': {
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
    },
    '& .ql-font-comic-sans, & .ql-font span[data-value="comic-sans"]::before': {
      fontFamily: '"Comic Sans MS", cursive, sans-serif',
      fontSize: '14px',
    },
    '& .ql-font-courier-new, & .ql-font span[data-value="courier-new"]::before': {
      fontFamily: 'Courier New',
      fontSize: '14px',
    },
    '& .ql-font-georgia, & .ql-font span[data-value="georgia"]::before': {
      fontFamily: 'Georgia, serif',
      fontSize: '14px',
    },
    '& .ql-font-helvetica, & .ql-font span[data-value="helvetica"]::before': {
      fontFamily: 'Helvetica, sans-serif',
      fontSize: '14px',
    },
    '& .ql-font-lucida, & .ql-font span[data-value="lucida"]::before': {
      fontFamily: '"Lucida Sans Unicode", "Lucida Grande", sans-serif',
      fontSize: '14px',
    },
  },
});

function listOption(array) {
  return array.map(value => <option value={value} />);
}

const colors = [
  '#000000',
  '#e60000',
  '#ff9900',
  '#ffff00',
  '#008a00',
  '#0066cc',
  '#9933ff',
  '#ffffff',
  '#facccc',
  '#ffebcc',
  '#ffffcc',
  '#cce8cc',
  '#cce0f5',
  '#ebd6ff',
  '#bbbbbb',
  '#f06666',
  '#ffc266',
  '#ffff66',
  '#66b966',
  '#66a3e0',
  '#c285ff',
  '#888888',
  '#a10000',
  '#b26b00',
  '#b2b200',
  '#006100',
  '#0047b2',
  '#6b24b2',
  '#444444',
  '#5c0000',
  '#663d00',
  '#666600',
  '#003700',
  '#002966',
  '#3d1466',
];
const childs = [
  <select className="ql-font" style={{ width: '150px' }} title="Font chữ">
    <option value="arial" selected>
      Arial
    </option>
    <option value="comic-sans">Comic Sans</option>
    <option value="courier-new">Courier New</option>
    <option value="georgia">Georgia</option>
    <option value="times-new-roman">Times New Roman</option>
    <option value="helvetica">Helvetica</option>
    <option value="lucida">Lucida</option>
  </select>,
  <select className="ql-header" title="Kích thước" />,
  <select className="ql-align" title="Căn lề">
    {listOption(['', 'center', 'right', 'justify'])}
  </select>,

  <button className="ql-bold" title="Chữ đậm" />,
  <button className="ql-italic" title="Chữ nghiêng" />,
  <button className="ql-underline" title="Gạch chân" />,
  <button className="ql-strike" title="Gạch ngang" />,

  <select className="ql-color" title="Màu chữ">
    {listOption(colors)}
  </select>,
  <select className="ql-background" title="Màu nền">
    {listOption(colors)}
  </select>,

  <button className="ql-script" value="sub" title="Chỉ số" />,
  <button className="ql-script" value="super" title="Số mũ" />,

  <button className="ql-list" value="ordered" title="List" />,
  <button className="ql-list" value="bullet" title="List" />,
  <button className="ql-indent" value="+1" title="Thụt lề +" />,
  <button className="ql-indent" value="-1" title="Thụt lề -" />,
  <button className="ql-link" title="Link" />,

  <button className="ql-image" title="Thêm ảnh" />,
  <button className="ql-video" title="Thêm video" />,

  <button className="ql-clean" title="Xóa hiệu ứng" />,
];
const texts = [
  'Font',
  'Kích thước',
  'Căn lề',
  'Chữ đậm',
  'In nghiêng',
  'Gạch chân',
  'Gạch ngang',
  'Màu chữ',
  'Màu nền',
  'Chỉ số',
  'Số mũ',
  'Blockquote',
  'Code block',
  'Style list',
  'Style list',
  'Thụt lề +',
  'Thụt lề -',
  'Link',
  'Ảnh',
  'Video',
  'Clear',
];

const CustomToolbar = () => (
  <div
    id="toolbar"
    style={{
      backgroundColor: 'white',
      lineHeight: '25px',
      fontSize: '14px',
      width: '650px',
    }}
  >
    {childs.map((item, index) => item)}
  </div>
);

const formats = [
  'header',
  'font',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
  'script',
  'color',
  'background',
  'formula',
  'float',
  'direction',
  'code-block',
  'code',
  'align',
];

const Font = Quill.import('formats/font');
Font.whitelist = [
  'arial',
  'comic-sans',
  'courier-new',
  'georgia',
  'times-new-roman',
  'helvetica',
  'lucida',
];

Quill.register(Font, true);

//-------------
const DirectionAttribute = Quill.import('attributors/attribute/direction');
Quill.register(DirectionAttribute, true);

const AlignClass = Quill.import('attributors/class/align');
Quill.register(AlignClass, true);

const BackgroundClass = Quill.import('attributors/class/background');
Quill.register(BackgroundClass, true);

const ColorClass = Quill.import('attributors/class/color');
Quill.register(ColorClass, true);

const DirectionClass = Quill.import('attributors/class/direction');
Quill.register(DirectionClass, true);

const FontClass = Quill.import('attributors/class/font');
Quill.register(FontClass, true);

const SizeClass = Quill.import('attributors/class/size');
Quill.register(SizeClass, true);

const AlignStyle = Quill.import('attributors/style/align');
Quill.register(AlignStyle, true);

const BackgroundStyle = Quill.import('attributors/style/background');
Quill.register(BackgroundStyle, true);

const ColorStyle = Quill.import('attributors/style/color');
Quill.register(ColorStyle, true);

const DirectionStyle = Quill.import('attributors/style/direction');
Quill.register(DirectionStyle, true);

const FontStyle = Quill.import('attributors/style/font');
Quill.register(FontStyle, true);

const SizeStyle = Quill.import('attributors/style/size');
Quill.register(SizeStyle, true);
//--------------------

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.value.text || '',
    };
  }

  imageHandler = () => {
    const input = document.createElement('input');
    // Tạo input file và click luôn
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    // eslint-disable-next-line func-names
    input.onchange = async function() {
      const file = input.files[0];

      // Up ảnh lên và lấy url
      const response = await uploadFile(file);
      const range = this.quill.getSelection();

      // Chèn ảnh vào dưới dạng url
      this.quill.insertEmbed(range.index, 'image', _.get(response, 'data.data.uploadAnh', ''));
    }.bind(this);
  };

  triggerChange = changedValue => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(Object.assign({}, { text: this.state.text }, changedValue));
    }
  };

  setText = text => {
    this.setState({ text });
  };

  render() {
    const modules = {
      toolbar: {
        handlers: {
          image: this.imageHandler,
        },
        container: '#toolbar',
      },
      // imageResize: {
      //   modules: ['DisplaySize', 'Resize'],
      // },
    };
    return (
      <div>
        <CustomToolbar />
        <ReactQuill
          ref={ref => {
            if (this.quill || !ref) return;
            this.quill = ref.getEditor();
          }}
          style={{
            backgroundColor: 'white',
            width: '650px',
            position: 'relative',
            overflow: 'auto',
            maxHeight: '80vh',
            height: '40vh',
          }}
          theme="snow"
          value={this.state.text}
          onChange={(content, delta, source, editor) => {
            this.setText(content);
            this.triggerChange({ text: content });
          }}
          modules={modules}
          formats={formats}
          preserveWhitespace
        />
      </div>
    );
  }
}

export default TextEditor;
