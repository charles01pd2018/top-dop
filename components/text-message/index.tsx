import { Form } from '../form';
import { TextInput } from 'elements';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';


interface Props {
    id: string;
    className?: string;
}

const TextMessage = ( {
    id,
    className='',
}: Props ) => {

    const imageURL = useRef<string>( '/static/images/bot.jpg' );
    // TO-DO - store this in the cache with dexie
    const [ userMsgs, setUserMsgs ] = useState<string[]>( [] );
    const [ botMsgs, setBotMsgs ] = useState<string[]>( [] );

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

    const onSubmit = ( input: any ) => {
        // add a bot msg with the className 'loading'

        // await the request to the MAGE API

        // set the bot msg to the actual text
    }

    // useEffect( () => {
    //     // await the request to the MAGE API

    // }, [ botMsgs ] );

    return (
        <section id={id} className={classes}>
            <div className='bot-strip'>
                <Image className='image' 
                    src={imageURL.current} width={50} height={50}/>
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
            <Form id='text-msg-form' name='testMsgForm' onSubmit={() => console.log( 'hello' )}
                buttonProps={buttonProps}>
                <TextInput id='msg' name='msg' type='text'
                    content={textInputContent} animate={false} maxLength={50}
                    required />
            </Form>
        </section>
    )
}

export default TextMessage;