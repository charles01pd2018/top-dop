import { Form } from '../form';
import { TextInput } from 'elements';
import Image from 'next/image';

interface Props {
    id: string;
    className?: string;
}

const TextMessage = ( {
    id,
    className='',
}: Props ) => {

    const classes = `
        text-message-wrapper
        ${className}
    `;

    const buttonProps = {
        buttonContent: {
            text: 'txt',
        },
        buttonAriaLabel: 'txt',
    };

    const textInputContent = {
        placeholder: 'Send a Msg!'
    }

    return (
        <section id={id} className={classes}>
            <div className='bot-strip'>
                <Image className='image' 
                    src='/static/images/bot.jpg' width={50} height={50}/>
                <div className='text'>
                    <p className='name text-sm'>MONKEY</p>
                    <p className='desc text-xxxs'>the chosen one</p>
                </div>
            </div>
            <div className='messages'>
                <div className='content'>
                    {

                    }
                    Hello fdsjhf sahf jkfhjsh hfjkl
                </div>
            </div>
            <Form id='text-msg-form' name='testMsgForm' onSubmit={() => {}}
                buttonProps={buttonProps}>
                    <TextInput id='msg' name='msg' type='text'
                        content={textInputContent} animate={false} maxLength={50}/>
                </Form>
        </section>
    )
}

export default TextMessage;