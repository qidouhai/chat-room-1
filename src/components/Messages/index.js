import React from 'react';
import classnames from 'classnames';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from 'material-ui/Typography';
import styles from './style.less';
import {config, oneOf} from 'utils';

class Messages extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            notice: ''
        };
    }

    clear = () => {
        this.props.clearMessages();
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        const messages = this.props.messages;
        const messageElement = [];

        console.log(messages);

        for (let [index, message] of messages.entries()) {
            let systemMsg = '';

            if (message.hasOwnProperty('type')) {
                switch (message.type) {
                    case 'ENTER_MESSAGE':
                        systemMsg = '加入了群聊';
                        break;
                    case 'LEAVE_MESSAGE':
                        systemMsg = '退出了群聊';
                        break;
                    default:
                        break;
                }


                messageElement.push(<div key={index}
                                         className={classnames(styles.message, styles.systemMessage)}>
                    <Typography variant="caption" className={styles.or}>
                        {`${message.username} ${systemMsg}`}
                    </Typography></div>);
            } else {
                if (message.uid === this.props.uid) {

                    messageElement.push(
                        <div key={index} className={classnames(styles.message, styles.me)}
                             style={{backgroundColor: message.color}}>
                            <Avatar
                                className={styles.avatar}
                                alt="Adelle Charles"
                                src={message.sex === '男' ? config.avatarBoy : config.avatarGirl}
                            />
                            {/*<div className="message-user"> {`${message.username}:`} </div>*/}
                            {/*<div className="message-user"> tom:</div>*/}
                            {/*<div className="message-time"> {message.time} </div>*/}
                            {message.content}
                        </div>
                    );
                } else if (oneOf(message.uid, this.props.ignoreList)) {
                    // 忽略某人，信息不可见
                } else if (message.uid === '001') {
                    messageElement.push(
                        <div key={index} className={classnames(styles.message, styles.you)}
                             style={{backgroundColor: message.color}}>
                            <Avatar
                                className={styles.avatar}
                                alt="Adelle Charles"
                                src={message.sex === '男' ? config.avatarBoy : config.avatarGirl}
                            />
                            {/*<div className="message-user"> {`${message.username}:`} </div>*/}
                            {message.content}
                            {/*<div className="message-time"> {message.time} </div>*/}
                        </div>
                    );
                } else {
                    messageElement.push(
                        <div key={index} className={classnames(styles.message, styles.you)}
                             style={{backgroundColor: message.color}}>
                            <Avatar
                                className={styles.avatar}
                                alt="Adelle Charles"
                                src={message.sex === '男' ? config.avatarBoy : config.avatarGirl}
                            />
                            {/*<div className="message-user"> {`${message.username}:`} </div>*/}
                            {message.content}
                            {/*<div className="message-time"> {message.time} </div>*/}
                        </div>
                    );
                }
            }
        }

        return (
            <div className={styles.container}>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    open={this.state.open}
                    autoHideDuration={5000}
                    onClose={this.handleClose}
                    message={this.state.notice}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={this.handleClose}
                        >
                            <CloseIcon/>
                        </IconButton>
                    ]}
                />
                <div className={styles.topbar}>
                    <div>当前在线人数：{this.props.onlineNums}</div>
                    <IconButton
                        aria-haspopup="true"
                        onClick={this.clear}
                        color="inherit"
                    >
                        <DeleteIcon/>
                    </IconButton>
                </div>
                <div className={styles.content}>
                    {messageElement}
                </div>
            </div>
        );
    }
}

export default Messages;