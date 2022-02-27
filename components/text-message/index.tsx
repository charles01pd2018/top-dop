import { Form } from '../form';
import { TextInput } from 'elements';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import type { FormOnSubmit } from 'components/form/types';


interface Props {
    id: string;
    className?: string;
}

interface Input {
    msg: string;
}

interface Msgs {
    type: 'bot' | 'user';
    text?: string;
    loading?: boolean;
}

// const getBotResponse = async ( input: Input ) => {
//     const response = await fetch(`https://api.mage.ai/v1/predict`, {
//         method: 'POST',
//         body: JSON.stringify( {
//             "api_key": process.env.NEXT_PUBLIC_MAGE_API_TOKEN,
//             "model": "custom_prediction_classification_1645944796136",
//             "version": "1",
//             features: [
//                 {
//                 "id": 274228
//                 },
//                 {
//                 "id": 259202
//                 }
//             ],
//         } ),
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     } );

//     return response.json();
// }

const TextMessage = ( {
    id,
    className='',
}: Props ) => {

    const imageURL = useRef<string>( '/static/images/bot.jpg' );
    // TO-DO - store this in the cache with dexie
    const [ msgs, setMsgs ] = useState<Msgs[]>( [] );
    const [ isBotResponding, setIsBotResponding ] = useState<boolean>( false );

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

    const onSubmit: FormOnSubmit<Input> = async ( input ) => {
        setMsgs( ( state ) => {
            return [
                ...state,
                {
                    type: 'user',
                    text: input.msg,
                },
            ];
        } );

        setTimeout( () => {
            setIsBotResponding( true );

            setMsgs( ( state ) => {
                return [
                    ...state,
                    {
                        type: 'bot',
                        loading: true,
                    },
                ];
            } )

            setTimeout( () => {
                setMsgs( ( state ) => {
                    return [
                        ...state.slice( 0, -1 ),
                        {
                            type: 'bot',
                            text: 'Har har har',
                        }
                    ]
                } )

                setIsBotResponding( false );
            }, 1000 );
        }, 500 )
        // add a bot msg with the className 'loading'
        // await the request to the MAGE API

        // set the bot msg to the actual text
    }

    const initBot = () => {
        setMsgs( [
            {
                type: 'bot',
                loading: true,
            },
        ] );

        setIsBotResponding( true );

        setTimeout( () => {
            setMsgs( [
                {
                    type: 'bot',
                    text: "What's good blood"
                }
            ] );

            setIsBotResponding( false );
        }, 2000 );
    }

    // useEffect( () => {
    //     // await the request to the MAGE API

    // }, [ botMsgs ] );

    useEffect( () => {
        if ( msgs.length === 0 )
            initBot();
    }, [] );

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
                        msgs.map( ( { type, text, loading }, index ) => {
                            if ( type === 'bot' ) {
                                const classes = `
                                    message
                                    ${loading ? 'loading' : ''}
                                `;
                                return (
                                    <div className={classes} key={index}>
                                        <Image className='img' src={imageURL.current}
                                            width={25} height={25} />
                                        {
                                            text && (
                                                <p className='text'>{text}</p>
                                            )
                                        }
                                        {
                                            loading && (
                                                <div className='wat'></div>
                                            )
                                        }
                                    </div>
                                )
                            }
                            if ( type ==='user' ) {
                                return (
                                    <div className='message user' key={index}>
                                        <p className='text'>{text}</p>
                                    </div>
                                )
                            }
                        } )
                    }
                </div>
            </div>
            <Form id='text-msg-form' name='testMsgForm' onSubmit={onSubmit}
                buttonProps={buttonProps} keepFocus={true}>
                <TextInput id='msg' name='msg' type='text'
                    content={textInputContent} animate={false} maxLength={50}
                    required disabled={isBotResponding} autoFocus={true} />
            </Form>
        </section>
    )
}

export default TextMessage;