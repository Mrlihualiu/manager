import React from 'react';
import { Card,Button,Modal } from 'antd'; 
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default class Rich extends React.Component{

    state = {
        showRichText: false,
        editorState:''
    }
    //清空内容
    handleClearContent = () => {    
        this.setState({
            editorState:''
        })
    }
    //获取内容格式
    handleGetText = () => {
        this.setState({
            showRichText:true
        })
    }

    onEditorStateChange = (editorState)=>{
        this.setState({
            editorState
        })
    }

    onEditorChange = (contentState) => {
        this.setState({
            contentState
        })
    }

    render(){
        const { editorState } = this.state;
        return (
            <div>
                <Card>
                    <Button type="primary" style={{marginRight:10}} onClick={this.handleClearContent}>清空内容</Button>
                    <Button type="primary" onClick={this.handleGetText}>获取HTML文本</Button>
                </Card>
                <Card title="富文本编辑器">
                    <Editor
                        editorState={editorState}
                        onContentStateChange={this.onEditorChange}  
                        onEditorStateChange={this.onEditorStateChange}
                    />
                </Card>
                <Modal
                    title="HTML富文本" 
                    visible={this.state.showRichText} 
                    onCancel={()=>{
                        this.setState({
                            showRichText: false
                        })
                    }}
                    footer={null}
                >
                    {draftToHtml(this.state.contentState)}
                </Modal>
            </div>
        )
    }
}