import React, {Component} from 'react';
import './SingleNoteModal.css';
import Modal from 'react-modal';
import TextareaAutosize from "react-autosize-textarea";
import {connect} from 'react-redux';
import * as actions from '../../Actions';
import ShareModal from "../NewNotes/ShareModal/ShareModal";

class SingleNoteModal extends Component{

    constructor(props){
        super(props);
        this.state = {
            isOpen: true,
            note: {},
            map: new Map(),
            showShareModal: false
        }
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.renderShareModal = this.renderShareModal.bind(this);
    }

    componentDidMount(){
        this.setState({
            note: this.props.note
        })
        this.props.getGroup().then(() => {
            console.log(this.props.groups);
            this.props.groups.map(group => {
                this.state.map.set(group._id, false);
            });
        });
    }

    handleCloseModal() {
        this.setState({ isOpen: false });
        this.props.onClose();
    }

    renderShareModal() {
        if (this.state.showShareModal === false) {
            return <div />;
        }
        return (
            <div className='Hello'>
                <ShareModal
                    setTagState={() => {
                        this.setState({
                            showShareModal: false
                        });
                    }}
                    map={this.state.map}
                />
            </div>
        );
    }

    render(){
        const nTextarea = {
            border: "none",
            width: "99%",
            height: "100%",
            paddingLeft: "10px",
            paddingTop: "10px",
            textAlign:"justify",
            background: "transparent",
            //fontWeight: "bolder"
        };
        console.log(this.state.map);
        return (
            <Modal
                isOpen={this.state.isOpen}
                ariaHideApp={false}
                shouldFocusAfterRender={true}
                shouldCloseOnOverlayClick={true}
                onRequestClose={this.handleCloseModal}
                className="singleNoteModal"
                overlayClassName="singleNoteOverlayModal"
                role="dialog"
                //closeTimeoutMS={1000}
            >
                <form>
                    <div className='row singleNoteTitleWrapper'>
                        <div className='col-md-8 singleNoteTitle'>
                            <input defaultValue={this.props.note.title} readOnly={this.props.auth._id!==this.props.note._user} className='singleNoteTitleText'/>
                        </div>
                        <div className='col-md-1'>

                        </div>
                        <div className='col-md-2'>

                        </div>
                        <div className='col-md-1'>

                        </div>
                    </div>
                    <TextareaAutosize
                        placeholder="Add a Note..."
                        style={nTextarea}
                        innerRef={ref => (this.textarea = ref)}
                        defaultValue={this.props.note.content}
                        readOnly={this.props.auth._id!==this.props.note._user}
                    />
                    <div>
                        {this.props.note.tags.map((tag, index) => <div className="nodeListTag" key={index}>{tag}</div>)}
                        {this.props.note.category === "Note" ? (
                            <div className="nodeListTag nodeListCategoryNote">
                                {this.props.note.category}
                            </div>
                        ) : (
                            <div className="nodeListTag nodeListCategoryCheatsheet">
                                {this.props.note.category}
                            </div>
                        )}
                    </div>
                    <div>
                        <i
                            className="fa fa-share-alt tagIconSingle"
                            aria-hidden="true"
                            id="shareTootltip"
                            onClick={() => {
                                this.setState({
                                    showShareModal: !this.state.showShareModal
                                });
                            }}
                        />
                    </div>
                </form>
                {this.renderShareModal()}
            </Modal>
        )
    }
}

function mapStateToProps({auth, groups}){
    return {auth, groups};
}

export default connect(mapStateToProps, actions)(SingleNoteModal);